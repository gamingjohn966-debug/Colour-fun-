// Color Fun - Persistent Storage Manager (IndexedDB + LocalStorage fallback)

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

export class StorageManager {
  static getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      console.warn('Failed to load settings:', e);
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }

  static getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load favorites:', e);
      return [];
    }
  }

  static toggleFavorite(artworkId) {
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
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return isFav;
    } catch (e) {
      console.warn('Failed to toggle favorite:', e);
      return false;
    }
  }

  static isFavorite(artworkId) {
    const favs = this.getFavorites();
    return favs.includes(artworkId);
  }

  static getCreations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CREATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load creations:', e);
      return [];
    }
  }

  static saveCreation(creation) {
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

      localStorage.setItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));
      this.updateRecent(updatedCreation);
      return updatedCreation;
    } catch (e) {
      console.warn('Failed to save creation:', e);
      return null;
    }
  }

  static getCreationById(id) {
    const creations = this.getCreations();
    return creations.find(c => c.id === id) || null;
  }

  static deleteCreation(id) {
    try {
      let creations = this.getCreations();
      creations = creations.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));

      // Also clean up recent if it was deleted
      let recent = this.getRecent();
      recent = recent.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
      return true;
    } catch (e) {
      console.warn('Failed to delete creation:', e);
      return false;
    }
  }

  static renameCreation(id, newTitle) {
    try {
      const creations = this.getCreations();
      const item = creations.find(c => c.id === id);
      if (item) {
        item.title = newTitle;
        item.updatedAt = Date.now();
        localStorage.setItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));
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
      localStorage.removeItem(STORAGE_KEYS.CREATIONS);
      localStorage.removeItem(STORAGE_KEYS.RECENT);
      return true;
    } catch (e) {
      console.warn('Failed to clear creations:', e);
      return false;
    }
  }

  static resetAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.warn('Failed to reset data:', e);
      return false;
    }
  }

  static getRecent() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load recent artwork:', e);
      return [];
    }
  }

  static updateRecent(item) {
    try {
      let recent = this.getRecent();
      recent = recent.filter(r => r.id !== item.id);
      recent.unshift({
        id: item.id,
        artworkId: item.artworkId,
        title: item.title,
        thumbnail: item.thumbnail,
        progress: item.progress || 0,
        updatedAt: Date.now()
      });
      // Keep up to 8 recent items
      recent = recent.slice(0, 8);
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
    } catch (e) {
      console.warn('Failed to update recent:', e);
    }
  }

  static getUnfinishedArtwork() {
    const recent = this.getRecent();
    // Find the most recent artwork with progress between 1% and 99%
    return recent.find(r => r.progress > 0 && r.progress < 100) || recent[0] || null;
  }

  static getRecentColors() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_COLORS);
      return data ? JSON.parse(data) : ['#FF758F', '#4CC9F0', '#FFD166', '#7209B7', '#52B788', '#FFE0BD', '#FFB5E8'];
    } catch (e) {
      return ['#FF758F', '#4CC9F0', '#FFD166', '#7209B7', '#52B788', '#FFE0BD', '#FFB5E8'];
    }
  }

  static addRecentColor(color) {
    try {
      let colors = this.getRecentColors();
      colors = colors.filter(c => c.toLowerCase() !== color.toLowerCase());
      colors.unshift(color);
      colors = colors.slice(0, 14);
      localStorage.setItem(STORAGE_KEYS.RECENT_COLORS, JSON.stringify(colors));
    } catch (e) {
      console.warn('Failed to add recent color:', e);
    }
  }
}
