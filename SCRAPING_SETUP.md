# Roadmap.sh Resource Scraping Setup

This guide explains how to set up and use the roadmap.sh resource scraper to get free learning resources (YouTube videos, articles, tutorials) directly integrated into the app.

## Quick Start

### Option 1: Node.js with Puppeteer (Recommended for React/JS sites)

1. **Install Puppeteer:**
   ```bash
   npm install --save-dev puppeteer
   ```

2. **Run the scraper:**
   ```bash
   npm run scrape:all
   ```

   This will:
   - Scrape resources from roadmap.sh
   - Merge them into `resources.json`
   - Show you how many resources were found

### Option 2: Python (Alternative)

1. **Install Python dependencies:**
   ```bash
   pip install requests beautifulsoup4
   ```

2. **Run the Python scraper:**
   ```bash
   python scripts/scrape-roadmap.py
   ```

3. **Merge resources:**
   ```bash
   npm run merge:resources
   ```

## What Gets Scraped

The scraper extracts free resources from roadmap.sh pages for each skill:

- **YouTube Videos** - Direct links to tutorial videos
- **freeCodeCamp Courses** - Interactive coding courses
- **MDN Documentation** - Official web docs
- **Articles** - From Medium, Dev.to, etc.
- **GitHub Repositories** - Code examples and projects
- **Other Free Resources** - W3Schools, Khan Academy, etc.

## How It Works

1. **Scraping Phase:**
   - Visits roadmap.sh pages for each skill (e.g., `/frontend`, `/python`)
   - Extracts all external resource links
   - Filters for free platforms only
   - Saves to `src/data/roadmap-resources-scraped.json`

2. **Merging Phase:**
   - Loads existing `resources.json`
   - Adds new scraped resources (avoiding duplicates)
   - Prioritizes free resources
   - Updates `resources.json`

3. **Display:**
   - Users see direct links to YouTube videos, tutorials, etc.
   - Resources are prioritized: Videos → Interactive → Docs
   - Each skill shows up to 5 resources

## Example Output

After scraping, users will see resources like:

```
📹 JavaScript Tutorial for Beginners (YouTube)
🎯 JavaScript Algorithms and Data Structures (freeCodeCamp)
📚 JavaScript Guide (MDN)
🗺️ Frontend Developer Roadmap (roadmap.sh)
```

## Troubleshooting

### Puppeteer Installation Issues

If Puppeteer fails to install:

```bash
# Skip Chromium download (use system Chrome)
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm install puppeteer

# Or install Chromium separately
brew install chromium  # Mac
```

### No Resources Found

1. **Check roadmap.sh structure:**
   - Visit the roadmap.sh page manually
   - Check if the page loads correctly
   - Verify the URL in `skillRoadmaps` mapping

2. **Update selectors:**
   - Roadmap.sh may have changed their HTML structure
   - Update selectors in `scrape-roadmap-puppeteer.js`
   - Look for class names, IDs, or data attributes

3. **Check console output:**
   - The scraper shows which URLs it's visiting
   - Check for error messages
   - Verify network requests are succeeding

### Python Script Issues

If the Python script doesn't find resources:

1. **Roadmap.sh uses React:**
   - BeautifulSoup can't execute JavaScript
   - Use Selenium instead:
     ```bash
     pip install selenium
     ```
   - Or use the Puppeteer version (recommended)

2. **Update selectors:**
   - Inspect the roadmap.sh page
   - Update CSS selectors in `scrape-roadmap.py`

## Updating Resources

To keep resources fresh:

1. **Run periodically:**
   ```bash
   npm run scrape:all
   ```

2. **Review changes:**
   - Check `roadmap-resources-scraped.json` for new resources
   - Verify resources are valid and accessible
   - Test in the app

3. **Commit updates:**
   - Commit the updated `resources.json`
   - Don't commit `roadmap-resources-scraped.json` (it's temporary)

## Fallback Plan

If scraping doesn't work, the app falls back to:
- Direct links to roadmap.sh pages (via `roadmapMapper.ts`)
- Existing manual resources in `resources.json`
- Generic search suggestions

## Legal & Ethical Considerations

- ✅ Respect roadmap.sh's terms of service
- ✅ Add delays between requests (2 seconds)
- ✅ Don't overload their servers
- ✅ Cache results instead of scraping on every request
- ✅ Give credit to roadmap.sh as the source

## Next Steps

1. Install Puppeteer: `npm install --save-dev puppeteer`
2. Run scraper: `npm run scrape:all`
3. Test in app: Check if resources display correctly
4. Review resources: Verify they're relevant and free
5. Update periodically: Run scraper monthly to keep resources fresh

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify roadmap.sh URLs are correct
3. Test manually visiting the roadmap.sh pages
4. Review the scraper code and update selectors if needed

