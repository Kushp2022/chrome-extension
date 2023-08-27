// content.js

document.addEventListener('DOMContentLoaded', () => {
  const oauthButton = document.createElement('button');
  oauthButton.innerText = 'Authorize with Google';
  oauthButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'authenticate' });
  });

  // Append the button to the web page
  document.body.appendChild(oauthButton);
});
