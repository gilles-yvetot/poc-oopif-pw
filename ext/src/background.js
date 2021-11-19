chrome.runtime.onMessage.addListener(() => {
  fetch(`https://google.com`).then(console.log).catch(console.error)
})
