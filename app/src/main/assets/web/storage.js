// Color Fun - Persistent Storage Manager (IndexedDB + LocalStorage fallback)
(function() {
  const STORAGE_KEYS = {
    SETTINGS: 'colorfun_settings_v1',
    FAVORITES: 'colorfun_favorites_v1',
    CREATIONS: 'colorfun_creations_v1',
    RECENT: 'colorfun_recent_v1',
    CURRENT_DRAFT: 'colorfun_current_draft_v1',
    RECENT_COLORS: 'colorfun_recent_colors_v1'
  };

  const DEFAULT_SETTINGS = {
    theme: 'light',
    soundEnabled: true,
    animationsEnabled: true
  };

  const memoryStore = new Map();

  function safeGetItem(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem(key);
        if (item !== null) return item;
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return memoryStore.get(key) || null;
  }

  function safeSetItem(key, value) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
    memoryStore.set(key, value);
  }

  function safeRemoveItem(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('LocalStorage remove error:', e);
    }
    memoryStore.delete(key);
  }

  class StorageManager {
    static getSettings() {
      try {
        const data = safeGetItem(STORAGE_KEYS.SETTINGS);
        if (!data) return { ...DEFAULT_SETTINGS };
        const parsed = JSON.parse(data);
        return typeof parsed === 'object' && parsed !== null
          ? { ...DEFAULT_SETTINGS, ...parsed }
          : { ...DEFAULT_SETTINGS };
      } catch (e) {
        console.warn('Failed to load settings:', e);
        return { ...DEFAULT_SETTINGS };
      }
    }

    static saveSettings(settings) {
      try {
        safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings || DEFAULT_SETTINGS));
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
    }

    static getFavorites() {
      try {
        const data = safeGetItem(STORAGE_KEYS.FAVORITES);
        if (!data) return [];
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : [];
      } catch (e) {
        console.warn('Failed to load favorites:', e);
        return [];
      }
    }

    static toggleFavorite(artworkId) {
      if (!artworkId) return false;
      try {
        let favs = this.getFavorites();
        const idx = favs.indexOf(artworkId);
        let isFav = false;
        if (idx > -1) {
          favs.splice(idx, 1);
          isFav = false;
        } else {
          favs.push(artworkId);
          isFav = true;
        }
        safeSetItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
        return isFav;
      } catch (e) {
        console.warn('Failed to toggle favorite:', e);
        return false;
      }
    }

    static isFavorite(artworkId) {
      if (!artworkId) return false;
      const favs = this.getFavorites();
      return favs.includes(artworkId);
    }

    static getCreations() {
      try {
        const data = safeGetItem(STORAGE_KEYS.CREATIONS);
        if (!data) return [];
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.filter(c => c && typeof c === 'object' && c.id) : [];
      } catch (e) {
        console.warn('Failed to load creations:', e);
        return [];
      }
    }

    static saveCreation(creation) {
      if (!creation || !creation.id) return null;
      try {
        const creations = this.getCreations();
        const existingIdx = creations.findIndex(c => c.id === creation.id);
        const updatedCreation = {
          ...creation,
          updatedAt: Date.now()
        };

        if (existingIdx >= 0) {
          creations[existingIdx] = updatedCreation;
        } else {
          creations.unshift(updatedCreation);
        }

        safeSetItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));
        this.updateRecent(updatedCreation);
        return updatedCreation;
      } catch (e) {
        console.warn('Failed to save creation:', e);
        return null;
      }
    }

    static getCreationById(id) {
      if (!id) return null;
      const creations = this.getCreations();
      return creations.find(c => c.id === id) || null;
    }

    static deleteCreation(id) {
      if (!id) return false;
      try {
        let creations = this.getCreations();
        creations = creations.filter(c => c.id !== id);
        safeSetItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));

        let recent = this.getRecent();
        recent = recent.filter(r => r.id !== id);
        safeSetItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
        return true;
      } catch (e) {
        console.warn('Failed to delete creation:', e);
        return false;
      }
    }

    static renameCreation(id, newTitle) {
      if (!id || !newTitle) return false;
      try {
        const creations = this.getCreations();
        const item = creations.find(c => c.id === id);
        if (item) {
          item.title = newTitle;
          item.updatedAt = Date.now();
          safeSetItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));
          this.updateRecent(item);
          return true;
        }
        return false;
      } catch (e) {
        console.warn('Failed to rename creation:', e);
        return false;
      }
    }

    static clearAllCreations() {
      try {
        safeRemoveItem(STORAGE_KEYS.CREATIONS);
        safeRemoveItem(STORAGE_KEYS.RECENT);
        return true;
      } catch (e) {
        console.warn('Failed to clear creations:', e);
        return false;
      }
    }

    static resetAllData() {
      try {
        Object.values(STORAGE_KEYS).forEach(k => safeRemoveItem(k));
        return true;
      } catch (e) {
        console.warn('Failed to reset data:', e);
        return false;
      }
    }

    static getRecent() {
      try {
        const data = safeGetItem(STORAGE_KEYS.RECENT);
        if (!data) return [];
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.filter(r => r && typeof r === 'object' && r.artworkId) : [];
      } catch (e) {
        console.warn('Failed to load recent artwork:', e);
        return [];
      }
    }

    static updateRecent(item) {
      if (!item || !item.artworkId) return;
      try {
        let recent = this.getRecent();
        recent = recent.filter(r => r.id !== item.id);
        recent.unshift({
          id: item.id || `rec_${Date.now()}`,
          artworkId: item.artworkId,
          title: item.title || 'Untitled Artwork',
          thumbnail: item.thumbnail || '',
          progress: typeof item.progress === 'number' ? item.progress : 0,
          updatedAt: Date.now()
        });
        recent = recent.slice(0, 8);
        safeSetItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
      } catch (e) {
        console.warn('Failed to update recent:', e);
      }
    }

    static getUnfinishedArtwork() {
      try {
        const recent = this.getRecent();
        return recent.find(r => r && r.progress > 0 && r.progress < 100) || recent[0] || null;
      } catch (e) {
        return null;
      }
    }

    static getRecentColors() {
      const defaultColors = ['#FFB4AB', '#4CC9F0', '#FFD166', '#7209B7', '#52B788', '#FFE0BD', '#FFB5E8'];
      try {
        const data = safeGetItem(STORAGE_KEYS.RECENT_COLORS);
        if (!data) return defaultColors;
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultColors;
      } catch (e) {
        return defaultColors;
      }
    }

    static addRecentColor(color) {
      if (!color || typeof color !== 'string') return;
      try {
        let colors = this.getRecentColors();
        colors = colors.filter(c => c.toLowerCase() !== color.toLowerCase());
        colors.unshift(color);
        colors = colors.slice(0, 14);
        safeSetItem(STORAGE_KEYS.RECENT_COLORS, JSON.stringify(colors));
      } catch (e) {
        console.warn('Failed to add recent color:', e);
      }
    }
  }

  window.StorageManager = StorageManager;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageManager };
  }
})();
