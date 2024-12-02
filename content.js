chrome.storage.sync.get(['autoLoginEnabled', 'username', 'password', 'autoLoginAttempts'], function (data) {
    const isAutoLoginEnabled = data.autoLoginEnabled || false;
    const savedUsername = data.username || '';
    const savedPassword = data.password || '';
    let autoLoginAttempts = data.autoLoginAttempts || 0;

    if (autoLoginAttempts >= 2) {
        chrome.storage.sync.set({ autoLoginAttempts: 0 });
        alert('Saved credentials are incorrect. Please update them in the extension settings.');
        return; 
    }

    if (isAutoLoginEnabled && savedUsername && savedPassword) {

        autoLoginAttempts++;
        chrome.storage.sync.set({ autoLoginAttempts: autoLoginAttempts });
        
        function autofillAndSubmit(formSelectors) {
            const { usernameSelector, passwordSelector, formSelector, submitButtonSelector } = formSelectors;
            const usernameField = document.querySelector(usernameSelector);
            const passwordField = document.querySelector(passwordSelector);

            if (usernameField && passwordField) {
                usernameField.value = savedUsername;
                passwordField.value = savedPassword;

                const form = document.querySelector(formSelector);
                const submitButton = document.querySelector(submitButtonSelector);

                if (form) {
                    if (submitButton) {
                        submitButton.click();
                        console.log("Form submitted for:", window.location.hostname);
                    } else {
                        form.submit();
                    }
                }
            }
        }

        const url = window.location.hostname;
        if (url.includes("ums.lpu.in") || url.includes('ums.lpu.in/LoginNew.aspx')) {
            autofillAndSubmit({
                usernameSelector: 'input[name="txtU"]',
                passwordSelector: 'input[name="TxtpwdAutoId_8767"]',
                formSelector: 'form[action="./LoginNew.aspx"]',
                submitButtonSelector: 'input[type="submit"]'
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
                submitButtonSelector: 'input[type="submit"]'
            });
        }
    } else {
        console.log("Auto-login is either disabled, invalid credentials");
    }
});
