
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('auto-login-toggle');

  chrome.storage.sync.get(['autoLoginEnabled'], function (data) {
      if (data.autoLoginEnabled) {
          toggle.checked = true;
      } else {
          toggle.checked = false;
      }
  });


  toggle.addEventListener('change', function () {
      const isChecked = toggle.checked;
      chrome.storage.sync.set({ autoLoginEnabled: isChecked });
    
  });


  const form = document.getElementById('credentials-form');
  form.addEventListener('submit', function (e) {
      e.preventDefault();  // Prevent form submission
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      chrome.storage.sync.set({ username, password }, function () {
          alert('Credentials saved!');
      });
  });
});
