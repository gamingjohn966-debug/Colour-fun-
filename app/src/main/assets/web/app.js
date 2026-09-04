// Color Fun - Main Application Controller
(function() {
  const getArtworks = () => (typeof window !== 'undefined' && window.ARTWORKS) || [];
  const getPalettes = () => (typeof window !== 'undefined' && window.COLOR_PALETTES) || {};
  const getStorage = () => (typeof window !== 'undefined' && window.StorageManager) || StorageManager;
  const getSounds = () => (typeof window !== 'undefined' && window.sounds) || {
    init: () => {},
    setEnabled: () => {},
    playPop: () => {},
    playClick: () => {},
    playSparkle: () => {},
    playUndo: () => {},
    playTrash: () => {}
  };
  const getEngine = () => (typeof window !== 'undefined' && window.ColoringEngine) || ColoringEngine;

  class ColorFunApp {
  constructor() {
    this.currentScreen = 'home';
    this.currentArtwork = null;
    this.currentCreationId = null;
    this.engine = null;

    this.activePaletteId = 'skin';
    this.activeColor = '#FFB4AB';
    this.mainCategory = 'anime_girls';
    this.selectedSubCategory = 'all';

    try {
      this.settings = StorageManager.getSettings();
    } catch (e) {
      this.settings = { theme: 'light', soundEnabled: true, animationsEnabled: true };
    }

    this.init();
  }

  init() {
    try {
      this.applyTheme(this.settings.theme);
      sounds.setEnabled(this.settings.soundEnabled);
    } catch (e) {
      console.warn('Init settings error:', e);
    }

    try {
      this.bindGlobalNavigation();
      this.bindGalleryCategories();
      this.bindSettingsEvents();
      this.renderHomeScreen();
      this.renderGalleryCategories();
      this.renderGalleryGrid();
      this.renderPaletteTabs();
      this.renderPaletteSwatches(this.activePaletteId);
      this.bindEditorControls();
      this.bindModals();
    } catch (e) {
      console.error('Error during component initialization:', e);
    }

    // Show Home initially
    try {
      this.navigate('home');
    } catch (e) {
      console.error('Error navigating to home:', e);
    }
  }

  applyTheme(theme) {
    try {
      document.documentElement.setAttribute('data-theme', theme || 'light');
      const themeSelect = document.getElementById('setting-theme');
      if (themeSelect) themeSelect.value = theme || 'light';
    } catch (e) {
      console.warn('Apply theme error:', e);
    }
  }

  showToast(msg) {
    try {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = msg;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 250);
      }, 2200);
    } catch (e) {}
  }

  navigate(screenId) {
    try {
      sounds.playClick();
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(`screen-${screenId}`);
      if (target) {
        target.classList.add('active');
        this.currentScreen = screenId;
      }

      if (screenId === 'home') {
        this.renderHomeScreen();
      } else if (screenId === 'gallery') {
        this.renderGalleryGrid();
      } else if (screenId === 'creations') {
        this.renderCreationsGrid();
      } else if (screenId === 'favorites') {
        this.renderFavoritesGrid();
      } else if (screenId === 'editor') {
        if (this.engine) {
          setTimeout(() => {
            try { this.engine.fitToScreen(); } catch (e) {}
          }, 80);
        }
      }
    } catch (e) {
      console.error('Navigation error:', e);
    }
  }

  bindGlobalNavigation() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dest = btn.getAttribute('data-nav');
        if (dest) this.navigate(dest);
      });
    });

    document.querySelectorAll('[data-open-main-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-open-main-cat');
        if (cat) {
          this.setMainCategory(cat);
          this.navigate('gallery');
        }
      });
    });

    document.querySelectorAll('.btn-back').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.currentScreen === 'editor') {
          try { this.autoSaveCurrentWork(); } catch (e) {}
          this.navigate('home');
        } else {
          this.navigate('home');
        }
      });
    });
  }

  // ==========================================
  // HOME SCREEN
  // ==========================================
  renderHomeScreen() {
    try {
      const continueSection = document.getElementById('home-continue-section');
      const unfinished = StorageManager.getUnfinishedArtwork();

      if (unfinished && continueSection && unfinished.artworkId) {
        const matchingArt = ARTWORKS.find(a => a.id === unfinished.artworkId);
        if (matchingArt) {
          continueSection.style.display = 'block';
          const thumbEl = document.getElementById('continue-thumb');
          const titleEl = document.getElementById('continue-title');
          const progBar = document.getElementById('continue-progress-bar');
          const progLabel = document.getElementById('continue-progress-label');

          const progressVal = typeof unfinished.progress === 'number' ? unfinished.progress : 0;

          if (thumbEl) {
            if (unfinished.thumbnail) {
              thumbEl.innerHTML = `<img src="${unfinished.thumbnail}" alt="Continue" style="width:100%; height:100%; object-fit:cover;">`;
            } else {
              thumbEl.innerHTML = matchingArt.svg || '🎨';
            }
          }
          if (titleEl) titleEl.textContent = unfinished.title || matchingArt.title;
          if (progBar) progBar.style.width = `${progressVal}%`;
          if (progLabel) progLabel.textContent = `${progressVal}% Colored`;

          const card = document.getElementById('continue-card');
          if (card) {
            card.onclick = () => {
              this.openArtwork(unfinished.artworkId, unfinished.id);
            };
          }
        } else {
          continueSection.style.display = 'none';
        }
      } else if (continueSection) {
        continueSection.style.display = 'none';
      }

      // Recently Colored Carousel
      const recentContainer = document.getElementById('home-recent-list');
      const recentItems = StorageManager.getRecent();
      if (recentContainer) {
        recentContainer.innerHTML = '';
        if (!recentItems || recentItems.length === 0) {
          // Show first 5 gallery items as featured
          const featured = ARTWORKS.slice(0, 5);
          featured.forEach(art => {
            recentContainer.appendChild(this.createArtworkCard(art, false));
          });
        } else {
          recentItems.forEach(item => {
            const matchingArt = ARTWORKS.find(a => a.id === item.artworkId);
            const card = document.createElement('div');
            card.className = 'artwork-card';
            const progressVal = typeof item.progress === 'number' ? item.progress : 0;
            const thumbContent = item.thumbnail
              ? `<img src="${item.thumbnail}" alt="${item.title || 'Artwork'}">`
              : (matchingArt ? matchingArt.svg : '🎨');

            card.innerHTML = `
              <div class="artwork-thumb">
                ${thumbContent}
              </div>
              <div class="artwork-details">
                <div class="artwork-card-title">${item.title || (matchingArt ? matchingArt.title : 'Artwork')}</div>
                <div class="artwork-card-tag">${progressVal}% Colored</div>
              </div>
            `;
            card.onclick = () => {
              this.openArtwork(item.artworkId, item.id);
            };
            recentContainer.appendChild(card);
          });
        }
      }
    } catch (e) {
      console.error('Error rendering home screen:', e);
    }
  }

  // ==========================================
  // GALLERY
  // ==========================================
  bindGalleryCategories() {
    const animeBtn = document.getElementById('main-cat-anime');
    const villageBtn = document.getElementById('main-cat-village');

    if (animeBtn) {
      animeBtn.addEventListener('click', () => {
        sounds.playClick();
        this.setMainCategory('anime_girls');
      });
    }

    if (villageBtn) {
      villageBtn.addEventListener('click', () => {
        sounds.playClick();
        this.setMainCategory('nature_village');
      });
    }

    // Update count badges
    const animeCount = ARTWORKS.filter(a => a.category !== 'nature_village').length;
    const villageCount = ARTWORKS.filter(a => a.category === 'nature_village').length;
    const countAnimeEl = document.getElementById('count-anime');
    const countVillageEl = document.getElementById('count-village');
    if (countAnimeEl) countAnimeEl.textContent = animeCount;
    if (countVillageEl) countVillageEl.textContent = villageCount;
  }

  setMainCategory(catId) {
    this.mainCategory = catId;
    this.selectedSubCategory = 'all';

    const animeBtn = document.getElementById('main-cat-anime');
    const villageBtn = document.getElementById('main-cat-village');

    if (animeBtn && villageBtn) {
      if (catId === 'nature_village') {
        villageBtn.classList.add('active');
        villageBtn.setAttribute('aria-selected', 'true');
        animeBtn.classList.remove('active');
        animeBtn.setAttribute('aria-selected', 'false');
      } else {
        animeBtn.classList.add('active');
        animeBtn.setAttribute('aria-selected', 'true');
        villageBtn.classList.remove('active');
        villageBtn.setAttribute('aria-selected', 'false');
      }
    }

    this.renderGalleryCategories();
    this.renderGalleryGrid();
  }

  renderGalleryCategories() {
    const container = document.getElementById('gallery-category-pills');
    if (!container) return;

    let subCategories = [];
    if (this.mainCategory === 'nature_village') {
      subCategories = [
        { id: 'all', name: '✨ All Sceneries' },
        { id: 'popular', name: '🔥 Popular' },
        { id: 'village_homes', name: '🏡 Village Homes' },
        { id: 'river_bridges', name: '🌊 River & Bridges' },
        { id: 'fields_nature', name: '🌾 Farmland & Nature' },
        { id: 'farm_animals', name: '🐄 Farm Animals' },
        { id: 'children_play', name: '👦 Children Playing' },
        { id: 'nature_roads', name: '🛤️ Roads & Trees' }
      ];
    } else {
      subCategories = [
        { id: 'all', name: '✨ All Anime Girls' },
        { id: 'popular', name: '🔥 Popular' },
        { id: 'fantasy', name: '🔮 Fantasy' },
        { id: 'cute', name: '💖 Cute' },
        { id: 'chibi', name: '🎀 Chibi' },
        { id: 'princess', name: '👑 Princess' },
        { id: 'nature', name: '🌿 Nature' },
        { id: 'animals', name: '🦊 Animals' }
      ];
    }

    container.innerHTML = '';
    subCategories.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `category-pill ${this.selectedSubCategory === cat.id ? 'active' : ''}`;
      pill.textContent = cat.name;
      pill.onclick = () => {
        sounds.playClick();
        this.selectedSubCategory = cat.id;
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderGalleryGrid();
      };
      container.appendChild(pill);
    });
  }

  renderGalleryGrid() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const isVillage = this.mainCategory === 'nature_village';
    const filtered = ARTWORKS.filter(art => {
      const artIsVillage = art.category === 'nature_village' || (art.categories && art.categories.includes('nature_village'));
      if (isVillage !== artIsVillage) return false;

      if (this.selectedSubCategory === 'all') return true;
      return art.categories && art.categories.includes(this.selectedSubCategory);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${isVillage ? '🏡' : '🌸'}</div>
          <div class="empty-title">No artworks found</div>
          <div class="empty-desc">Try picking another category filter above!</div>
        </div>
      `;
      return;
    }

    filtered.forEach(art => {
      grid.appendChild(this.createArtworkCard(art, true));
    });
  }

  createArtworkCard(artwork, showFavButton = true) {
    if (!artwork) return document.createElement('div');

    const card = document.createElement('div');
    card.className = 'artwork-card';

    const isFav = StorageManager.isFavorite(artwork.id);
    const categoryName = artwork.category ? artwork.category.replace('_', ' ') : 'Anime';
    const difficultyName = artwork.difficulty || 'Easy';
    const title = artwork.title || 'Untitled';

    const thumbContent = artwork.image
      ? `<img src="${artwork.image}" alt="${title}" loading="lazy">`
      : (artwork.svg || '🎨');

    card.innerHTML = `
      <div class="artwork-thumb">
        ${thumbContent}
        ${showFavButton ? `<button class="card-fav-btn" data-favid="${artwork.id}">${isFav ? '❤️' : '🤍'}</button>` : ''}
      </div>
      <div class="artwork-details">
        <div class="artwork-card-title">${title}</div>
        <div class="artwork-card-tag">${categoryName} • ${difficultyName}</div>
      </div>
    `;

    if (showFavButton) {
      const favBtn = card.querySelector('.card-fav-btn');
      if (favBtn) {
        favBtn.onclick = (e) => {
          e.stopPropagation();
          const nextFav = StorageManager.toggleFavorite(artwork.id);
          favBtn.textContent = nextFav ? '❤️' : '🤍';
          sounds.playPop();
          this.showToast(nextFav ? 'Added to Favorites! 💖' : 'Removed from Favorites');
        };
      }
    }

    card.onclick = () => {
      this.openArtwork(artwork.id);
    };

    return card;
  }

  // ==========================================
  // CREATIONS & FAVORITES
  // ==========================================
  renderCreationsGrid() {
    const grid = document.getElementById('creations-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const creations = StorageManager.getCreations();

    if (!creations || creations.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <div class="empty-title">No creations yet!</div>
          <div class="empty-desc">Color your favorite anime drawing and hit Save to keep it here.</div>
          <button class="btn-primary" data-nav="gallery" style="margin-top:10px;">Browse Gallery</button>
        </div>
      `;
      const btn = grid.querySelector('[data-nav]');
      if (btn) btn.onclick = () => this.navigate('gallery');
      return;
    }

    creations.forEach(c => {
      const card = document.createElement('div');
      card.className = 'artwork-card';
      const dateStr = new Date(c.updatedAt || Date.now()).toLocaleDateString();
      const thumbContent = c.thumbnail ? `<img src="${c.thumbnail}" alt="${c.title || 'Creation'}">` : '🎨';

      card.innerHTML = `
        <div class="artwork-thumb">
          ${thumbContent}
        </div>
        <div class="artwork-details">
          <div class="artwork-card-title">${c.title || 'My Artwork'}</div>
          <div class="artwork-card-tag">${c.progress || 0}% • ${dateStr}</div>
        </div>
      `;

      card.onclick = () => {
        this.openArtwork(c.artworkId, c.id);
      };

      grid.appendChild(card);
    });
  }

  renderFavoritesGrid() {
    const grid = document.getElementById('favorites-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const favIds = StorageManager.getFavorites();
    const favArtworks = ARTWORKS.filter(a => a && favIds.includes(a.id));

    if (favArtworks.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">💖</div>
          <div class="empty-title">No Favorites Yet</div>
          <div class="empty-desc">Tap the heart icon on any artwork to add it to your favorites!</div>
        </div>
      `;
      return;
    }

    favArtworks.forEach(art => {
      grid.appendChild(this.createArtworkCard(art, true));
    });
  }

  // ==========================================
  // COLORING EDITOR
  // ==========================================
  openArtwork(artworkId, existingCreationId = null) {
    try {
      const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
      if (!artwork) return;

      this.currentArtwork = artwork;
      this.currentCreationId = existingCreationId || `creation_${Date.now()}`;

      // Title & info
      const titleEl = document.getElementById('editor-artwork-title');
      if (titleEl) titleEl.textContent = artwork.title;

      const stage = document.getElementById('editor-stage');
      if (stage) stage.innerHTML = '';

      let savedDataUrl = null;
      if (existingCreationId) {
        const creation = StorageManager.getCreationById(existingCreationId);
        if (creation && creation.colorLayerData) {
          savedDataUrl = creation.colorLayerData;
        }
      }

      this.engine = new ColoringEngine(stage, {
        onProgressChange: (prog) => {
          const bar = document.getElementById('editor-progress-bar');
          const text = document.getElementById('editor-progress-text');
          if (bar) bar.style.width = `${prog}%`;
          if (text) text.textContent = `${prog}%`;
        },
        onStateChange: (state) => {
          const btnUndo = document.getElementById('btn-tool-undo');
          const btnRedo = document.getElementById('btn-tool-redo');
          const zoomText = document.getElementById('zoom-level-indicator');

          if (btnUndo) btnUndo.disabled = !state.canUndo;
          if (btnRedo) btnRedo.disabled = !state.canRedo;
          if (zoomText) zoomText.textContent = `${Math.round(state.scale * 100)}%`;
        },
        onFillSparkle: () => {
          sounds.playPop();
        }
      });

      this.engine.activeColor = this.activeColor;

      const artworkSource = artwork.image || artwork.svg;
      this.engine.loadArtwork(artworkSource, savedDataUrl).then(() => {
        this.navigate('editor');
      });
    } catch (e) {
      console.error('Error opening artwork:', e);
      this.navigate('home');
    }
  }

  renderPaletteTabs() {
    const container = document.getElementById('palette-tabs');
    if (!container) return;
    container.innerHTML = '';

    Object.values(COLOR_PALETTES).forEach(pal => {
      const btn = document.createElement('button');
      btn.className = `palette-tab-btn ${this.activePaletteId === pal.id ? 'active' : ''}`;
      btn.textContent = `${pal.icon} ${pal.name}`;
      btn.onclick = () => {
        sounds.playClick();
        this.activePaletteId = pal.id;
        document.querySelectorAll('.palette-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderPaletteSwatches(pal.id);
      };
      container.appendChild(btn);
    });
  }

  renderPaletteSwatches(paletteId) {
    const grid = document.getElementById('palette-swatches-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const palette = COLOR_PALETTES[paletteId] || COLOR_PALETTES.skin;
    if (palette && Array.isArray(palette.colors)) {
      palette.colors.forEach(col => {
        const btn = document.createElement('button');
        btn.className = `swatch-btn ${this.activeColor.toLowerCase() === col.toLowerCase() ? 'selected' : ''}`;
        btn.style.backgroundColor = col;
        btn.onclick = () => {
          this.selectColor(col);
        };
        grid.appendChild(btn);
      });
    }
  }

  selectColor(hex) {
    if (!hex) return;
    sounds.playClick();
    this.activeColor = hex;
    StorageManager.addRecentColor(hex);

    if (this.engine) {
      this.engine.isEraser = false;
      this.engine.activeColor = hex;
    }

    const eraserBtn = document.getElementById('btn-tool-eraser');
    if (eraserBtn) eraserBtn.classList.remove('active');

    // Update active swatch preview
    const preview = document.getElementById('active-color-swatch');
    const label = document.getElementById('active-color-code');
    if (preview) preview.style.backgroundColor = hex;
    if (label) label.textContent = hex.toUpperCase();

    // Update swatches selection
    document.querySelectorAll('.swatch-btn').forEach(s => {
      s.classList.toggle('selected', s.style.backgroundColor === hex || s.getAttribute('data-color') === hex);
    });
  }

  bindEditorControls() {
    // Tool Buttons
    const btnUndo = document.getElementById('btn-tool-undo');
    if (btnUndo) {
      btnUndo.onclick = () => {
        if (this.engine && this.engine.undo()) {
          sounds.playUndo();
        }
      };
    }

    const btnRedo = document.getElementById('btn-tool-redo');
    if (btnRedo) {
      btnRedo.onclick = () => {
        if (this.engine && this.engine.redo()) {
          sounds.playClick();
        }
      };
    }

    const btnEraser = document.getElementById('btn-tool-eraser');
    if (btnEraser) {
      btnEraser.onclick = () => {
        if (!this.engine) return;
        sounds.playClick();
        this.engine.isEraser = !this.engine.isEraser;
        btnEraser.classList.toggle('active', this.engine.isEraser);
        this.showToast(this.engine.isEraser ? 'Eraser Mode ON' : 'Coloring Mode');
      };
    }

    const btnReset = document.getElementById('btn-tool-reset');
    if (btnReset) {
      btnReset.onclick = () => {
        this.showConfirmDialog('Reset Drawing?', 'This will clear all colors and restore the original line art.', () => {
          if (this.engine) {
            this.engine.reset();
            sounds.playTrash();
            this.showToast('Drawing reset to blank');
          }
        });
      };
    }

    const btnSave = document.getElementById('btn-tool-save');
    if (btnSave) {
      btnSave.onclick = () => {
        this.saveCurrentWork(true);
      };
    }

    const btnExport = document.getElementById('btn-tool-export');
    if (btnExport) {
      btnExport.onclick = () => {
        this.exportArtwork();
      };
    }

    // Zoom buttons
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomFit = document.getElementById('btn-zoom-fit');

    if (btnZoomIn) btnZoomIn.onclick = () => this.engine && this.engine.zoomIn();
    if (btnZoomOut) btnZoomOut.onclick = () => this.engine && this.engine.zoomOut();
    if (btnZoomFit) btnZoomFit.onclick = () => this.engine && this.engine.fitToScreen();

    // Custom Color Picker Button
    const btnCustomColor = document.getElementById('btn-custom-color-picker');
    const colorInput = document.getElementById('native-color-picker');
    if (btnCustomColor && colorInput) {
      btnCustomColor.onclick = () => {
        colorInput.click();
      };
      colorInput.oninput = (e) => {
        this.selectColor(e.target.value);
      };
    }
  }

  saveCurrentWork(showNotification = false) {
    if (!this.engine || !this.currentArtwork) return;

    try {
      const thumbnail = this.engine.exportPNG();
      const colorLayer = this.engine.getColorLayerDataUrl();
      const progress = this.engine.calculateProgress();

      const creation = {
        id: this.currentCreationId,
        artworkId: this.currentArtwork.id,
        title: this.currentArtwork.title,
        thumbnail: thumbnail,
        colorLayerData: colorLayer,
        progress: progress,
        updatedAt: Date.now()
      };

      StorageManager.saveCreation(creation);
      if (showNotification) {
        sounds.playSparkle();
        this.showToast('Artwork saved to My Creations! ✨');
      }
    } catch (e) {
      console.warn('Failed to save artwork:', e);
    }
  }

  autoSaveCurrentWork() {
    this.saveCurrentWork(false);
  }

  exportArtwork() {
    if (!this.engine || !this.currentArtwork) return;
    try {
      sounds.playSparkle();

      const dataUrl = this.engine.exportPNG();
      const modal = document.getElementById('modal-export');
      const preview = document.getElementById('export-preview-img');
      const downloadBtn = document.getElementById('btn-download-png');

      if (preview) preview.src = dataUrl;
      if (downloadBtn) {
        downloadBtn.onclick = () => {
          try {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `ColorFun_${this.currentArtwork.id}_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.showToast('PNG exported! 🎨');
          } catch (e) {
            console.warn('Download error:', e);
          }
          if (modal) modal.classList.remove('active');
        };
      }

      if (modal) modal.classList.add('active');
    } catch (e) {
      console.error('Export error:', e);
    }
  }

  // ==========================================
  // MODALS & CONFIRMATIONS
  // ==========================================
  bindModals() {
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });
  }

  showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('modal-confirm');
    const titleEl = document.getElementById('confirm-title');
    const msgEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('btn-confirm-ok');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    if (okBtn) {
      okBtn.onclick = () => {
        if (modal) modal.classList.remove('active');
        if (onConfirm) onConfirm();
      };
    }

    if (modal) modal.classList.add('active');
  }

  // ==========================================
  // SETTINGS
  // ==========================================
  bindSettingsEvents() {
    const themeSelect = document.getElementById('setting-theme');
    const soundToggle = document.getElementById('setting-sound');
    const animToggle = document.getElementById('setting-animations');

    if (themeSelect) {
      themeSelect.value = this.settings.theme;
      themeSelect.onchange = (e) => {
        this.settings.theme = e.target.value;
        StorageManager.saveSettings(this.settings);
        this.applyTheme(this.settings.theme);
        sounds.playClick();
      };
    }

    if (soundToggle) {
      soundToggle.checked = this.settings.soundEnabled;
      soundToggle.onchange = (e) => {
        this.settings.soundEnabled = e.target.checked;
        StorageManager.saveSettings(this.settings);
        sounds.setEnabled(this.settings.soundEnabled);
      };
    }

    if (animToggle) {
      animToggle.checked = this.settings.animationsEnabled;
      animToggle.onchange = (e) => {
        this.settings.animationsEnabled = e.target.checked;
        StorageManager.saveSettings(this.settings);
      };
    }

    const btnClearCreations = document.getElementById('btn-clear-creations');
    if (btnClearCreations) {
      btnClearCreations.onclick = () => {
        this.showConfirmDialog('Clear My Creations?', 'Are you sure you want to delete all saved drawings? This cannot be undone.', () => {
          StorageManager.clearAllCreations();
          sounds.playTrash();
          this.showToast('All creations cleared.');
        });
      };
    }

    const btnResetAll = document.getElementById('btn-reset-app-data');
    if (btnResetAll) {
      btnResetAll.onclick = () => {
        this.showConfirmDialog('Reset All App Data?', 'This will reset settings, creations, and favorites to defaults.', () => {
          StorageManager.resetAllData();
          sounds.playTrash();
          this.settings = StorageManager.getSettings();
          this.applyTheme(this.settings.theme);
          this.showToast('App data reset complete.');
        });
      };
    }
  }
}

// Instantiate app with foolproof startup
function startColorFunApp() {
  if (window.colorFunApp) return;
  try {
    window.colorFunApp = new ColorFunApp();
    console.log('ColorFunApp successfully initialized and running.');
  } catch (err) {
    console.error('Fatal startup error in ColorFunApp:', err);
  }
}

  window.ColorFunApp = ColorFunApp;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ColorFunApp };
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startColorFunApp);
  } else {
    startColorFunApp();
  }
})();

