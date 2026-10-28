const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3005';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runInteractionTests() {
  console.log('Starting Interactive Functional Testing Suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--user-data-dir=/tmp/chrome-test-interaction'
    ]
  });

  const results = [];
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  try {
    // TEST 1: Destination Search & Filtering on /discover
    console.log('TEST 1: Testing Destination Search & Filters on /discover');
    await page.goto(`${BASE_URL}/discover`, { waitUntil: 'networkidle2' });
    
    // Type in search field
    const searchInput = await page.$('input[placeholder*="Search destinations"]');
    if (searchInput) {
      await searchInput.type('Goa');
      await delay(500);
      const cardTexts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
      });
      const hasGoa = cardTexts.some(t => t.toLowerCase().includes('goa'));
      results.push({
        test: 'Destination Search (/discover)',
        passed: hasGoa,
        detail: hasGoa ? 'Successfully filtered cards matching "Goa"' : 'Search did not match expected cards'
      });
      // Clear input
      await searchInput.click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
      await delay(300);
    } else {
      results.push({ test: 'Destination Search (/discover)', passed: false, detail: 'Search input not found' });
    }

    // TEST 2: Filter Drawer on /discover
    console.log('TEST 2: Testing Filter Drawer toggle on /discover');
    const filterBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('Filters'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    await delay(400);
    const drawerOpen = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3, h4')).some(el => el.innerText.includes('Trip Filters'));
    });
    results.push({
      test: 'Filter Drawer Interactive Toggle',
      passed: filterBtn && drawerOpen,
      detail: drawerOpen ? 'Filter drawer successfully opened' : 'Filter drawer modal failed to open'
    });

    // Close filter drawer
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close filters"], button:has(svg.lucide-x)');
      if (closeBtn) closeBtn.click();
    });
    await delay(300);

    // TEST 3: Day Tabs on /itineraries/south-goa-slow-coastal-drift
    console.log('TEST 3: Testing Day Tabs on Itinerary Detail');
    await page.goto(`${BASE_URL}/itineraries/south-goa-slow-coastal-drift`, { waitUntil: 'networkidle2' });
    
    // Find Day 2 pill button
    const day2Button = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('Day 2'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    await delay(400);
    const day2Theme = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h3, h4'));
      return headers.map(h => h.innerText).join(' ');
    });
    const day2Switched = day2Theme.toLowerCase().includes('day 2') || day2Theme.toLowerCase().includes('fort') || day2Theme.toLowerCase().includes('coastal');
    results.push({
      test: 'Itinerary Day Tab Switching',
      passed: day2Button && day2Switched,
      detail: day2Switched ? 'Day 2 schedule loaded properly upon clicking tab' : 'Failed to switch day schedule'
    });

    // TEST 4: Party Size Budget Multiplier on /itineraries/south-goa-slow-coastal-drift
    console.log('TEST 4: Testing Budget Party-Size Multiplier');
    const budgetBefore = await page.evaluate(() => {
      const el = document.querySelector('.budget-total-cost');
      return el ? el.innerText : '';
    });
    
    // Click party size '+' button
    const plusClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const plusBtn = buttons.find(b => b.getAttribute('aria-label') === 'Increase travelers' || b.innerText.trim() === '+');
      if (plusBtn) {
        plusBtn.click();
        return true;
      }
      return false;
    });
    await delay(400);
    const budgetAfter = await page.evaluate(() => {
      const el = document.querySelector('.budget-total-cost');
      return el ? el.innerText : '';
    });
    const budgetUpdated = budgetBefore && budgetAfter && budgetBefore !== budgetAfter;
    results.push({
      test: 'Party Size Budget Recalculation',
      passed: plusClicked && budgetUpdated,
      detail: `Adjusted travelers: budget display updated from "${budgetBefore}" to "${budgetAfter}"`
    });

    // TEST 5: Save Itinerary & Verify in /saved
    console.log('TEST 5: Testing Save Itinerary & /saved sync');
    const saveBtn = await page.$('button[aria-label="Save itinerary"], button[title*="Save"]');
    if (saveBtn) {
      await saveBtn.click();
      await delay(400);
    }
    await page.goto(`${BASE_URL}/saved`, { waitUntil: 'networkidle2' });
    const savedCards = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    });
    const isSavedPresent = savedCards.length > 0;
    results.push({
      test: 'Save Itinerary & /saved Verification',
      passed: isSavedPresent,
      detail: isSavedPresent ? `Found ${savedCards.length} saved trip items in /saved hub` : 'No saved trips rendered in /saved'
    });

    // TEST 6: Interactive Itinerary Editor Stop Operations on /itineraries/create
    console.log('TEST 6: Testing Stop Management & Keyboard Accessible Reordering');
    await page.goto(`${BASE_URL}/itineraries/create`, { waitUntil: 'networkidle2' });

    // Click Add Stop button
    const addStopClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const addBtn = btns.find(b => b.innerText.includes('Add Stop'));
      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });
    await delay(400);

    // Click Duplicate Stop button
    const duplicateClicked = await page.evaluate(() => {
      const dupBtn = document.querySelector('button[title="Duplicate Stop"]');
      if (dupBtn) {
        dupBtn.click();
        return true;
      }
      return false;
    });
    await delay(400);

    // Verify stop count increased
    const stopsCount = await page.evaluate(() => {
      return document.querySelectorAll('button[title="Duplicate Stop"]').length;
    });
    results.push({
      test: 'Stop Creation & Duplication (Itinerary Editor)',
      passed: addStopClicked && stopsCount >= 2,
      detail: `Successfully added and duplicated stops. Current stops count: ${stopsCount}`
    });

    // TEST 7: Creator Studio Tabs Navigation on /studio
    console.log('TEST 7: Testing Studio Tabs Navigation on /studio');
    await page.goto(`${BASE_URL}/studio`, { waitUntil: 'networkidle2' });
    const switchedToUpload = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const uploadTab = btns.find(b => b.innerText.includes('Upload Video'));
      if (uploadTab) {
        uploadTab.click();
        return true;
      }
      return false;
    });
    await delay(400);
    const hasUploadForm = await page.evaluate(() => {
      return !!document.querySelector('form');
    });
    results.push({
      test: 'Creator Studio Tab Switching (/studio)',
      passed: switchedToUpload && hasUploadForm,
      detail: hasUploadForm ? 'Upload Reel form displayed on tab switch' : 'Upload form not rendered'
    });

    // TEST 8: Video Player & Link-to-Itinerary on /videos/vid-1
    console.log('TEST 8: Testing Video-to-Itinerary Navigation');
    await page.goto(`${BASE_URL}/videos/vid-1`, { waitUntil: 'networkidle2' });
    const itineraryLink = await page.$('a[href*="/itineraries/"]');
    const linkFound = !!itineraryLink;
    results.push({
      test: 'Video Player to Itinerary Route Link',
      passed: linkFound,
      detail: linkFound ? 'Direct itinerary route link present on video page' : 'Missing itinerary link'
    });

  } catch (err) {
    console.error('Interactive test suite encountered error:', err);
    results.push({ test: 'Interactive Test Execution', passed: false, error: err.message });
  } finally {
    await browser.close();
  }

  console.log('\n--- INTERACTIVE TEST RESULTS ---');
  results.forEach(r => {
    console.log(`${r.passed ? '✓ PASS' : '✗ FAIL'}: [${r.test}] - ${r.detail || r.error}`);
  });

  const outPath = path.join(__dirname, '..', 'test-artifacts', 'interaction-test-results.json');
  fs.writeFileSync(outPath, JSON.stringify({ results, errors }, null, 2));
  return results;
}

runInteractionTests().then(results => {
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
});
