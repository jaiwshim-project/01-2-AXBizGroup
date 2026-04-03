const puppeteer = require('C:/Users/USER/AppData/Roaming/npm/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

async function generatePDF(inputPath, outputPath, options = {}) {
  const {
    format = 'A4',
    marginTop = '20mm',
    marginBottom = '20mm',
    marginLeft = '15mm',
    marginRight = '15mm',
    displayHeaderFooter = true,
    headerTemplate = `
      <div style="font-size:9px; width:100%; text-align:center; color:#888;">
        <span class="title"></span>
      </div>`,
    footerTemplate = `
      <div style="font-size:9px; width:100%; text-align:center; color:#888;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>`,
  } = options;

  const chromePaths = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.CHROME_PATH,
  ].filter(Boolean);

  let executablePath = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }

  if (!executablePath) {
    throw new Error('Chrome not found. Set CHROME_PATH.');
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const fileUrl = inputPath.startsWith('http')
      ? inputPath
      : `file:///${path.resolve(inputPath).replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Hide sidebar and adjust layout for PDF
    await page.evaluate(() => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = 'none';
      const main = document.querySelector('.main');
      if (main) {
        main.style.marginLeft = '0';
        main.style.width = '100%';
      }
    });

    await page.pdf({
      path: outputPath,
      format,
      margin: {
        top: marginTop,
        bottom: marginBottom,
        left: marginLeft,
        right: marginRight,
      },
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
      printBackground: true,
      preferCSSPageSize: false,
    });

    const stats = fs.statSync(outputPath);
    console.log(`PDF generated: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    return stats;
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const input = args[0];
  const output = args[1] || input.replace(/\.\w+$/, '.pdf');
  generatePDF(input, output).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = { generatePDF };
