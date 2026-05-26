const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../images');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const createSimplePNG = (width, height, r, g, b, a) => {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const crc32 = (buf) => {
    let crc = 0xFFFFFFFF;
    const table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    for (let i = 0; i < buf.length; i++) {
      crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  };

  const createChunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const typeBuf = Buffer.from(type);
    const crcData = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData));
    return Buffer.concat([length, typeBuf, data, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0);
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b, a);
    }
  }

  const { deflateSync } = require('zlib');
  const compressed = deflateSync(Buffer.from(rawData));

  const iend = Buffer.alloc(0);

  return Buffer.concat([
    signature,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', compressed),
    createChunk('IEND', iend)
  ]);
};

const homeIcon = createSimplePNG(48, 48, 153, 153, 153, 255);
const homeActiveIcon = createSimplePNG(48, 48, 196, 167, 125, 255);
const publishIcon = createSimplePNG(48, 48, 153, 153, 153, 255);
const publishActiveIcon = createSimplePNG(48, 48, 196, 167, 125, 255);
const mineIcon = createSimplePNG(48, 48, 153, 153, 153, 255);
const mineActiveIcon = createSimplePNG(48, 48, 196, 167, 125, 255);

fs.writeFileSync(path.join(iconsDir, 'home.png'), homeIcon);
fs.writeFileSync(path.join(iconsDir, 'home-active.png'), homeActiveIcon);
fs.writeFileSync(path.join(iconsDir, 'publish.png'), publishIcon);
fs.writeFileSync(path.join(iconsDir, 'publish-active.png'), publishActiveIcon);
fs.writeFileSync(path.join(iconsDir, 'mine.png'), mineIcon);
fs.writeFileSync(path.join(iconsDir, 'mine-active.png'), mineActiveIcon);

console.log('Icons created successfully!');