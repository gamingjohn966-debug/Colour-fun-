// Color Fun - Canvas Flood Fill & Coloring Engine

export class ColoringEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;

    this.width = 800;
    this.height = 800;

    this.scale = 1;
    this.panX = 0;
    this.panY = 0;

    this.activeColor = '#FFB4AB';
    this.isEraser = false;
    this.toolMode = 'fill'; // 'fill' | 'pan'

    this.history = [];
    this.redoStack = [];
    this.maxHistory = 30;

    this.onProgressChange = options.onProgressChange || (() => {});
    this.onStateChange = options.onStateChange || (() => {});
    this.onFillSparkle = options.onFillSparkle || (() => {});

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'engine-wrapper';
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.touchAction = 'none';
    this.wrapper.style.userSelect = 'none';

    this.transformLayer = document.createElement('div');
    this.transformLayer.className = 'engine-transform-layer';
    this.transformLayer.style.position = 'absolute';
    this.transformLayer.style.left = '50%';
    this.transformLayer.style.top = '50%';
    this.transformLayer.style.transformOrigin = '0 0';

    // Canvas Layers:
    // 1. Color Canvas (where user fills)
    this.colorCanvas = document.createElement('canvas');
    this.colorCanvas.width = this.width;
    this.colorCanvas.height = this.height;
    this.colorCanvas.className = 'canvas-color-layer';
    this.colorCtx = this.colorCanvas.getContext('2d', { willReadFrequently: true });

    // 2. Line Art Canvas (black strokes overlay)
    this.lineCanvas = document.createElement('canvas');
    this.lineCanvas.width = this.width;
    this.lineCanvas.height = this.height;
    this.lineCanvas.className = 'canvas-line-layer';
    this.lineCtx = this.lineCanvas.getContext('2d', { willReadFrequently: true });

    // 3. Particle Effect Canvas (sparkles)
    this.particleCanvas = document.createElement('canvas');
    this.particleCanvas.width = this.width;
    this.particleCanvas.height = this.height;
    this.particleCanvas.className = 'canvas-particle-layer';
    this.particleCtx = this.particleCanvas.getContext('2d');

    this.transformLayer.appendChild(this.colorCanvas);
    this.transformLayer.appendChild(this.lineCanvas);
    this.transformLayer.appendChild(this.particleCanvas);
    this.wrapper.appendChild(this.transformLayer);
    this.container.appendChild(this.wrapper);

    this.updateTransform();
  }

  loadArtwork(artworkSvgString, savedDataUrl = null) {
    return new Promise((resolve) => {
      this.currentSvg = artworkSvgString;
      const img = new Image();
      const svgBlob = new Blob([artworkSvgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Draw line art
        this.lineCtx.clearRect(0, 0, this.width, this.height);
        this.lineCtx.drawImage(img, 0, 0, this.width, this.height);
        URL.revokeObjectURL(url);

        // Clear color canvas or load existing
        this.colorCtx.fillStyle = '#FFFFFF';
        this.colorCtx.fillRect(0, 0, this.width, this.height);

        if (savedDataUrl) {
          const savedImg = new Image();
          savedImg.onload = () => {
            this.colorCtx.drawImage(savedImg, 0, 0, this.width, this.height);
            this.history = [this.getSnapshot()];
            this.redoStack = [];
            this.calculateProgress();
            this.fitToScreen();
            this.notifyState();
            resolve();
          };
          savedImg.src = savedDataUrl;
        } else {
          this.history = [this.getSnapshot()];
          this.redoStack = [];
          this.calculateProgress();
          this.fitToScreen();
          this.notifyState();
          resolve();
        }
      };
      img.src = url;
    });
  }

  getSnapshot() {
    return this.colorCtx.getImageData(0, 0, this.width, this.height);
  }

  pushSnapshot() {
    const snap = this.getSnapshot();
    this.history.push(snap);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    this.redoStack = [];
    this.calculateProgress();
    this.notifyState();
  }

  undo() {
    if (this.history.length > 1) {
      const current = this.history.pop();
      this.redoStack.push(current);
      const prev = this.history[this.history.length - 1];
      this.colorCtx.putImageData(prev, 0, 0);
      this.calculateProgress();
      this.notifyState();
      return true;
    }
    return false;
  }

  redo() {
    if (this.redoStack.length > 0) {
      const next = this.redoStack.pop();
      this.history.push(next);
      this.colorCtx.putImageData(next, 0, 0);
      this.calculateProgress();
      this.notifyState();
      return true;
    }
    return false;
  }

  reset() {
    this.colorCtx.fillStyle = '#FFFFFF';
    this.colorCtx.fillRect(0, 0, this.width, this.height);
    this.history = [this.getSnapshot()];
    this.redoStack = [];
    this.calculateProgress();
    this.notifyState();
  }

  calculateProgress() {
    try {
      const imgData = this.colorCtx.getImageData(0, 0, this.width, this.height).data;
      let nonWhitePixels = 0;
      let sampleStep = 16; // sampled for speed
      let totalSampled = 0;

      for (let i = 0; i < imgData.length; i += 4 * sampleStep) {
        totalSampled++;
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        if (r < 245 || g < 245 || b < 245) {
          nonWhitePixels++;
        }
      }

      let percentage = Math.min(100, Math.round((nonWhitePixels / (totalSampled * 0.7)) * 100));
      this.currentProgress = percentage;
      this.onProgressChange(percentage);
      return percentage;
    } catch (e) {
      return 0;
    }
  }

  notifyState() {
    this.onStateChange({
      canUndo: this.history.length > 1,
      canRedo: this.redoStack.length > 0,
      scale: this.scale,
      progress: this.currentProgress || 0
    });
  }

  // Fast Scanline Flood Fill Algorithm
  floodFill(startX, startY, fillColorHex) {
    const x = Math.floor(startX);
    const y = Math.floor(startY);

    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;

    // Check if clicked on a black line in lineCtx
    const lineData = this.lineCtx.getImageData(0, 0, this.width, this.height).data;
    const lineIdx = (y * this.width + x) * 4;
    const lineR = lineData[lineIdx];
    const lineG = lineData[lineIdx + 1];
    const lineB = lineData[lineIdx + 2];
    const lineA = lineData[lineIdx + 3];

    // If black/dark line boundary (luminance < 75 and alpha > 120), don't fill lines
    if (lineA > 100 && (lineR * 0.299 + lineG * 0.587 + lineB * 0.114 < 75)) {
      return false;
    }

    // Color Canvas ImageData
    const colorImageData = this.colorCtx.getImageData(0, 0, this.width, this.height);
    const pixels = colorImageData.data;
    const pixel32 = new Uint32Array(pixels.buffer);

    const targetIdx = y * this.width + x;
    const targetColor = pixel32[targetIdx];

    // Parse fill color
    const fillRgba = this.hexToRgba(this.isEraser ? '#FFFFFF' : fillColorHex);
    const fill32 = (fillRgba.a << 24) | (fillRgba.b << 16) | (fillRgba.g << 8) | fillRgba.r;

    if (targetColor === fill32) return false;

    const width = this.width;
    const height = this.height;
    const stack = [[x, y]];
    const visited = new Uint8Array(width * height);

    const isMatch = (px, py) => {
      const idx = py * width + px;
      if (visited[idx]) return false;

      // Check line barrier
      const lIdx = idx * 4;
      const lA = lineData[lIdx + 3];
      if (lA > 120) {
        const lum = lineData[lIdx] * 0.299 + lineData[lIdx + 1] * 0.587 + lineData[lIdx + 2] * 0.114;
        if (lum < 75) return false;
      }

      // Check color similarity
      const pColor = pixel32[idx];
      return pColor === targetColor;
    };

    while (stack.length > 0) {
      const [curX, curY] = stack.pop();
      let left = curX;
      let right = curX;

      while (left > 0 && isMatch(left - 1, curY)) {
        left--;
      }
      while (right < width - 1 && isMatch(right + 1, curY)) {
        right++;
      }

      for (let i = left; i <= right; i++) {
        const idx = curY * width + i;
        pixel32[idx] = fill32;
        visited[idx] = 1;

        if (curY > 0 && isMatch(i, curY - 1)) {
          stack.push([i, curY - 1]);
        }
        if (curY < height - 1 && isMatch(i, curY + 1)) {
          stack.push([i, curY + 1]);
        }
      }
    }

    this.colorCtx.putImageData(colorImageData, 0, 0);
    this.pushSnapshot();
    this.spawnSparkles(startX, startY, fillColorHex);
    return true;
  }

  hexToRgba(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
      a: 255
    };
  }

  // Sparkle Burst Particles
  spawnSparkles(x, y, color) {
    const sparkles = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = 2 + Math.random() * 5;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        alpha: 1,
        color: Math.random() > 0.3 ? color : '#FFF'
      });
    }

    const animate = () => {
      this.particleCtx.clearRect(0, 0, this.width, this.height);
      let alive = false;
      sparkles.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.04;
        if (s.alpha > 0) {
          alive = true;
          this.particleCtx.save();
          this.particleCtx.globalAlpha = Math.max(0, s.alpha);
          this.particleCtx.fillStyle = s.color;
          this.particleCtx.beginPath();
          this.particleCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          this.particleCtx.fill();
          this.particleCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        this.particleCtx.clearRect(0, 0, this.width, this.height);
      }
    };
    animate();
    this.onFillSparkle(x, y);
  }

  // Zoom and Pan Controls
  zoomIn() {
    this.setScale(this.scale * 1.25);
  }

  zoomOut() {
    this.setScale(this.scale / 1.25);
  }

  resetZoom() {
    this.scale = 1;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
    this.notifyState();
  }

  fitToScreen() {
    const rect = this.wrapper.getBoundingClientRect();
    if (rect.width && rect.height) {
      const padding = 24;
      const availableW = rect.width - padding * 2;
      const availableH = rect.height - padding * 2;
      const s = Math.min(availableW / this.width, availableH / this.height, 1.4);
      this.scale = Math.max(s, 0.4);
      this.panX = 0;
      this.panY = 0;
      this.updateTransform();
      this.notifyState();
    }
  }

  setScale(newScale) {
    this.scale = Math.min(Math.max(newScale, 0.3), 4.0);
    this.updateTransform();
    this.notifyState();
  }

  updateTransform() {
    this.transformLayer.style.transform = `translate(-50%, -50%) translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
  }

  screenToCanvasCoords(clientX, clientY) {
    const rect = this.wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + this.panX;
    const centerY = rect.top + rect.height / 2 + this.panY;

    const offsetX = (clientX - centerX) / this.scale;
    const offsetY = (clientY - centerY) / this.scale;

    return {
      x: offsetX + this.width / 2,
      y: offsetY + this.height / 2
    };
  }

  bindEvents() {
    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let initialPanX = 0;
    let initialPanY = 0;
    let isDragging = false;
    let initialDistance = 0;
    let initialScale = 1;
    let activePointers = new Map();

    const onPointerDown = (e) => {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 1) {
        isPointerDown = true;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        initialPanX = this.panX;
        initialPanY = this.panY;
      } else if (activePointers.size === 2) {
        // Pinch zoom start
        const pts = Array.from(activePointers.values());
        initialDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        initialScale = this.scale;
      }
    };

    const onPointerMove = (e) => {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (initialDistance > 10) {
          const factor = dist / initialDistance;
          this.setScale(initialScale * factor);
        }
      } else if (activePointers.size === 1 && isPointerDown) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (this.toolMode === 'pan' || Math.hypot(dx, dy) > 8) {
          isDragging = true;
          this.panX = initialPanX + dx;
          this.panY = initialPanY + dy;
          this.updateTransform();
        }
      }
    };

    const onPointerUp = (e) => {
      activePointers.delete(e.pointerId);

      if (activePointers.size === 0 && isPointerDown) {
        isPointerDown = false;
        if (!isDragging && this.toolMode !== 'pan') {
          // Tap to fill
          const coords = this.screenToCanvasCoords(e.clientX, e.clientY);
          this.floodFill(coords.x, coords.y, this.activeColor);
        }
        isDragging = false;
      }
    };

    this.wrapper.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Mouse wheel zoom
    this.wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      this.setScale(this.scale * zoomFactor);
    }, { passive: false });

    // Handle Resize
    window.addEventListener('resize', () => {
      this.fitToScreen();
    });
  }

  // Export finished image with high-res crispness
  exportPNG() {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = this.width;
    exportCanvas.height = this.height;
    const ctx = exportCanvas.getContext('2d');

    // Clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, this.width, this.height);

    // Colored layer
    ctx.drawImage(this.colorCanvas, 0, 0);

    // Crisp Line Art overlay
    ctx.drawImage(this.lineCanvas, 0, 0);

    return exportCanvas.toDataURL('image/png');
  }

  getColorLayerDataUrl() {
    return this.colorCanvas.toDataURL('image/png');
  }
}
