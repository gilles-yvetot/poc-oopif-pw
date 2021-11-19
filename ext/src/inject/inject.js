const button = document.createElement('button')
button.innerText = 'Click me'
button.id = `injectedButton`
button.onclick = () => chrome.runtime.sendMessage({})
document.documentElement.appendChild(button)
