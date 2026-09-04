// Color Fun - Main Application Controller
import { ARTWORKS } from './artworks.js';
import { COLOR_PALETTES } from './palettes.js';
import { StorageManager } from './storage.js';
import { sounds } from './audio.js';
import { ColoringEngine } from './engine.js';

class ColorFunApp {
  constructor() {
    this.currentScreen = 'home';
    this.currentArtwork = null;
    this.currentCreationId = null;
    this.engine = null;

    this.activePaletteId = 'skin';
    this.activeColor = '#FFB4AB';
    this.selectedCategory = 'all';

    this.settings = StorageManager.getSettings();

    this.init();
  }

  init() {
    this.applyTheme(this.settings.theme);
    sounds.setEnabled(this.settings.soundEnabled);

    this.bindGlobalNavigation();
    this.bindSettingsEvents();
    this.renderHomeScreen();
    this.renderGalleryCategories();
    this.renderGalleryGrid();
    this.renderPaletteTabs();
    this.renderPaletteSwatches(this.activePaletteId);
    this.bindEditorControls();
    this.bindModals();

    // Show Home initially
    this.navigate('home');
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeSelect = document.getElementById('setting-theme');
    if (themeSelect) themeSelect.value = theme;
  }

  showToast(msg) {
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
  }

  navigate(screenId) {
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
        setTimeout(() => this.engine.fitToScreen(), 80);
      }
    }
  }

  bindGlobalNavigation() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dest = btn.getAttribute('data-nav');
        this.navigate(dest);
      });
    });

    document.querySelectorAll('.btn-back').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.currentScreen === 'editor') {
          this.autoSaveCurrentWork();
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
    const continueSection = document.getElementById('home-continue-section');
    const unfinished = StorageManager.getUnfinishedArtwork();

    if (unfinished && continueSection) {
      continueSection.style.display = 'block';
      const thumbEl = document.getElementById('continue-thumb');
      const titleEl = document.getElementById('continue-title');
      const progBar = document.getElementById('continue-progress-bar');
      const progLabel = document.getElementById('continue-progress-label');

      if (thumbEl) thumbEl.innerHTML = `<img src="${unfinished.thumbnail}" alt="Continue">`;
      if (titleEl) titleEl.textContent = unfinished.title;
      if (progBar) progBar.style.width = `${unfinished.progress}%`;
      if (progLabel) progLabel.textContent = `${unfinished.progress}% Colored`;

      const card = document.getElementById('continue-card');
      if (card) {
        card.onclick = () => {
          this.openArtwork(unfinished.artworkId, unfinished.id);
        };
      }
    } else if (continueSection) {
      continueSection.style.display = 'none';
    }

    // Recently Colored Carousel
    const recentContainer = document.getElementById('home-recent-list');
    const recentItems = StorageManager.getRecent();
    if (recentContainer) {
      recentContainer.innerHTML = '';
      if (recentItems.length === 0) {
        // Show first 4 gallery items as featured
        const featured = ARTWORKS.slice(0, 5);
        featured.forEach(art => {
          recentContainer.appendChild(this.createArtworkCard(art, false));
        });
      } else {
        recentItems.forEach(item => {
          const card = document.createElement('div');
          card.className = 'artwork-card';
          card.innerHTML = `
            <div class="artwork-thumb">
              <img src="${item.thumbnail}" alt="${item.title}">
            </div>
            <div class="artwork-details">
              <div class="artwork-card-title">${item.title}</div>
              <div class="artwork-card-tag">${item.progress}% Colored</div>
            </div>
          `;
          card.onclick = () => {
            this.openArtwork(item.artworkId, item.id);
          };
          recentContainer.appendChild(card);
        });
      }
    }
  }

  // ==========================================
  // GALLERY
  // ==========================================
  renderGalleryCategories() {
    const container = document.getElementById('gallery-category-pills');
    if (!container) return;

    const categories = [
      { id: 'all', name: '✨ All Art' },
      { id: 'popular', name: '🔥 Popular' },
      { id: 'anime_girls', name: '🌸 Anime Girls' },
      { id: 'fantasy', name: '🔮 Fantasy' },
      { id: 'cute', name: '💖 Cute' },
      { id: 'chibi', name: '🎀 Chibi' },
      { id: 'princess', name: '👑 Princess' },
      { id: 'nature', name: '🌿 Nature' },
      { id: 'animals', name: '🦊 Animals' }
    ];

    container.innerHTML = '';
    categories.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `category-pill ${this.selectedCategory === cat.id ? 'active' : ''}`;
      pill.textContent = cat.name;
      pill.onclick = () => {
        sounds.playClick();
        this.selectedCategory = cat.id;
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

    const filtered = ARTWORKS.filter(art => {
      if (this.selectedCategory === 'all') return true;
      return art.categories && art.categories.includes(this.selectedCategory);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎨</div>
          <div class="empty-title">No artworks found</div>
          <div class="empty-desc">Try picking another category!</div>
        </div>
      `;
      return;
    }

    filtered.forEach(art => {
      grid.appendChild(this.createArtworkCard(art, true));
    });
  }

  createArtworkCard(artwork, showFavButton = true) {
    const card = document.createElement('div');
    card.className = 'artwork-card';

    const isFav = StorageManager.isFavorite(artwork.id);

    card.innerHTML = `
      <div class="artwork-thumb">
        ${artwork.svg}
        ${showFavButton ? `<button class="card-fav-btn" data-favid="${artwork.id}">${isFav ? '❤️' : '🤍'}</button>` : ''}
      </div>
      <div class="artwork-details">
        <div class="artwork-card-title">${artwork.title}</div>
        <div class="artwork-card-tag">${artwork.category.replace('_', ' ')} • ${artwork.difficulty}</div>
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

    if (creations.length === 0) {
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
      card.innerHTML = `
        <div class="artwork-thumb">
          <img src="${c.thumbnail}" alt="${c.title}">
        </div>
        <div class="artwork-details">
          <div class="artwork-card-title">${c.title}</div>
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
    const favArtworks = ARTWORKS.filter(a => favIds.includes(a.id));

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
    const artwork = ARTWORKS.find(a => a.id === artworkId);
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

    this.engine.loadArtwork(artwork.svg, savedDataUrl).then(() => {
      this.navigate('editor');
    });
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

  selectColor(hex) {
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
  }

  autoSaveCurrentWork() {
    this.saveCurrentWork(false);
  }

  exportArtwork() {
    if (!this.engine || !this.currentArtwork) return;
    sounds.playSparkle();

    const dataUrl = this.engine.exportPNG();
    const modal = document.getElementById('modal-export');
    const preview = document.getElementById('export-preview-img');
    const downloadBtn = document.getElementById('btn-download-png');

    if (preview) preview.src = dataUrl;
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `ColorFun_${this.currentArtwork.id}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.showToast('PNG downloaded successfully! 🎨');
        modal.classList.remove('active');
      };
    }

    if (modal) modal.classList.add('active');
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
        modal.classList.remove('active');
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

// Instantiate app on load
window.addEventListener('DOMContentLoaded', () => {
  window.colorFunApp = new ColorFunApp();
});
