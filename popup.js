document.getElementById('save').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    chrome.runtime.sendMessage(
      {
        action: 'saveCredentials',
        credentials: { username, password }
      },
      function(response) {
        if (response.status === "success") {
          alert('Credentials Saved!');
        } else {
          alert('Error saving credentials');
        }
      }
    );
  });
  


