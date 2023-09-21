window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      console.log(token);
        // Make the fetch request inside the callback to use the obtained token
        fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              title: 'New Sheet Name',
            },
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Created new Google Sheets document:', data);
        })
        .catch(error => {
          console.error('Error creating Google Sheets document:', error);
        });
  });
  });
};
