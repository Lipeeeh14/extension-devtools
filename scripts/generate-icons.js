const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];

if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons', { recursive: true });
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fundo indigo
  ctx.fillStyle = '#4f46e5';
  ctx.beginPath();
  const radius = size * 0.15;
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  // Texto "DT"
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const fontSize = size < 24 ? Math.floor(size * 0.45) : Math.floor(size * 0.4);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillText(size < 24 ? 'D' : 'DT', size / 2, size / 2);

  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join('public', 'icons', `icon${size}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Gerado: ${filePath}`);
});

console.log('🎉 Todos os ícones foram gerados com sucesso!');
