import { paint, rnd } from './pixel.js';

// All artwork is original and generated here, pixel by pixel.
const OL = '#3b2418'; // warm dark outline shared by every sprite

/* ---------- player ---------- */

const PLAYER_PAL = {
  h: '#b5522d', // auburn hair
  H: '#8a3a20',
  s: '#f8d0a8',
  c: '#f2a08e',
  e: '#3b2418',
  w: '#fff6e6',
  o: '#4f86c6',
  O: '#3a68a3',
  k: '#6e4424',
};

const BODY = [
  '....hhhhhh....',
  '...hhhhhhhh...',
  '..hhhhhhhhhh..',
  '..hhhhhhhssh..',
  '..hHhhssssss..',
  '..hHhssesses..',
  '..hHhssesses..',
  '..hHhscssscs..',
  '..hHhhsssss...',
  '..hHHh.ss.....',
  '..hHHwwwwww...',
  '..hHwwowwoww..',
  '..hHsoooooos..',
  '...hsoooooos..',
  '.....oooooo...',
  '.....oooooo...',
  '.....ooOooo...',
];
const LEGS = {
  idle: ['.....oo..oo...', '.....kk..kk...', '.....kkk.kkk..'],
  a: ['....oo...ooo..', '...kk.....kk..', '...kkk....kkk.'],
  b: ['......oooo....', '......kkkk....', '......kkkkk...'],
};
const playerFrame = (legs) => paint(14, 20, (a) => a.grid([...BODY, ...legs], PLAYER_PAL), OL);

const strawHat = paint(
  14,
  5,
  (a) =>
    a.grid(
      ['....yyyyyy....', '...yyyyyyyy...', '...rrrrrrrr...', 'yyyyyyyyyyyyyy', '.YYYYYYYYYYYY.'],
      { y: '#f7dc7a', Y: '#d9b44a', r: '#d9574a' }
    ),
  OL
);

const gradCap = paint(
  14,
  6,
  (a) =>
    a.grid(
      ['......bb......', '...bbbbbbbb...', 'bbbbbbbbbbbbbb', '..bbbbbbbbbb.g', '...BBBBBBBB..g', '.............g'],
      { b: '#34344a', B: '#23233a', g: '#ffd24a' }
    ),
  OL
);

/* ---------- terrain tiles ---------- */

function groundTile(p) {
  return paint(32, 48, (a) => {
    a.r(0, 0, 32, 48, p.s2);
    const R = rnd(7);
    for (let i = 0; i < 46; i++) {
      const x = Math.floor(R() * 31);
      const y = 9 + Math.floor(R() * 38);
      a.r(x, y, R() > 0.6 ? 2 : 1, 1, R() > 0.5 ? p.s1 : p.s3);
    }
    a.r(0, 0, 32, 6, p.g2);
    a.r(0, 0, 32, 2, p.g1);
    const edge = [1, 2, 1, 0, 1, 2, 2, 1, 0, 1, 2, 1, 1, 0, 2, 1];
    for (let x = 0; x < 32; x++) a.r(x, 6, 1, edge[x % 16], p.g2);
    for (let x = 0; x < 32; x++) if (edge[(x + 5) % 16] === 2) a.p(x, 3, p.g3);
    for (let x = 2; x < 32; x += 7) a.p(x, 1, p.g0);
    a.r(0, 8, 32, 1, p.s3);
  });
}

const waterTile = paint(32, 48, (a) => {
  a.r(0, 5, 32, 43, '#2f86c9');
  a.r(0, 5, 32, 8, '#49a2e0');
  a.r(0, 5, 32, 2, '#8fd0f7');
  const wave = [0, 0, 1, 1, 1, 0, 0, 0];
  for (let x = 0; x < 32; x++) if (wave[x % 8]) a.p(x, 4, '#c9ecff');
  const R = rnd(21);
  for (let i = 0; i < 16; i++) {
    const x = Math.floor(R() * 28);
    const y = 10 + Math.floor(R() * 34);
    a.r(x, y, 3 + Math.floor(R() * 3), 1, y < 22 ? '#6db9ec' : '#2775b4');
  }
});

function hillsTile(c1, c2, c3) {
  return paint(256, 72, (a) => {
    for (let x = 0; x < 256; x++) {
      const t = (x / 256) * Math.PI * 2;
      const y1 = 20 + Math.round(10 * Math.sin(t * 2 + 1) + 5 * Math.sin(t * 5));
      a.r(x, y1, 1, 72 - y1, c1);
      const y2 = 42 + Math.round(8 * Math.sin(t * 3 + 2) + 4 * Math.sin(t * 7 + 1));
      a.r(x, y2, 1, 72 - y2, c2);
      a.r(x, y2, 1, 2, c3);
    }
  });
}

const mountainsTile = paint(320, 96, (a) => {
  for (let x = 0; x < 320; x++) {
    const t = (x / 320) * Math.PI * 2;
    const y = Math.round(40 + 18 * Math.sin(t * 3) + 10 * Math.sin(t * 7 + 2) + 5 * Math.sin(t * 13 + 1));
    a.r(x, y, 1, 96 - y, '#a9bde0');
    if (y < 34) a.r(x, y, 1, Math.min(9, 36 - y) + (x % 3 === 0 ? 1 : 0), '#ffffff');
    a.r(x, y + 26 + Math.round(4 * Math.sin(t * 9)), 1, 96, '#b9cbea');
  }
});

/* ---------- buildings ---------- */

function house(lit) {
  return paint(
    66,
    62,
    (a) => {
      a.r(45, 5, 7, 12, '#b7a99a');
      a.r(44, 4, 9, 3, '#8f8273');
      for (let i = 0; i < 20; i++) {
        const inset = Math.round((19 - i) * 0.7);
        a.r(2 + inset, 10 + i, 62 - 2 * inset, 1, i % 5 === 4 ? '#b23b36' : '#d9574a');
      }
      a.r(2, 29, 62, 2, '#8c2a2c');
      a.r(7, 31, 52, 31, '#fff1d6');
      a.r(7, 56, 52, 6, '#ecd4a8');
      a.r(7, 31, 52, 2, '#e2c79a');
      a.r(27, 42, 13, 20, '#8a5428');
      a.r(29, 44, 9, 18, '#b97a3e');
      a.r(29, 44, 9, 1, '#d9a066');
      a.p(36, 53, '#ffd95a');
      for (const wx of [12, 45]) {
        a.r(wx, 38, 11, 11, '#8a5428');
        a.r(wx + 1, 39, 9, 9, lit ? '#ffe08a' : '#aee4ff');
        a.r(wx + 5, 39, 1, 9, '#fff1d6');
        a.r(wx + 1, 43, 9, 1, '#fff1d6');
        a.r(wx - 1, 49, 13, 2, '#d9a066');
      }
    },
    OL
  );
}

const barn = paint(
  74,
  66,
  (a) => {
    // gambrel roof
    for (let i = 0; i < 10; i++) a.r(37 - 10 - i * 1.6, 2 + i, 20 + i * 3.2, 1, '#6b5a66');
    for (let i = 0; i < 12; i++) a.r(37 - 27 - i * 0.7, 12 + i, 54 + i * 1.4, 1, i % 4 === 3 ? '#584858' : '#6b5a66');
    a.r(5, 24, 64, 42, '#d9574a');
    for (let x = 10; x < 68; x += 6) a.r(x, 24, 1, 42, '#b23b36');
    a.r(5, 24, 64, 2, '#fff1d6');
    // hayloft
    a.r(31, 12, 12, 9, '#fff1d6');
    a.r(33, 14, 8, 7, '#4a2c14');
    a.r(34, 17, 6, 4, '#f0c95a');
    // big door
    a.r(24, 38, 26, 28, '#fff1d6');
    a.r(26, 40, 22, 26, '#b23b36');
    for (let i = 0; i < 22; i++) {
      a.p(26 + i, 40 + Math.round(i * 1.15), '#fff1d6');
      a.p(47 - i, 40 + Math.round(i * 1.15), '#fff1d6');
    }
    a.r(36, 40, 2, 26, '#fff1d6');
  },
  OL
);

function academy({ wall = '#f3ead6', shade = '#d9cdb2', col = '#fffaf0', roof = '#c9bda2', flag = 'pl', snow = false }) {
  return paint(
    98,
    72,
    (a) => {
      a.r(48, 0, 1, 14, '#6b5a55');
      if (flag === 'pl') {
        a.r(49, 1, 11, 4, '#ffffff');
        a.r(49, 5, 11, 4, '#dc3545');
      } else {
        a.r(49, 1, 11, 8, '#ffffff');
        a.r(53, 3, 3, 4, '#dc3545');
        a.r(52, 4, 5, 2, '#dc3545');
      }
      for (let i = 0; i < 15; i++) {
        const hw = Math.round((i + 1) * 3.1);
        a.r(49 - hw, 13 + i, hw * 2, 1, roof);
      }
      for (let i = 4; i < 14; i++) {
        const hw = Math.round((i - 3) * 3.1);
        a.r(49 - hw, 14 + i, hw * 2, 1, wall);
      }
      a.ell(49, 23, 2, 2, roof);
      a.r(2, 28, 94, 4, roof);
      a.r(2, 31, 94, 1, shade);
      a.r(6, 32, 86, 32, wall);
      for (const wx of [17, 32, 62, 77]) {
        a.r(wx, 39, 6, 11, '#5f8fc6');
        a.r(wx, 39, 6, 1, '#3f6a9c');
        a.r(wx + 2, 39, 1, 11, wall);
        a.r(wx - 1, 50, 8, 1, shade);
      }
      a.r(45, 46, 9, 18, '#7a4a22');
      a.r(46, 47, 7, 17, '#a56c34');
      a.r(49, 47, 1, 17, '#7a4a22');
      for (let k = 0; k < 6; k++) {
        const x = 10 + k * 15;
        a.r(x, 32, 4, 32, col);
        a.r(x + 3, 32, 1, 32, shade);
        a.r(x - 1, 32, 6, 2, col);
        a.r(x - 1, 62, 6, 2, col);
      }
      a.r(2, 64, 94, 4, '#ded5c3');
      a.r(0, 68, 98, 4, '#c6bca8');
      if (snow) {
        for (let i = 0; i < 15; i++) {
          const hw = Math.round((i + 1) * 3.1);
          a.r(49 - hw, 13 + i, 3, 1, '#ffffff');
          a.r(49 + hw - 3, 13 + i, 3, 1, '#ffffff');
        }
        a.r(2, 27, 94, 2, '#ffffff');
        a.r(2, 63, 94, 2, '#ffffff');
        a.r(0, 67, 98, 2, '#ffffff');
      }
    },
    OL
  );
}

const office = paint(
  62,
  90,
  (a) => {
    a.r(27, 0, 2, 6, '#3f5878');
    a.r(4, 6, 54, 84, '#5f7fa6');
    a.r(4, 6, 54, 3, '#3f5878');
    a.r(53, 9, 5, 81, '#4c6a90');
    const R = rnd(11);
    for (let y = 13; y < 70; y += 8) {
      for (let x = 8; x < 50; x += 9) {
        const v = R();
        a.r(x, y, 6, 5, v > 0.82 ? '#ffe9a3' : v > 0.4 ? '#bfe3ff' : '#9fd0f5');
        a.r(x, y, 6, 1, '#e9f7ff');
      }
    }
    a.r(18, 71, 26, 3, '#ffc94d');
    a.r(21, 74, 20, 16, '#2f4057');
    a.r(23, 76, 7, 14, '#9fd0f5');
    a.r(32, 76, 7, 14, '#9fd0f5');
  },
  OL
);

const stall = paint(
  54,
  46,
  (a) => {
    a.r(4, 14, 3, 32, '#8a5428');
    a.r(47, 14, 3, 32, '#8a5428');
    a.r(0, 2, 54, 2, '#b97a3e');
    const scallop = [0, 1, 2, 2, 1, 0];
    for (let x = 0; x < 54; x++) {
      const white = Math.floor(x / 6) % 2 === 0;
      a.r(x, 4, 1, 9, white ? '#fff6e6' : '#e0554a');
      a.r(x, 12, 1, 2, white ? '#e8dcc4' : '#b23b36');
      a.r(x, 14, 1, scallop[x % 6], white ? '#fff6e6' : '#e0554a');
    }
    a.r(1, 28, 52, 18, '#d9a066');
    a.r(1, 28, 52, 3, '#f0c088');
    for (let x = 7; x < 52; x += 8) a.r(x, 31, 1, 15, '#b97a3e');
    // goods: apples, reports, cabbage
    a.r(8, 23, 11, 5, '#b97a3e');
    a.r(9, 20, 3, 3, '#e0554a');
    a.r(13, 20, 3, 3, '#e0554a');
    a.r(11, 18, 3, 3, '#f07a6a');
    a.r(22, 21, 10, 7, '#f7ecd4');
    a.r(24, 23, 6, 1, '#9a8c78');
    a.r(24, 25, 5, 1, '#9a8c78');
    a.ell(40, 24, 4, 3, '#6fb83f');
    a.ell(39, 23, 2, 1, '#9bd65a');
  },
  OL
);

function board(kind) {
  return paint(
    44,
    44,
    (a) => {
      a.r(6, 10, 3, 34, '#8a5428');
      a.r(35, 10, 3, 34, '#8a5428');
      for (let i = 0; i < 6; i++) a.r(22 - (i + 1) * 3.6, 1 + i, (i + 1) * 7.2, 1, i === 5 ? '#b23b36' : '#d9574a');
      a.r(3, 8, 38, 23, '#b97a3e');
      if (kind === 'chalk') {
        a.r(5, 10, 34, 19, '#2f6b4f');
        a.r(8, 13, 9, 1, '#e8f5e9');
        a.r(8, 16, 13, 1, '#e8f5e9');
        a.r(8, 19, 7, 1, '#e8f5e9');
        // little bar chart
        a.r(25, 22, 2, 4, '#ffd95a');
        a.r(28, 19, 2, 7, '#ff9a8a');
        a.r(31, 16, 2, 10, '#8fd0f7');
        a.r(34, 13, 2, 13, '#e8f5e9');
        a.r(24, 26, 13, 1, '#e8f5e9');
        a.r(5, 29, 34, 1, '#d9a066');
      } else {
        a.r(5, 10, 34, 19, '#f0c088');
        a.r(7, 12, 9, 7, '#ffffff');
        a.r(8, 14, 6, 1, '#7aa7d9');
        a.r(8, 16, 4, 1, '#7aa7d9');
        a.r(18, 12, 9, 7, '#ffd1dc');
        a.r(20, 14, 2, 2, '#e0554a');
        a.r(23, 14, 2, 2, '#e0554a');
        a.r(21, 16, 3, 2, '#e0554a');
        a.r(29, 12, 8, 7, '#c9f07a');
        a.r(31, 14, 4, 1, '#4a9230');
        a.r(31, 16, 3, 1, '#4a9230');
        a.r(7, 21, 13, 6, '#aee4ff');
        a.r(9, 23, 9, 1, '#3f6a9c');
        a.r(22, 21, 15, 6, '#ffe08a');
        a.r(24, 23, 10, 1, '#b97a3e');
        a.p(11, 11, '#e0554a');
        a.p(22, 11, '#3f6a9c');
        a.p(33, 11, '#e0554a');
      }
    },
    OL
  );
}

const gate = paint(
  56,
  48,
  (a) => {
    const red = '#dd4a3c';
    const red2 = '#a82f2c';
    const blk = '#3a2a2e';
    a.r(11, 10, 5, 38, red);
    a.r(40, 10, 5, 38, red);
    a.r(15, 10, 1, 38, red2);
    a.r(44, 10, 1, 38, red2);
    a.r(9, 44, 9, 4, '#8d8577');
    a.r(38, 44, 9, 4, '#8d8577');
    a.r(6, 18, 44, 3, red);
    a.r(3, 7, 50, 4, red);
    a.r(25, 11, 6, 7, '#f5e6c8');
    a.r(1, 4, 54, 3, blk);
    a.r(0, 3, 3, 2, blk);
    a.r(53, 3, 3, 2, blk);
    a.p(0, 2, blk);
    a.p(55, 2, blk);
  },
  OL
);

const silo = paint(
  28,
  62,
  (a) => {
    a.ell(14, 12, 11, 9, '#d9574a');
    a.ell(11, 8, 4, 2, '#f07a6a');
    a.r(3, 12, 22, 50, '#cfd8e3');
    a.r(6, 12, 3, 50, '#eef3f8');
    a.r(19, 12, 6, 50, '#aab6c6');
    for (let y = 20; y < 62; y += 10) a.r(3, y, 22, 1, '#8f9bb0');
    a.r(12, 14, 1, 48, '#6b7a90');
    a.r(15, 14, 1, 48, '#6b7a90');
    for (let y = 16; y < 62; y += 4) a.r(12, y, 4, 1, '#6b7a90');
  },
  OL
);

const windmillBody = paint(
  34,
  58,
  (a) => {
    for (let i = 0; i < 48; i++) {
      const hw = 8 + i * 0.16;
      a.r(17 - hw, 10 + i, hw * 2, 1, '#fff1d6');
      a.r(17 + hw - 4, 10 + i, 4, 1, '#e2c79a');
    }
    a.ell(17, 9, 9, 7, '#d9574a');
    a.r(7, 10, 20, 2, '#b23b36');
    a.r(15, 24, 4, 6, '#5f8fc6');
    a.r(13, 46, 8, 12, '#8a5428');
    a.r(14, 47, 6, 11, '#b97a3e');
  },
  OL
);

const windmillBlades = paint(
  58,
  58,
  (a) => {
    const spar = '#8a5428';
    const sail = '#fff6e6';
    const line = '#d9c9a8';
    a.r(28, 2, 2, 27, spar);
    a.r(30, 4, 7, 20, sail);
    a.r(29, 28, 27, 2, spar);
    a.r(34, 30, 20, 7, sail);
    a.r(28, 29, 2, 27, spar);
    a.r(21, 34, 7, 20, sail);
    a.r(2, 28, 27, 2, spar);
    a.r(4, 21, 20, 7, sail);
    for (let i = 0; i < 4; i++) {
      a.r(30, 8 + i * 5, 7, 1, line);
      a.r(21, 37 + i * 5, 7, 1, line);
      a.r(37 + i * 5, 30, 1, 7, line);
      a.r(8 + i * 5, 21, 1, 7, line);
    }
    a.r(27, 27, 4, 4, OL);
  },
  OL
);

/* ---------- nature ---------- */

function tree(p, dots) {
  return paint(
    38,
    50,
    (a) => {
      a.r(17, 30, 5, 20, '#8a5428');
      a.r(18, 30, 1, 20, '#b97a3e');
      a.r(15, 48, 9, 2, '#8a5428');
      a.ell(19, 20, 17, 13, p.d);
      a.ell(10, 23, 9, 8, p.d);
      a.ell(28, 23, 9, 8, p.d);
      a.ell(18, 17, 14, 11, p.m);
      a.ell(9, 20, 6, 5, p.m);
      a.ell(28, 19, 7, 6, p.m);
      a.ell(14, 12, 7, 5, p.l);
      a.ell(25, 10, 4, 3, p.l);
      if (dots) {
        const R = rnd(dots.seed || 3);
        let n = 0;
        let guard = 0;
        while (n < dots.n && guard++ < 400) {
          const x = 4 + Math.floor(R() * 30);
          const y = 8 + Math.floor(R() * 22);
          if (((x - 19) / 15) ** 2 + ((y - 20) / 11) ** 2 < 1) {
            a.r(x, y, 2, 2, dots.color);
            a.p(x, y, dots.hi);
            n++;
          }
        }
      }
    },
    OL
  );
}

const pine = paint(
  30,
  52,
  (a) => {
    a.r(13, 42, 4, 10, '#7a4a22');
    const tiers = [
      [15, 2, 8, 14],
      [15, 12, 11, 16],
      [15, 24, 14, 19],
    ];
    for (const [ax, ay, hw, h] of tiers) {
      a.tri(ax, ay, hw, h, '#2f7d4a');
      for (let i = 0; i < h; i++) {
        const w = Math.round(((i + 1) / h) * hw);
        a.r(ax + 1, ay + i, w, 1, '#256b3f');
      }
      for (let i = 0; i < Math.ceil(h * 0.42); i++) {
        const w = Math.round(((i + 1) / h) * hw);
        a.r(ax - w, ay + i, w * 2 + 1, 1, '#ffffff');
      }
      const top = ay + Math.ceil(h * 0.42);
      for (let x = -hw; x <= hw; x += 3) {
        const w = Math.round(((top - ay + 1) / h) * hw);
        if (Math.abs(x) <= w) a.r(ax + x, top, 2, 1 + (Math.abs(x) % 2), '#ffffff');
      }
    }
  },
  OL
);

const flower = (c, c2) =>
  paint(
    7,
    10,
    (a) => {
      a.r(3, 4, 1, 6, '#4a9230');
      a.p(2, 7, '#6fb83f');
      a.p(4, 6, '#6fb83f');
      a.r(2, 0, 3, 5, c);
      a.r(1, 1, 5, 3, c);
      a.p(3, 2, c2);
    },
    OL
  );

const tuft = (c1, c2) =>
  paint(9, 5, (a) => {
    a.p(1, 2, c1);
    a.r(2, 3, 1, 2, c1);
    a.r(4, 0, 1, 5, c2);
    a.r(5, 2, 1, 3, c1);
    a.r(7, 1, 1, 4, c2);
    a.p(8, 3, c1);
    a.r(0, 4, 9, 1, c1);
  });

const rock = paint(
  11,
  7,
  (a) => {
    a.ell(5, 4, 5, 3, '#9a9aa6');
    a.ell(4, 3, 3, 1, '#c3c3cf');
  },
  OL
);

const haybale = paint(
  24,
  16,
  (a) => {
    a.ell(12, 8, 11, 7, '#f0c95a');
    a.ell(10, 6, 7, 3, '#f7dc7a');
    a.r(4, 10, 16, 1, '#d9a83a');
    a.r(6, 13, 12, 1, '#d9a83a');
    a.r(11, 1, 2, 15, '#b97a3e');
  },
  OL
);

const scarecrow = paint(
  24,
  36,
  (a) => {
    a.r(11, 10, 2, 26, '#8a5428');
    a.r(2, 14, 20, 2, '#8a5428');
    a.r(7, 12, 10, 12, '#5f8fd6');
    a.r(9, 16, 3, 3, '#f0c95a');
    a.r(7, 23, 10, 1, '#3a68a3');
    a.r(0, 13, 3, 4, '#f0c95a');
    a.r(21, 13, 3, 4, '#f0c95a');
    a.ell(12, 7, 4, 4, '#f5e6c8');
    a.p(10, 7, OL);
    a.p(14, 7, OL);
    a.r(11, 9, 3, 1, '#d9574a');
    a.r(5, 3, 14, 1, '#d9a83a');
    a.r(8, 0, 8, 3, '#f0c95a');
  },
  OL
);

const snowman = paint(
  18,
  25,
  (a) => {
    a.ell(9, 18, 7, 6, '#ffffff');
    a.ell(11, 20, 4, 3, '#e3ecf8');
    a.ell(9, 9, 5, 4, '#ffffff');
    a.p(7, 8, '#333344');
    a.p(11, 8, '#333344');
    a.r(9, 10, 3, 1, '#ff9a1f');
    a.r(5, 12, 9, 2, '#dd4a3c');
    a.r(12, 13, 2, 4, '#dd4a3c');
    a.p(9, 16, '#333344');
    a.p(9, 19, '#333344');
    a.r(4, 3, 11, 2, '#34344a');
    a.r(6, 1, 7, 2, '#34344a');
    a.r(14, 4, 1, 4, '#ffd24a');
  },
  '#4d5d80'
);

const mailbox = paint(
  18,
  26,
  (a) => {
    a.r(7, 12, 2, 14, '#8a5428');
    a.r(1, 3, 14, 9, '#d9574a');
    a.r(2, 2, 12, 1, '#d9574a');
    a.r(1, 10, 14, 2, '#b23b36');
    a.r(4, 6, 8, 1, OL);
    a.r(14, 0, 1, 7, '#8a5428');
    a.r(15, 0, 3, 3, '#ffd24a');
  },
  OL
);

/* ---------- farm props ---------- */

const fence = paint(16, 13, (a) => {
  a.r(0, 4, 16, 2, '#d9a066');
  a.r(0, 6, 16, 1, '#8a5428');
  a.r(0, 8, 16, 2, '#d9a066');
  a.r(0, 10, 16, 1, '#8a5428');
  a.r(5, 0, 5, 13, OL);
  a.r(6, 1, 3, 12, '#d9a066');
  a.r(6, 1, 3, 1, '#f0c088');
  a.r(8, 2, 1, 11, '#b97a3e');
});

const plot = paint(16, 5, (a) => {
  a.r(0, 2, 16, 3, '#6e4424');
  a.r(1, 1, 14, 1, '#8f5d33');
  a.r(3, 0, 10, 1, '#8f5d33');
  a.p(4, 3, '#4f2f18');
  a.p(10, 2, '#4f2f18');
});

const sprout = paint(
  8,
  7,
  (a) => {
    a.r(3, 3, 1, 4, '#4a9230');
    a.r(0, 1, 3, 2, '#9bd65a');
    a.r(4, 0, 3, 2, '#9bd65a');
    a.p(3, 2, '#6fb83f');
  },
  OL
);

const cropMid = paint(
  10,
  12,
  (a) => {
    a.r(4, 4, 2, 8, '#4a9230');
    a.r(0, 5, 4, 2, '#6fb83f');
    a.r(6, 3, 4, 2, '#6fb83f');
    a.r(1, 1, 3, 3, '#9bd65a');
    a.r(5, 0, 3, 3, '#9bd65a');
    a.r(1, 9, 3, 2, '#6fb83f');
    a.r(6, 8, 3, 2, '#6fb83f');
  },
  OL
);

const cropRipe = (fruit, fruit2) =>
  paint(
    12,
    15,
    (a) => {
      a.r(5, 3, 2, 12, '#4a9230');
      a.r(0, 5, 5, 3, '#6fb83f');
      a.r(7, 4, 5, 3, '#6fb83f');
      a.r(2, 0, 4, 4, '#9bd65a');
      a.r(6, 1, 4, 3, '#9bd65a');
      a.r(1, 9, 3, 3, fruit);
      a.p(1, 9, fruit2);
      a.r(8, 8, 3, 3, fruit);
      a.p(8, 8, fruit2);
      a.r(4, 11, 3, 3, fruit);
      a.p(4, 11, fruit2);
    },
    OL
  );

function bigVeg(kind) {
  return paint(
    22,
    22,
    (a) => {
      if (kind === 'pumpkin') {
        a.ell(11, 14, 10, 7, '#f0862f');
        a.ell(11, 14, 6, 7, '#f79a45');
        a.r(5, 9, 1, 11, '#d96a1f');
        a.r(16, 9, 1, 11, '#d96a1f');
        a.r(11, 8, 1, 13, '#d96a1f');
        a.r(10, 3, 3, 5, '#4a9230');
        a.r(12, 2, 4, 2, '#6fb83f');
      } else if (kind === 'turnip') {
        a.ell(11, 14, 8, 7, '#fff6f0');
        a.ell(11, 10, 8, 3, '#d38be0');
        a.ell(11, 9, 6, 2, '#b565c9');
        a.r(10, 20, 2, 2, '#fff6f0');
        a.r(10, 1, 2, 7, '#4a9230');
        a.r(5, 2, 5, 3, '#6fb83f');
        a.r(12, 0, 5, 3, '#9bd65a');
      } else if (kind === 'tomato') {
        a.ell(11, 13, 9, 8, '#e0463a');
        a.ell(8, 10, 3, 2, '#f58a7c');
        a.r(8, 4, 7, 2, '#4a9230');
        a.r(10, 2, 2, 3, '#4a9230');
        a.r(6, 6, 2, 1, '#4a9230');
        a.r(14, 6, 2, 1, '#4a9230');
      } else {
        // cabbage
        a.ell(11, 13, 10, 8, '#6fb83f');
        a.ell(11, 13, 7, 6, '#9bd65a');
        a.ell(11, 13, 4, 3, '#c9f07a');
        a.r(3, 15, 16, 1, '#4a9230');
        a.r(6, 18, 10, 1, '#4a9230');
      }
    },
    OL
  );
}

const pumpkin = paint(
  14,
  11,
  (a) => {
    a.ell(7, 7, 6, 4, '#f0862f');
    a.ell(7, 7, 3, 4, '#f79a45');
    a.r(3, 4, 1, 6, '#d96a1f');
    a.r(10, 4, 1, 6, '#d96a1f');
    a.r(6, 0, 2, 3, '#4a9230');
  },
  OL
);

const pedestal = paint(
  26,
  8,
  (a) => {
    a.r(2, 0, 22, 3, '#d9a066');
    a.r(2, 0, 22, 1, '#f0c088');
    a.r(0, 3, 26, 5, '#b97a3e');
    a.r(0, 7, 26, 1, '#8a5428');
  },
  OL
);

const ribbon = paint(
  12,
  17,
  (a) => {
    a.r(2, 9, 3, 8, '#3f7fe0');
    a.r(7, 9, 3, 8, '#2c5fb8');
    a.ell(6, 6, 5, 5, '#3f7fe0');
    a.ell(6, 6, 3, 3, '#ffd24a');
    a.p(6, 6, '#fff6d6');
  },
  OL
);

const crate = paint(
  18,
  14,
  (a) => {
    a.ell(4, 4, 2, 2, '#ff9a1f');
    a.ell(9, 3, 2, 2, '#ff9a1f');
    a.ell(14, 4, 2, 2, '#ff9a1f');
    a.p(3, 3, '#ffc56b');
    a.p(8, 2, '#ffc56b');
    a.p(13, 3, '#ffc56b');
    a.r(0, 5, 18, 9, '#d9a066');
    a.r(0, 5, 18, 1, '#f0c088');
    a.r(0, 9, 18, 1, '#8a5428');
    a.r(1, 5, 2, 9, '#b97a3e');
    a.r(15, 5, 2, 9, '#b97a3e');
  },
  OL
);

const barrel = paint(
  12,
  15,
  (a) => {
    a.r(1, 0, 10, 15, '#b97a3e');
    a.r(0, 3, 12, 9, '#b97a3e');
    a.r(3, 0, 2, 15, '#d9a066');
    a.r(0, 3, 12, 1, '#6b7a90');
    a.r(0, 11, 12, 1, '#6b7a90');
    a.r(2, 0, 8, 1, '#8fd0f7');
  },
  OL
);

const pipe = paint(16, 8, (a) => {
  a.r(0, 0, 16, 8, OL);
  a.r(0, 1, 16, 6, '#9aa7b8');
  a.r(0, 1, 16, 2, '#c9d3df');
  a.r(0, 6, 16, 1, '#6b7a90');
  a.r(0, 0, 4, 8, OL);
  a.r(1, 0, 2, 8, '#7d8a9c');
});

const pipeFlow = paint(16, 8, (a) => {
  a.r(6, 3, 5, 2, '#6fd0ff');
  a.r(7, 3, 2, 1, '#d6f3ff');
});

const dock = paint(
  30,
  14,
  (a) => {
    a.r(3, 3, 3, 11, '#8a5428');
    a.r(24, 3, 3, 11, '#8a5428');
    a.r(0, 0, 30, 3, '#d9a066');
    a.r(0, 0, 30, 1, '#f0c088');
    for (let x = 5; x < 30; x += 6) a.r(x, 0, 1, 3, '#b97a3e');
  },
  OL
);

const pole = paint(
  3,
  60,
  (a) => {
    a.r(0, 0, 3, 60, '#8a5428');
    a.r(0, 0, 1, 60, '#b97a3e');
  },
  OL
);

const lanterns = paint(48, 18, (a) => {
  for (let x = 0; x < 48; x++) {
    const sag = Math.round(3 * Math.sin((x / 47) * Math.PI));
    a.p(x, 1 + sag, '#5a3a22');
  }
  const cols = ['#ff6b5a', '#ffd24a', '#ff9ac1'];
  [5, 21, 37].forEach((x, i) => {
    const y = 4 + Math.round(3 * Math.sin(((x + 3) / 47) * Math.PI));
    a.r(x, y, 6, 8, OL);
    a.r(x + 1, y + 1, 4, 6, cols[i]);
    a.r(x + 2, y + 2, 2, 4, '#fff6c4');
    a.r(x + 2, y - 1, 2, 1, OL);
  });
});

const flagPL = paint(
  14,
  36,
  (a) => {
    a.r(0, 0, 2, 36, '#b9b0a0');
    a.r(2, 1, 12, 4, '#ffffff');
    a.r(2, 5, 12, 4, '#dc3545');
  },
  OL
);

/* ---------- vehicles & animals ---------- */

const boat = paint(
  46,
  14,
  (a) => {
    const rows = [
      [0, 46, '#f0c088'],
      [1, 44, '#d9a066'],
      [3, 40, '#d9a066'],
      [5, 36, '#b97a3e'],
      [8, 30, '#b97a3e'],
    ];
    a.r(0, 2, 46, 1, '#8a5428');
    rows.forEach(([inset, w, col], i) => a.r(inset, 3 + i * 2, w, 2, col));
    a.r(8, 13, 30, 1, '#8a5428');
    a.r(17, 0, 12, 2, '#8a5428');
  },
  OL
);

const balloon = paint(
  50,
  82,
  (a) => {
    const cols = ['#f2704e', '#fff1d6', '#ffc94d', '#fff1d6', '#f2704e'];
    const w30 = Math.round(23 * Math.sqrt(1 - (6 / 24) ** 2));
    const halfAt = (y) => {
      if (y <= 30) {
        const t = (y - 24) / 24;
        return Math.round(23 * Math.sqrt(Math.max(0, 1 - t * t)));
      }
      const t = (y - 30) / 26;
      return Math.round(w30 + (5 - w30) * Math.pow(t, 1.25));
    };
    for (let y = 0; y <= 56; y++) {
      const hw = halfAt(y);
      for (let x = 25 - hw; x <= 25 + hw; x++) {
        const u = hw ? (x - 25) / hw : 0;
        const band = Math.min(4, Math.floor((u + 1) * 2.5));
        a.p(x, y, cols[band]);
      }
    }
    for (let x = 25 - halfAt(31); x <= 25 + halfAt(31); x++) a.r(x, 31, 1, 2, '#b23b36');
    a.ell(14, 14, 2, 5, '#ffffff');
    a.r(20, 57, 11, 3, '#b23b36');
    for (let y = 60; y < 82; y++) {
      const t = (y - 60) / 22;
      a.p(Math.round(21 - 3 * t), y, '#6b4a2a');
      a.p(Math.round(29 + 3 * t), y, '#6b4a2a');
    }
  },
  OL
);

const basket = paint(
  18,
  12,
  (a) => {
    a.r(0, 0, 18, 12, '#b97a3e');
    a.r(0, 0, 18, 2, '#e0b070');
    for (let y = 3; y < 12; y += 2) for (let x = (y % 4 === 3 ? 0 : 2); x < 18; x += 4) a.r(x, y, 2, 1, '#8a5428');
    a.r(0, 11, 18, 1, '#8a5428');
  },
  OL
);

const chick = paint(
  9,
  8,
  (a) => {
    a.ell(4, 5, 3, 2, '#ffe066');
    a.r(5, 1, 3, 3, '#ffe066');
    a.p(8, 2, '#ff9a1f');
    a.p(6, 2, '#333333');
    a.p(2, 5, '#f5c33b');
    a.p(3, 7, '#ff9a1f');
    a.p(5, 7, '#ff9a1f');
  },
  OL
);

/* ---------- sky ---------- */

const cloud = paint(44, 16, (a) => {
  a.ell(12, 10, 10, 5, '#ffffff');
  a.ell(24, 7, 12, 7, '#ffffff');
  a.ell(35, 11, 8, 4, '#ffffff');
  a.r(4, 12, 38, 3, '#ffffff');
  a.r(7, 14, 32, 1, '#dcecff');
});

const sun = paint(26, 26, (a) => {
  const ray = '#ffd23f';
  a.r(12, 0, 2, 3, ray);
  a.r(12, 23, 2, 3, ray);
  a.r(0, 12, 3, 2, ray);
  a.r(23, 12, 3, 2, ray);
  a.r(4, 4, 2, 2, ray);
  a.r(20, 4, 2, 2, ray);
  a.r(4, 20, 2, 2, ray);
  a.r(20, 20, 2, 2, ray);
  a.ell(13, 13, 8, 8, '#ffe066');
  a.ell(12, 12, 5, 5, '#fff3a6');
});

const moon = paint(22, 22, (a) => {
  a.ell(11, 11, 9, 9, '#fff6d6');
  a.ell(8, 8, 2, 2, '#e6dcb4');
  a.ell(14, 13, 2, 1, '#e6dcb4');
  a.ell(9, 15, 1, 1, '#e6dcb4');
});

function skyline(w, h, blocks, c1, c2, lit) {
  return paint(w, h, (a) => {
    const R = rnd(5);
    blocks.forEach(([x, bw, bh, solid], i) => {
      a.r(x, h - bh, bw, bh, i % 2 ? c1 : c2);
      if (solid) return;
      for (let yy = h - bh + 3; yy < h - 3; yy += 5) {
        for (let xx = x + 2; xx < x + bw - 2; xx += 4) if (R() > 0.6) a.r(xx, yy, 2, 2, lit);
      }
    });
  });
}

const skylineWarsaw = skyline(
  130,
  82,
  [
    [0, 14, 30],
    [12, 11, 44],
    [24, 17, 26],
    [40, 13, 38],
    [84, 14, 34],
    [96, 13, 48],
    [108, 22, 28],
    [52, 28, 44],
    [57, 18, 58, 1],
    [61, 10, 70, 1],
    [65, 2, 82, 1],
  ],
  '#9db2d4',
  '#8ea5ca',
  '#d6e4f7'
);

const skylineNYC = skyline(
  152,
  98,
  [
    [0, 12, 40],
    [10, 11, 58],
    [22, 15, 46],
    [38, 11, 70],
    [50, 17, 52],
    [88, 13, 62],
    [102, 17, 44],
    [116, 11, 68],
    [128, 15, 38],
    [140, 12, 50],
    [66, 22, 64],
    [69, 16, 76, 1],
    [72, 10, 86, 1],
    [76, 2, 98, 1],
  ],
  '#8fa9cf',
  '#7f9ac4',
  '#ffe9a3'
);

const mount = paint(170, 90, (a) => {
  for (let x = 0; x < 170; x++) {
    const d = Math.abs(x - 85);
    const y = Math.round(6 + d * 0.98 + 2 * Math.sin(x * 0.7));
    if (y >= 90) continue;
    a.r(x, y, 1, 90 - y, x > 85 ? '#8196bd' : '#93a8cc');
    const snow = 30 - y + Math.round(3 * Math.sin(x * 1.3));
    if (snow > 0) a.r(x, y, 1, snow, x > 85 ? '#e6eefb' : '#ffffff');
  }
});

/* ---------- small HUD icons ---------- */

const icons = {
  spring: paint(
    11,
    11,
    (a) => {
      const p = '#ff9ac1';
      a.r(4, 0, 3, 3, p);
      a.r(0, 3, 3, 3, p);
      a.r(8, 3, 3, 3, p);
      a.r(1, 7, 3, 3, p);
      a.r(7, 7, 3, 3, p);
      a.r(3, 3, 5, 5, '#ffc2da');
      a.r(4, 4, 3, 3, '#ffd24a');
    },
    OL
  ),
  summer: paint(
    11,
    11,
    (a) => {
      a.ell(5, 5, 3, 3, '#ffd23f');
      a.r(5, 0, 1, 2, '#ff9a1f');
      a.r(5, 9, 1, 2, '#ff9a1f');
      a.r(0, 5, 2, 1, '#ff9a1f');
      a.r(9, 5, 2, 1, '#ff9a1f');
      a.p(1, 1, '#ff9a1f');
      a.p(9, 1, '#ff9a1f');
      a.p(1, 9, '#ff9a1f');
      a.p(9, 9, '#ff9a1f');
    },
    OL
  ),
  autumn: paint(
    11,
    11,
    (a) => {
      a.r(4, 0, 3, 2, '#f0762f');
      a.r(2, 2, 7, 4, '#f0762f');
      a.r(0, 3, 11, 2, '#e0553a');
      a.r(3, 6, 5, 2, '#f0762f');
      a.r(5, 2, 1, 9, '#8a3a20');
    },
    OL
  ),
  winter: paint(
    11,
    11,
    (a) => {
      const c = '#ffffff';
      a.r(5, 0, 1, 11, c);
      a.r(0, 5, 11, 1, c);
      for (let i = 1; i < 10; i++) {
        a.p(i, i, c);
        a.p(10 - i, i, c);
      }
      a.r(4, 4, 3, 3, '#cfe6ff');
    },
    '#4d5d80'
  ),
  dusk: paint(
    11,
    11,
    (a) => {
      a.ell(5, 5, 4, 4, '#fff6d6');
      a.ell(7, 4, 3, 3, '#3b3470');
    },
    OL
  ),
  bag: paint(
    12,
    13,
    (a) => {
      a.r(4, 0, 4, 2, '#8a5428');
      a.r(1, 2, 10, 11, '#d9574a');
      a.r(1, 2, 10, 2, '#f07a6a');
      a.r(3, 7, 6, 4, '#b23b36');
      a.r(5, 8, 2, 1, '#ffd24a');
    },
    OL
  ),
  star: paint(
    9,
    9,
    (a) => {
      a.r(4, 0, 1, 9, '#ffd24a');
      a.r(0, 4, 9, 1, '#ffd24a');
      a.r(3, 2, 3, 5, '#ffd24a');
      a.r(2, 3, 5, 3, '#ffd24a');
      a.p(4, 4, '#fff6c4');
    },
    OL
  ),
};

/* ---------- export ---------- */

const GREENS = {
  spring: { l: '#c9f07a', m: '#8fd64f', d: '#5aa83c' },
  summer: { l: '#8fd64f', m: '#57b03a', d: '#2f7d2e' },
  cherry: { l: '#ffe3ee', m: '#ffb7d0', d: '#f58fb3' },
  maple: { l: '#ffb347', m: '#f0762f', d: '#c94a2a' },
  ginkgo: { l: '#fff08a', m: '#f5c33b', d: '#d99a1e' },
};

export const SPR = {
  playerIdle: playerFrame(LEGS.idle),
  playerA: playerFrame(LEGS.a),
  playerB: playerFrame(LEGS.b),
  strawHat,
  gradCap,

  groundSpring: groundTile({ g0: '#d9f59a', g1: '#b4e66a', g2: '#84cc4c', g3: '#5aa83c', s1: '#b07a48', s2: '#8f5d33', s3: '#6e4424' }),
  groundSummer: groundTile({ g0: '#b4e66a', g1: '#8fd64f', g2: '#5fb83a', g3: '#3f8f2e', s1: '#b07a48', s2: '#8f5d33', s3: '#6e4424' }),
  groundAutumn: groundTile({ g0: '#f7dc7a', g1: '#e8bf52', g2: '#cf9a3c', g3: '#a8742c', s1: '#a8744a', s2: '#875836', s3: '#673f24' }),
  groundWinter: groundTile({ g0: '#ffffff', g1: '#ffffff', g2: '#e6eefb', g3: '#c5d3ea', s1: '#9b8a86', s2: '#7d6c6a', s3: '#5f504f' }),
  water: waterTile,
  hillsSpring: hillsTile('#b5e39a', '#86cf62', '#a3e07c'),
  hillsSummer: hillsTile('#8ad486', '#52b04c', '#6cc65f'),
  hillsAutumn: hillsTile('#efc67c', '#dc8f42', '#eeab58'),
  hillsWinter: hillsTile('#e4ecf8', '#c8d6ea', '#ffffff'),
  hillsDusk: hillsTile('#4d4884', '#363262', '#5d5798'),
  mountains: mountainsTile,

  house: house(false),
  houseLit: house(true),
  barn,
  academyPL: academy({ flag: 'pl' }),
  academyJP: academy({ wall: '#c96f55', shade: '#a55440', col: '#f3ead6', roof: '#6b5a66', flag: 'jp' }),
  academySnow: academy({ wall: '#c96f55', shade: '#a55440', col: '#f3ead6', roof: '#6b5a66', flag: 'jp', snow: true }),
  office,
  stall,
  board: board('notes'),
  chalkboard: board('chalk'),
  gate,
  silo,
  windmillBody,
  windmillBlades,

  treeSpring: tree(GREENS.spring),
  treeCherry: tree(GREENS.cherry, { n: 9, color: '#ffffff', hi: '#ffffff', seed: 9 }),
  treeSummer: tree(GREENS.summer),
  treeApple: tree(GREENS.summer, { n: 8, color: '#e0463a', hi: '#f58a7c', seed: 4 }),
  treeMaple: tree(GREENS.maple),
  treeGinkgo: tree(GREENS.ginkgo),
  treeOrange: tree(GREENS.summer, { n: 11, color: '#ff9a1f', hi: '#ffc56b', seed: 12 }),
  pine,
  flowerPink: flower('#ff8fb8', '#ffd24a'),
  flowerWhite: flower('#ffffff', '#ffd24a'),
  flowerRed: flower('#e0463a', '#ffd24a'),
  flowerBlue: flower('#6fa8ff', '#ffffff'),
  flowerYellow: flower('#ffd24a', '#ff9a1f'),
  flowerPurple: flower('#b98af0', '#ffd24a'),
  tuftGreen: tuft('#5aa83c', '#84cc4c'),
  tuftGold: tuft('#a8742c', '#e8bf52'),
  tuftSnow: tuft('#c5d3ea', '#ffffff'),
  rock,
  haybale,
  scarecrow,
  snowman,
  mailbox,

  fence,
  plot,
  sprout,
  cropMid,
  cropRed: cropRipe('#e0463a', '#f58a7c'),
  cropYellow: cropRipe('#ffd24a', '#fff6c4'),
  cropPurple: cropRipe('#a06ad9', '#cfa8f0'),
  cropBlue: cropRipe('#4f86c6', '#a9cdf2'),
  vegTurnip: bigVeg('turnip'),
  vegPumpkin: bigVeg('pumpkin'),
  vegTomato: bigVeg('tomato'),
  vegCabbage: bigVeg('cabbage'),
  pumpkin,
  pedestal,
  ribbon,
  crate,
  barrel,
  pipe,
  pipeFlow,
  dock,
  pole,
  lanterns,
  flagPL,

  boat,
  balloon,
  basket,
  chick,

  cloud,
  sun,
  moon,
  skylineWarsaw,
  skylineNYC,
  mount,

  iconSpring: icons.spring,
  iconSummer: icons.summer,
  iconAutumn: icons.autumn,
  iconWinter: icons.winter,
  iconDusk: icons.dusk,
  iconBag: icons.bag,
  iconStar: icons.star,
};
