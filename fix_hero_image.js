const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'c:/Users/Abhi/Desktop/saveweb2zip-com-johnson-template-webflow-io/images/hero_image_new.png';
const outputPath = 'c:/Users/Abhi/Desktop/saveweb2zip-com-johnson-template-webflow-io/images/hero_image_new_fixed.png';
const bgColor = { r: 0xff, g: 0xe8, b: 0xe7 }; // #ffe8e7

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Check if pixel is likely part of the checkered background
        // The checkers in the image are very light (white and light grey)
        // Usually white is 255,255,255 and grey is 234,234,234 or similar
        const isWhite = r > 240 && g > 240 && b > 240;
        const isGrey = r > 200 && r < 240 && g > 200 && g < 240 && b > 200 && b < 240;

        // Only replace pixels that are NOT the person (skin/clothes/orange circle)
        // The orange circle is roughly r:254, g:86, b:33
        // The green hoodie is dark green.
        // The checkered pattern is almost always at the very high end of luminosity.
        if ((isWhite || isGrey) && a > 0) {
          // Check if it's "outside" or just a very bright pixel
          // To be safe, let's look at the distance from the center
          const centerX = this.width / 2;
          const centerY = this.height * 0.55; // Circle is slightly lower
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          
          // If it's outside the main orange circle radius (approx 45% of width)
          if (dist > this.width * 0.44) {
             this.data[idx] = bgColor.r;
             this.data[idx + 1] = bgColor.g;
             this.data[idx + 2] = bgColor.b;
             this.data[idx + 3] = 255;
          }
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Fixed image saved.');
    });
  });
