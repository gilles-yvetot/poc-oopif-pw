const { chromium } = require('playwright')
const path = require('path')
;(async () => {
  const EXTENSION_PATH = path.resolve('./ext')
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
      `--load-extension=${EXTENSION_PATH}`,
      `--allow-insecure-localhost`, // to make sure that we can communicate to local wss
    ],
  })

  const page = await context.newPage()
  await page.goto('https://google.com/', { waitUntil: `networkidle` })
  const frames = await page.mainFrame().childFrames()
  console.log('frames.length', frames.length) // frame is visible
})()
