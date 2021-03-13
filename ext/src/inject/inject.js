chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      debugger
      const iframe = document.createElement(`iframe`)
      iframe.src = 'https://playwright.dev/'
      iframe.id = 'myFrame'
      Object.assign(iframe.style, {
        position: `absolute`,
        top: 0,
        left: 0,
        width: 500,
        height: 500,
      })
      document.documentElement.appendChild(iframe)
    }
  }, 10)
})
