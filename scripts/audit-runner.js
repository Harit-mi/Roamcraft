const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3005';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, label: 'desktop-1440x900' },
  laptop: { width: 1280, height: 800, label: 'laptop-1280x800' },
  tablet: { width: 768, height: 1024, label: 'tablet-768x1024', isMobile: true },
  mobile: { width: 390, height: 844, label: 'mobile-390x844', isMobile: true, hasTouch: true },
  narrow_mobile: { width: 360, height: 800, label: 'narrow-360x800', isMobile: true, hasTouch: true },
};

const ROUTES = [
  { path: '/', name: 'homepage' },
  { path: '/discover', name: 'discover' },
  { path: '/destinations', name: 'destinations' },
  { path: '/destinations/south-goa', name: 'destination-detail' },
  { path: '/videos/vid-1', name: 'video-reel' },
  { path: '/itineraries', name: 'itineraries' },
  { path: '/itineraries/south-goa-slow-coastal-drift', name: 'itinerary-detail' },
  { path: '/itineraries/create', name: 'itinerary-create' },
  { path: '/itineraries/south-goa-slow-coastal-drift/edit', name: 'itinerary-edit' },
  { path: '/creators', name: 'creators' },
  { path: '/creators/aarav_travels', name: 'creator-profile' },
  { path: '/saved', name: 'saved' },
  { path: '/my-trips', name: 'my-trips' },
  { path: '/studio', name: 'studio' },
  { path: '/profile', name: 'profile' }
];

async function runAudit(cycleName = 'baseline') {
  const outputDir = path.join(__dirname, '..', 'test-artifacts', cycleName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Starting UI/UX Audit for cycle [${cycleName}]...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--user-data-dir=/tmp/chrome-audit-profile'
    ]
  });

  const auditReport = {
    cycle: cycleName,
    timestamp: new Date().toISOString(),
    routesAudited: [],
    errors: [],
    overflows: [],
    brokenImages: [],
    interactions: []
  };

  const page = await browser.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      auditReport.errors.push({
        type: 'console_error',
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  page.on('pageerror', (err) => {
    auditReport.errors.push({
      type: 'page_error',
      text: err.toString(),
      stack: err.stack
    });
  });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`\nAuditing route: ${route.name} (${route.path})`);

    const routeResult = {
      name: route.name,
      path: route.path,
      viewports: {}
    };

    // Primary viewports for screenshots: desktop (1440x900) & mobile (390x844) & tablet (768x1024)
    for (const [vpKey, vp] of Object.entries(VIEWPORTS)) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: !!vp.isMobile,
        hasTouch: !!vp.hasTouch
      });

      try {
        const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        const status = response ? response.status() : 0;

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
          };
        });

        if (overflow.hasOverflow) {
          auditReport.overflows.push({
            route: route.path,
            viewport: vpKey,
            ...overflow
          });
        }

        // Check broken images: an image is truly broken if it completed loading but naturalWidth is 0
        const brokenImgs = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs
            .filter(img => img.complete && img.naturalWidth === 0)
            .map(img => ({ src: img.src, alt: img.alt }));
        });

        if (brokenImgs.length > 0) {
          auditReport.brokenImages.push({
            route: route.path,
            viewport: vpKey,
            images: brokenImgs
          });
        }

        // Capture screenshot (capture top viewport and full page)
        const filename = `${route.name}_${vp.label}.png`;
        const filepath = path.join(outputDir, filename);
        await page.screenshot({ path: filepath, fullPage: false });

        routeResult.viewports[vpKey] = {
          status,
          screenshot: filename,
          hasOverflow: overflow.hasOverflow,
          brokenImagesCount: brokenImgs.length
        };
      } catch (err) {
        console.error(`Error auditing ${route.name} at ${vpKey}:`, err.message);
        auditReport.errors.push({
          route: route.path,
          viewport: vpKey,
          error: err.message
        });
      }
    }

    auditReport.routesAudited.push(routeResult);
  }

  // Write summary report
  const reportPath = path.join(outputDir, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
  console.log(`\nAudit completed! Report saved to ${reportPath}`);

  await browser.close();
  return auditReport;
}

const cycle = process.argv[2] || 'baseline';
runAudit(cycle).then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
