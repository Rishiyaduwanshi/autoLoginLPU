chrome.storage.sync.get(['autoLoginEnabled', 'username', 'password'], function (data) {
  const isAutoLoginEnabled = data.autoLoginEnabled || false;
  const savedUsername = data.username || '';
  const savedPassword = data.password || '';

  if (isAutoLoginEnabled && savedUsername && savedPassword) {

    function autofillAndSubmit(formSelectors) {
      const { usernameSelector, passwordSelector, formSelector, submitButtonSelector, errorSelector } = formSelectors;

      const usernameField = document.querySelector(usernameSelector);
      const passwordField = document.querySelector(passwordSelector);
      const errorElement = errorSelector ? document.querySelector(errorSelector) : null;
      const error = errorElement ? errorElement.innerText : '';

      if (usernameField && passwordField) {
        usernameField.value = savedUsername;
        passwordField.value = savedPassword;

        const form = document.querySelector(formSelector) || document.querySelector(formSelectors.anotherFormSelector); 
        const submitButton = document.querySelector(submitButtonSelector);

        try {
          if (form && !error) {
            if (submitButton) {
              submitButton.click();
              console.log("Form submitted for:", window.location.hostname);
            } else {
              form.submit();
            }
          } else {
            console.log("Login failed due to error:", error);
          }

        } catch (err) {
          console.log("Something went wrong...", err);
        }


      }
    }

    const url = window.location.hostname;
    if (url.includes("ums.lpu.in") || url.includes('ums.lpu.in/LoginNew.aspx')) {
      autofillAndSubmit({
        usernameSelector: 'input[name="txtU"]',
        passwordSelector: 'input[name="TxtpwdAutoId_8767"]',
        formSelector: 'form[action="./LoginNew.aspx"]',
        anotherFormSelector :  'form[action="./"]',
        submitButtonSelector: 'input[type="submit"]',
        errorSelector: '#swal2-html-container'
      });
    } else if (url.includes("lpulive.lpu.in")) {
      autofillAndSubmit({
        usernameSelector: 'input[name="LoginId"]',
        passwordSelector: 'input[name="password"]',
        formSelector: 'form[action="/login"]',
        submitButtonSelector: 'input[type="submit"]'
      });
    } else if (url.includes("oas.lpu.in")) {
      autofillAndSubmit({
        usernameSelector: 'input[name="LoginId"]',
        passwordSelector: 'input[name="Password"]',
        formSelector: 'form[action="/Home/NewLoginMethod"]',
        submitButtonSelector: 'input[type="submit"]',
        errorSelector: '.alert.alert-danger'
      });
    }
  } else {
    console.log("Auto-login is either disabled or invalid credentials");
  }
});
