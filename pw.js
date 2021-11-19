const { chromium } = require('playwright-chromium')
const path = require('path')
;(async () => {
  const EXTENSION_PATH = path.resolve('./ext')
  const context = await chromium.launchPersistentContext(`userDataDir`, {
    defaultViewport: null,
    headless: false,
    timeout: 0,
    devtools: true,
    args: [
      `--load-extension=${EXTENSION_PATH}`,
      `--disable-extensions-except=${EXTENSION_PATH}`,
    ],
  })

  let [backgroundPage] = context.backgroundPages()
  if (!backgroundPage) {
    backgroundPage = await context.waitForEvent('backgroundpage')
  }

  const page = await context.newPage()
  await page.goto(`chrome://inspect/#extensions`)
  await page.click(`#extensions-list > div > div > div > div.actions > span`)

  await page.goto('https://google.com/', { waitUntil: `networkidle` })

  backgroundPage.waitForEvent(`request`, console.log)
  backgroundPage.waitForEvent(`requestfailed`, console.log)
  backgroundPage.waitForEvent(`requestfinished`, console.log)

  const [response] = await Promise.all([
    backgroundPage.waitForResponse(() => true, { timeout: 15 * 1000 }),
    page.click('#injectedButton', { timeout: 15 * 1000 }),
  ])
  console.log('response', response)
})()

process.on(`unhandledRejection`, console.log)
