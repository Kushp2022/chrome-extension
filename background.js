// background.js
// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'authenticate') {
    const oauthConfig = {
      client_id: '829182872582-iecgs7mllhf51n6egq5qh7ajf57quaul.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    };

    // Define the redirect_uri for Chrome Extensions
    const redirect_uri = 'chrome-extension://knaphlegmfbnmpanbdplkjgkpmffnkca/index.html';
    
    // Create the OAuth URL with the correct redirect_uri
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${oauthConfig.client_id}&scope=${oauthConfig.scopes.join(' ')}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}`;

    // Open the OAuth consent page in a new tab
    chrome.tabs.create({ url: authUrl, active: true }, (tab) => {
      // Listen for changes to the tab's URL
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
        if (tabId === tab.id && changeInfo.url && changeInfo.url.startsWith(redirect_uri)) {
          const params = new URLSearchParams(changeInfo.url.split('#')[1]);
          const accessToken = params.get('access_token');
          const tokenType = params.get('token_type');

          // Save the access token securely using chrome.storage
          chrome.storage.local.set({ 'access_token': accessToken }, () => {
            if (chrome.runtime.lastError) {
              // Handle storage error if needed
              console.error(chrome.runtime.lastError);
            } else {
              // Access token is saved securely
              console.log('Access token saved securely.');
            }
          });

          // Send a message to the popup or content script indicating successful authorization
          chrome.runtime.sendMessage({ type: 'authorizationSuccess' });

          // Close the tab when authorization is complete (optional)
          chrome.tabs.remove(tabId);
        }
      });
    });
  }
});

// Handle the callback when the user authorizes your extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});
