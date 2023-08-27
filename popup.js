// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const authorizeButton = document.querySelector('.authorize-button');
  authorizeButton.addEventListener('click', () => {
    // Trigger the OAuth flow
    chrome.runtime.sendMessage({ type: 'authenticate' });
  });

  // Listen for messages from your background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'authorizationSuccess') {
      // Authorization was successful, update the UI or perform other actions
      document.querySelector('#answer').textContent = 'Authorization successful!';
    }
  });
});
