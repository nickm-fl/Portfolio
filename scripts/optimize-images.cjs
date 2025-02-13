const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define multiple input directories and their corresponding output directories
const directories = [
  {
    input: path.join(__dirname, '../public/svg'),
    output: path.join(__dirname, '../public/webp')
  },
  {
    input: path.join(__dirname, '../public/jpg'),
    output: path.join(__dirname, '../public/webp')
  }
];

// Process each directory
directories.forEach(({ input, output }) => {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  if (fs.existsSync(input)) {
    fs.readdirSync(input).forEach(file => {
      const inputPath = path.join(input, file);
      const outputPath = path.join(output, `${path.parse(file).name}.webp`);
      
      if (file.endsWith('.svg')) {
        // For SVG files, create a 1024x1024 (or your preferred size) raster image
        sharp(inputPath, { density: 300 }) // Increase DPI for better quality
          .resize(1024, 1024, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
          })
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(info => console.log(`Converted ${file} to WebP`))
          .catch(err => {
            console.error(`Error converting ${file}:`, err);
            // Fallback method for problematic SVGs
            sharp({
              create: {
                width: 1024,
                height: 1024,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              }
            })
              .composite([{ input: inputPath, blend: 'over' }])
              .webp({ quality: 80 })
              .toFile(outputPath)
              .then(info => console.log(`Converted ${file} to WebP (fallback method)`))
              .catch(err => console.error(`Failed to convert ${file} (fallback method):`, err));
          });
      } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
        // For regular images (JPG, PNG)
        sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(info => console.log(`Converted ${file} to WebP`))
          .catch(err => console.error(`Error converting ${file}:`, err));
      }
    });
  } else {
    console.warn(`Input directory ${input} does not exist`);
  }
}); 