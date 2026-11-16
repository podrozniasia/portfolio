// Tiny pixel-art toolkit: every sprite in the game is drawn in code on a
// low-resolution canvas and exported as a data URL. No image assets.

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function addOutline(g, w, h, color) {
  const img = g.getImageData(0, 0, w, h);
  const d = img.data;
  const out = new Uint8ClampedArray(d);
  const [r, gr, b] = hexToRgb(color);
  const solid = (x, y) => x >= 0 && y >= 0 && x < w && y < h && d[(y * w + x) * 4 + 3] > 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (solid(x, y)) continue;
      if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) {
        const i = (y * w + x) * 4;
        out[i] = r;
        out[i + 1] = gr;
        out[i + 2] = b;
        out[i + 3] = 255;
      }
    }
  }
  g.putImageData(new ImageData(out, w, h), 0, 0);
}

/**
 * Paint a sprite. `draw` receives a small drawing API in art pixels.
 * With `outline`, a 1px dark outline is added automatically (the sprite
 * grows by 1px on every side to make room for it).
 */
export function paint(w, h, draw, outline) {
  const pad = outline ? 1 : 0;
  const W = w + pad * 2;
  const H = h + pad * 2;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  g.translate(pad, pad);
  const api = {
    w,
    h,
    r(x, y, rw, rh, col) {
      g.fillStyle = col;
      g.fillRect(Math.round(x), Math.round(y), Math.round(rw), Math.round(rh));
    },
    p(x, y, col) {
      g.fillStyle = col;
      g.fillRect(Math.round(x), Math.round(y), 1, 1);
    },
    ell(cx, cy, rx, ry, col) {
      g.fillStyle = col;
      for (let y = -ry; y <= ry; y++) {
        const span = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry || 1))));
        g.fillRect(Math.round(cx - span), Math.round(cy + y), span * 2 + 1, 1);
      }
    },
    // isosceles triangle, apex at top
    tri(ax, ay, halfW, height, col) {
      g.fillStyle = col;
      for (let i = 0; i < height; i++) {
        const hw = Math.round(((i + 1) / height) * halfW);
        g.fillRect(Math.round(ax - hw), Math.round(ay + i), hw * 2 + 1, 1);
      }
    },
    clear(x, y, rw, rh) {
      g.clearRect(x, y, rw, rh);
    },
    grid(rows, pal, ox = 0, oy = 0) {
      rows.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          const col = pal[row[x]];
          if (col) {
            g.fillStyle = col;
            g.fillRect(ox + x, oy + y, 1, 1);
          }
        }
      });
    },
  };
  draw(api);
  if (outline) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    addOutline(g, W, H, outline);
  }
  return { url: c.toDataURL(), w: W, h: H };
}

// Small deterministic random generator so the art is identical on every load.
export function rnd(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
