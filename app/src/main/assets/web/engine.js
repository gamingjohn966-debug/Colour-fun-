// Color Fun - High Precision Canvas Flood Fill & Coloring Engine
(function() {
  class ColoringEngine {
    constructor(container, options = {}) {
      this.container = container;
      this.options = options;

      this.width = 1024;
      this.height = 1024;

      this.scale = 1;
      this.panX = 0;
      this.panY = 0;

      this.activeColor = '#FFB4AB';
      this.isEraser = false;
      this.toolMode = 'fill'; // 'fill' | 'pan'

      this.history = [];
      this.redoStack = [];
      this.maxHistory = 40;
      this.currentProgress = 0;

      // Uint8Array of size width * height: 1 = line boundary, 0 = fillable region
      this.barrierMask = new Uint8Array(this.width * this.height);
      // Uint8Array storing original artwork luminance for edge-aware anti-aliased dilation
      this.artworkLum = new Uint8Array(this.width * this.height);

      this.onProgressChange = options.onProgressChange || (() => {});
      this.onStateChange = options.onStateChange || (() => {});
      this.onFillSparkle = options.onFillSparkle || (() => {});

      this.initDOM();
      this.bindEvents();
    }

    initDOM() {
      // Wrapper
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'engine-wrapper';
      this.wrapper.style.position = 'relative';
      this.wrapper.style.width = '100%';
      this.wrapper.style.height = '100%';
      this.wrapper.style.overflow = 'hidden';
      this.wrapper.style.touchAction = 'none';
      this.wrapper.style.userSelect = 'none';

      // Centered Transform Layer
      this.transformLayer = document.createElement('div');
      this.transformLayer.className = 'engine-transform-layer';
      this.transformLayer.style.position = 'absolute';
      this.transformLayer.style.left = '50%';
      this.transformLayer.style.top = '50%';
      this.transformLayer.style.width = `${this.width}px`;
      this.transformLayer.style.height = `${this.height}px`;
      this.transformLayer.style.marginLeft = `-${this.width / 2}px`;
      this.transformLayer.style.marginTop = `-${this.height / 2}px`;
      this.transformLayer.style.transformOrigin = 'center center';

      // 1. Color Canvas Layer (holds painted colors)
      this.colorCanvas = document.createElement('canvas');
      this.colorCanvas.width = this.width;
      this.colorCanvas.height = this.height;
      this.colorCanvas.className = 'canvas-color-layer';
      this.colorCanvas.style.position = 'absolute';
      this.colorCanvas.style.top = '0';
      this.colorCanvas.style.left = '0';
      this.colorCanvas.style.width = `${this.width}px`;
      this.colorCanvas.style.height = `${this.height}px`;
      this.colorCanvas.style.backgroundColor = '#FFFFFF';
      this.colorCtx = this.colorCanvas.getContext('2d', { willReadFrequently: true });

      // 2. Line Art Overlay Layer (black lines on transparent background)
      this.lineCanvas = document.createElement('canvas');
      this.lineCanvas.width = this.width;
      this.lineCanvas.height = this.height;
      this.lineCanvas.className = 'canvas-line-layer';
      this.lineCanvas.style.position = 'absolute';
      this.lineCanvas.style.top = '0';
      this.lineCanvas.style.left = '0';
      this.lineCanvas.style.width = `${this.width}px`;
      this.lineCanvas.style.height = `${this.height}px`;
      this.lineCanvas.style.pointerEvents = 'none';
      this.lineCtx = this.lineCanvas.getContext('2d', { willReadFrequently: true });

      // 3. Particle Effect Layer (sparkles)
      this.particleCanvas = document.createElement('canvas');
      this.particleCanvas.width = this.width;
      this.particleCanvas.height = this.height;
      this.particleCanvas.className = 'canvas-particle-layer';
      this.particleCanvas.style.position = 'absolute';
      this.particleCanvas.style.top = '0';
      this.particleCanvas.style.left = '0';
      this.particleCanvas.style.width = `${this.width}px`;
      this.particleCanvas.style.height = `${this.height}px`;
      this.particleCanvas.style.pointerEvents = 'none';
      this.particleCtx = this.particleCanvas.getContext('2d', { willReadFrequently: true });

      this.transformLayer.appendChild(this.colorCanvas);
      this.transformLayer.appendChild(this.lineCanvas);
      this.transformLayer.appendChild(this.particleCanvas);
      this.wrapper.appendChild(this.transformLayer);
      this.container.appendChild(this.wrapper);

      this.updateTransform();
    }

    loadArtwork(artworkSource, savedDataUrl = null) {
      return new Promise((resolve) => {
        if (!artworkSource) {
          this.reset();
          resolve();
          return;
        }

        const img = new Image();
        let resolved = false;

        const finish = () => {
          if (!resolved) {
            resolved = true;
            this.fitToScreen();
            this.notifyState();
            resolve();
          }
        };

        const drawAndSetup = () => {
          try {
            // Update canvas dimensions if natural dimensions differ
            const w = img.naturalWidth || 1024;
            const h = img.naturalHeight || 1024;
            if (w !== this.width || h !== this.height) {
              this.width = w;
              this.height = h;

              this.transformLayer.style.width = `${this.width}px`;
              this.transformLayer.style.height = `${this.height}px`;
              this.transformLayer.style.marginLeft = `-${this.width / 2}px`;
              this.transformLayer.style.marginTop = `-${this.height / 2}px`;

              this.colorCanvas.width = this.width;
              this.colorCanvas.height = this.height;
              this.colorCanvas.style.width = `${this.width}px`;
              this.colorCanvas.style.height = `${this.height}px`;

              this.lineCanvas.width = this.width;
              this.lineCanvas.height = this.height;
              this.lineCanvas.style.width = `${this.width}px`;
              this.lineCanvas.style.height = `${this.height}px`;

              this.particleCanvas.width = this.width;
              this.particleCanvas.height = this.height;
              this.particleCanvas.style.width = `${this.width}px`;
              this.particleCanvas.style.height = `${this.height}px`;
            }

            const width = this.width;
            const height = this.height;

            // Draw source artwork to line canvas at native 1:1 resolution
            this.lineCtx.clearRect(0, 0, width, height);
            this.lineCtx.drawImage(img, 0, 0, width, height);

            const imgData = this.lineCtx.getImageData(0, 0, width, height);
            const data = imgData.data;

            // Reset barrier mask and artwork luminance buffer
            this.barrierMask = new Uint8Array(width * height);
            this.artworkLum = new Uint8Array(width * height);

            // Step 1: Detect line pixels, build leak barrier, and create crisp line overlay
            const LINE_BARRIER_THRESHOLD = 180;

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                // Calculate perceived brightness
                const lum = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
                this.artworkLum[y * width + x] = lum;

                if (lum < LINE_BARRIER_THRESHOLD) {
                  this.barrierMask[y * width + x] = 1;
                } else {
                  this.barrierMask[y * width + x] = 0;
                }

                // Preserve black line-art with smooth anti-aliased alpha
                if (lum < 242) {
                  data[idx] = 16;
                  data[idx + 1] = 16;
                  data[idx + 2] = 16;
                  let alpha;
                  if (lum <= 60) {
                    alpha = 255;
                  } else {
                    alpha = Math.min(255, Math.max(0, Math.round(((242 - lum) / (242 - 60)) * 255)));
                  }
                  data[idx + 3] = alpha;
                } else {
                  data[idx] = 255;
                  data[idx + 1] = 255;
                  data[idx + 2] = 255;
                  data[idx + 3] = 0;
                }
              }
            }

            // Step 2: Prevent diagonal leaks by connecting diagonal 1-pixel line pairs
            for (let y = 0; y < height - 1; y++) {
              for (let x = 0; x < width - 1; x++) {
                const p00 = this.barrierMask[y * width + x];
                const p10 = this.barrierMask[y * width + (x + 1)];
                const p01 = this.barrierMask[(y + 1) * width + x];
                const p11 = this.barrierMask[(y + 1) * width + (x + 1)];

                if (p00 === 1 && p11 === 1 && p10 === 0 && p01 === 0) {
                  this.barrierMask[y * width + (x + 1)] = 1;
                } else if (p10 === 1 && p01 === 1 && p00 === 0 && p11 === 0) {
                  this.barrierMask[y * width + x] = 1;
                }
              }
            }

            this.lineCtx.putImageData(imgData, 0, 0);
          } catch (e) {
            console.warn('Error processing line art:', e);
          }

          // Initialize color canvas with crisp white
          try {
            this.colorCtx.fillStyle = '#FFFFFF';
            this.colorCtx.fillRect(0, 0, this.width, this.height);
          } catch (e) {}

          // Load previous saved creation if exists
          if (savedDataUrl) {
            const savedImg = new Image();
            savedImg.onload = () => {
              try {
                this.colorCtx.drawImage(savedImg, 0, 0, this.width, this.height);
              } catch (e) {}
              this.history = [this.getSnapshot()];
              this.redoStack = [];
              this.calculateProgress();
              finish();
            };
            savedImg.onerror = () => {
              this.history = [this.getSnapshot()];
              this.redoStack = [];
              this.calculateProgress();
              finish();
            };
            savedImg.src = savedDataUrl;
          } else {
            this.history = [this.getSnapshot()];
            this.redoStack = [];
            this.calculateProgress();
            finish();
          }
        };

        if (typeof artworkSource === 'string' && artworkSource.trim().startsWith('<svg')) {
          let blobUrl = null;
          try {
            const svgBlob = new Blob([artworkSource], { type: 'image/svg+xml;charset=utf-8' });
            blobUrl = URL.createObjectURL(svgBlob);
          } catch (e) {}

          img.onload = () => {
            if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
            drawAndSetup();
          };
          img.onerror = () => {
            if (blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch (e) {} }
            finish();
          };
          img.src = blobUrl || ('data:image/svg+xml;utf8,' + encodeURIComponent(artworkSource));
        } else {
          img.onload = () => drawAndSetup();
          img.onerror = (e) => {
            console.warn('Could not load image source:', artworkSource, e);
            finish();
          };
          img.src = artworkSource;
        }

        setTimeout(finish, 2500);
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
        let coloredPixels = 0;
        const sampleStep = 8;
        let fillableSampled = 0;

        for (let y = 0; y < this.height; y += sampleStep) {
          for (let x = 0; x < this.width; x += sampleStep) {
            const idx = y * this.width + x;
            if (this.barrierMask[idx] === 0) {
              fillableSampled++;
              const pIdx = idx * 4;
              const r = imgData[pIdx];
              const g = imgData[pIdx + 1];
              const b = imgData[pIdx + 2];
              if (r < 242 || g < 242 || b < 242) {
                coloredPixels++;
              }
            }
          }
        }

        const percentage = fillableSampled > 0
          ? Math.min(100, Math.round((coloredPixels / fillableSampled) * 100))
          : 0;

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

    // High Precision Edge-Aware Flood Fill with Color Tolerance & Under-Line Bleed
    floodFill(tapX, tapY, fillColorHex) {
      let startX = Math.round(tapX);
      let startY = Math.round(tapY);

      const width = this.width;
      const height = this.height;

      if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
        return false;
      }

      const barrier = this.barrierMask;
      const artworkLum = this.artworkLum;

      // If user tapped directly on or near a line outline, search in a small radius for adjacent open region
      if (barrier[startY * width + startX] === 1) {
        let foundOpen = false;
        const radius = 6;
        for (let r = 1; r <= radius && !foundOpen; r++) {
          for (let dy = -r; dy <= r && !foundOpen; dy++) {
            for (let dx = -r; dx <= r && !foundOpen; dx++) {
              if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
              const nx = startX + dx;
              const ny = startY + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height && barrier[ny * width + nx] === 0) {
                startX = nx;
                startY = ny;
                foundOpen = true;
              }
            }
          }
        }
        if (!foundOpen) {
          // Tapped deep inside a completely solid black area, safely ignore
          return false;
        }
      }

      // Color buffer setup
      const colorImageData = this.colorCtx.getImageData(0, 0, width, height);
      const pixel32 = new Uint32Array(colorImageData.data.buffer);

      const startIdx = startY * width + startX;
      const target32 = pixel32[startIdx];
      const targetR = target32 & 0xFF;
      const targetG = (target32 >> 8) & 0xFF;
      const targetB = (target32 >> 16) & 0xFF;

      // Parse desired fill color
      const fillHex = this.isEraser ? '#FFFFFF' : fillColorHex;
      const fillRgba = this.hexToRgba(fillHex);
      const fill32 = (fillRgba.a << 24) | (fillRgba.b << 16) | (fillRgba.g << 8) | fillRgba.r;

      // If already the exact same color, do nothing
      if (Math.abs(targetR - fillRgba.r) < 3 && Math.abs(targetG - fillRgba.g) < 3 && Math.abs(targetB - fillRgba.b) < 3) {
        return false;
      }

      // Color tolerance check:
      // If target region is uncolored/white, accept any near-white/background pixels
      const isTargetWhite = (targetR > 235 && targetG > 235 && targetB > 235);
      const colorMatches = (p32) => {
        const pr = p32 & 0xFF;
        const pg = (p32 >> 8) & 0xFF;
        const pb = (p32 >> 16) & 0xFF;

        if (isTargetWhite) {
          return pr > 210 && pg > 210 && pb > 210;
        }
        const diff = Math.abs(pr - targetR) + Math.abs(pg - targetG) + Math.abs(pb - targetB);
        const maxDiff = Math.max(Math.abs(pr - targetR), Math.abs(pg - targetG), Math.abs(pb - targetB));
        return diff <= 55 && maxDiff <= 30;
      };

      // Scanline 4-way flood fill
      const stack = [[startX, startY]];
      const visited = new Uint8Array(width * height);
      const filledMask = new Uint8Array(width * height);
      visited[startIdx] = 1;

      let minX = startX, maxX = startX, minY = startY, maxY = startY;

      while (stack.length > 0) {
        const [curX, curY] = stack.pop();

        let left = curX;
        let right = curX;

        // Scan leftward
        while (left > 0) {
          const lIdx = curY * width + (left - 1);
          if (visited[lIdx] === 0 && barrier[lIdx] === 0 && colorMatches(pixel32[lIdx])) {
            left--;
            visited[lIdx] = 1;
          } else {
            break;
          }
        }

        // Scan rightward
        while (right < width - 1) {
          const rIdx = curY * width + (right + 1);
          if (visited[rIdx] === 0 && barrier[rIdx] === 0 && colorMatches(pixel32[rIdx])) {
            right++;
            visited[rIdx] = 1;
          } else {
            break;
          }
        }

        if (left < minX) minX = left;
        if (right > maxX) maxX = right;
        if (curY < minY) minY = curY;
        if (curY > maxY) maxY = curY;

        // Mark scanline
        for (let x = left; x <= right; x++) {
          const idx = curY * width + x;
          visited[idx] = 1;
          filledMask[idx] = 1;
        }

        // Check row above
        if (curY > 0) {
          let inSpanAbove = false;
          for (let x = left; x <= right; x++) {
            const aIdx = (curY - 1) * width + x;
            if (visited[aIdx] === 0 && barrier[aIdx] === 0 && colorMatches(pixel32[aIdx])) {
              if (!inSpanAbove) {
                stack.push([x, curY - 1]);
                visited[aIdx] = 1;
                inSpanAbove = true;
              }
            } else {
              inSpanAbove = false;
            }
          }
        }

        // Check row below
        if (curY < height - 1) {
          let inSpanBelow = false;
          for (let x = left; x <= right; x++) {
            const bIdx = (curY + 1) * width + x;
            if (visited[bIdx] === 0 && barrier[bIdx] === 0 && colorMatches(pixel32[bIdx])) {
              if (!inSpanBelow) {
                stack.push([x, curY + 1]);
                visited[bIdx] = 1;
                inSpanBelow = true;
              }
            } else {
              inSpanBelow = false;
            }
          }
        }
      }

      // Step 3: Prevent tiny white holes and unfilled pinhole speckles inside the region.
      // (Preserves all intentional artwork details, eyes, stars, patterns which have closed line boundaries and large areas)
      const bMinX = Math.max(1, minX - 2);
      const bMaxX = Math.min(width - 2, maxX + 2);
      const bMinY = Math.max(1, minY - 2);
      const bMaxY = Math.min(height - 2, maxY + 2);

      for (let y = bMinY; y <= bMaxY; y++) {
        for (let x = bMinX; x <= bMaxX; x++) {
          const idx = y * width + x;
          if (filledMask[idx] === 0 && barrier[idx] === 0) {
            const surrounded = filledMask[idx - 1] + filledMask[idx + 1] + filledMask[idx - width] + filledMask[idx + width];
            if (surrounded >= 3) {
              filledMask[idx] = 1;
            }
          }
        }
      }

      // Step 4: Edge-aware anti-aliased line bleed (under-line expansion).
      // Expand the color 1-2 pixels under the anti-aliased edge of the line art,
      // eliminating any white halo, gaps, or speckles when zoomed in to 100%, 200%, 400%+.
      const dilated1 = [];
      for (let y = bMinY; y <= bMaxY; y++) {
        for (let x = bMinX; x <= bMaxX; x++) {
          const idx = y * width + x;
          if (filledMask[idx] === 1) {
            const neighbors = [
              idx - 1, idx + 1, idx - width, idx + width,
              idx - width - 1, idx - width + 1, idx + width - 1, idx + width + 1
            ];
            for (const n of neighbors) {
              if (filledMask[n] === 0 && artworkLum[n] < 236) {
                filledMask[n] = 2;
                dilated1.push(n);
              }
            }
          }
        }
      }

      // Second dilation pass deeper into the line core
      for (const p of dilated1) {
        const neighbors = [p - 1, p + 1, p - width, p + width];
        for (const n of neighbors) {
          if (n >= 0 && n < width * height && filledMask[n] === 0 && artworkLum[n] < 195) {
            filledMask[n] = 2;
          }
        }
      }

      // Step 5: Write clean, solid color to color canvas
      const expMinX = Math.max(0, bMinX - 3);
      const expMaxX = Math.min(width - 1, bMaxX + 3);
      const expMinY = Math.max(0, bMinY - 3);
      const expMaxY = Math.min(height - 1, bMaxY + 3);

      for (let y = expMinY; y <= expMaxY; y++) {
        for (let x = expMinX; x <= expMaxX; x++) {
          const idx = y * width + x;
          if (filledMask[idx] > 0) {
            pixel32[idx] = fill32;
          }
        }
      }

      // Write filled pixels back to canvas
      this.colorCtx.putImageData(colorImageData, 0, 0);

      // Record snapshot for undo
      this.pushSnapshot();

      // Trigger sparkle effect at tapped region
      this.spawnSparkles(startX, startY, fillHex);
      return true;
    }

    hexToRgba(hex) {
      let c = (hex || '#FFFFFF').replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const num = parseInt(c, 16) || 0;
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
        a: 255
      };
    }

    spawnSparkles(x, y, color) {
      const sparkles = [];
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const speed = 2.5 + Math.random() * 5.5;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3.5 + Math.random() * 4,
          alpha: 1,
          color: Math.random() > 0.3 ? color : '#FFFFFF'
        });
      }

      const animate = () => {
        this.particleCtx.clearRect(0, 0, this.width, this.height);
        let alive = false;
        sparkles.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.045;
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

    // Zoom and Pan Methods
    zoomIn() {
      this.setScale(this.scale * 1.25);
    }

    zoomOut() {
      this.setScale(this.scale / 1.25);
    }

    fitToScreen() {
      const rect = this.wrapper.getBoundingClientRect();
      if (rect.width && rect.height) {
        const padding = 20;
        const availableW = rect.width - padding * 2;
        const availableH = rect.height - padding * 2;
        const s = Math.min(availableW / this.width, availableH / this.height, 1.4);
        this.scale = Math.max(s, 0.45);
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
        this.notifyState();
      }
    }

    setScale(newScale) {
      this.scale = Math.min(Math.max(newScale, 0.35), 5.0);
      this.updateTransform();
      this.notifyState();
    }

    updateTransform() {
      this.transformLayer.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
    }

    // Converts viewport touch/click coordinates to precise canvas pixel coordinates
    screenToCanvasCoords(clientX, clientY) {
      const rect = this.colorCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };
      }

      const canvasX = (clientX - rect.left) * (this.width / rect.width);
      const canvasY = (clientY - rect.top) * (this.height / rect.height);

      return {
        x: Math.min(Math.max(0, Math.round(canvasX)), this.width - 1),
        y: Math.min(Math.max(0, Math.round(canvasY)), this.height - 1)
      };
    }

    bindEvents() {
      let isPointerDown = false;
      let startClientX = 0;
      let startClientY = 0;
      let initialPanX = 0;
      let initialPanY = 0;
      let isDragging = false;
      let initialDistance = 0;
      let initialScale = 1;
      const activePointers = new Map();

      const onPointerDown = (e) => {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 1) {
          isPointerDown = true;
          isDragging = false;
          startClientX = e.clientX;
          startClientY = e.clientY;
          initialPanX = this.panX;
          initialPanY = this.panY;
        } else if (activePointers.size === 2) {
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
          const dx = e.clientX - startClientX;
          const dy = e.clientY - startClientY;

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

      // Wheel Zoom
      this.wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.15 : 0.85;
        this.setScale(this.scale * factor);
      }, { passive: false });

      // Resize Listener
      window.addEventListener('resize', () => {
        this.fitToScreen();
      });
    }

    exportPNG() {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = this.width;
      exportCanvas.height = this.height;
      const ctx = exportCanvas.getContext('2d');

      // Crisp White Base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, this.width, this.height);

      // Colored Regions
      ctx.drawImage(this.colorCanvas, 0, 0);

      // High-detail Line Art
      ctx.drawImage(this.lineCanvas, 0, 0);

      return exportCanvas.toDataURL('image/png');
    }

    getColorLayerDataUrl() {
      return this.colorCanvas.toDataURL('image/png');
    }
  }

  window.ColoringEngine = ColoringEngine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ColoringEngine };
  }
})();
