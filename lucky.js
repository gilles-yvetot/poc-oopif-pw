const { chromium } = require('playwright-chromium')
;(async () => {
  try {
    const context = await chromium.launchPersistentContext(`userDataDir`, {
      defaultViewport: null,
      headless: false,
      timeout: 0,
      devtools: true,
      ignoreDefaultArgs: [
        `--no-sandbox`,
        `--disable-default-apps`,
        `--disable-dev-shm-usage`,
        `--disable-sync`,
        `--disable-hang-monitor`,
        `--disable-extensions`,
        `--enable-automation`,
        `--password-store=basic`,
        `--use-mock-keychain`,
        `--disable-popup-blocking`,
        `--disable-prompt-on-repost`,
        `--force-color-profile=srgb`,
        `--disable-features=TranslateUI,BlinkGenPropertyTrees,ImprovedCookieControls,SameSiteByDefaultCookies`,
        `--disable-background-timer-throttling`,
        `--disable-backgrounding-occluded-windows`,
        `--disable-ipc-flooding-protection`,
        `--disable-renderer-backgrounding`,
        `--disable-background-networking`,
        `--disable-client-side-phishing-detection`,
        `--disable-component-extensions-with-background-pages`,
        `--metrics-recording-only`,
        `--no-first-run`,
      ],
      args: [
        `--profile-directory=Default`, // always launch default
        `--allow-insecure-localhost`, // to make sure that we can communicate to local wss
      ],
    })

    const page = await context.newPage()
    await page.goto('https://google.com/', { waitUntil: `networkidle` })

    await page.type(`input`, `linkedin pavel feldman`)
    await page.click(`//div[@id="gb"]`) // click away to close search

    await Promise.all([
      await page.click(`//*[@id="gbqfbb"]`, {
        timeout: 5 * 1000,
        force: true,
      }),
      page.waitForNavigation(),
    ])

    console.log(`navigation done`)
    process.exit(0)
  } catch (err) {
    console.log('err', err)
    process.exit(1)
  }
})()
