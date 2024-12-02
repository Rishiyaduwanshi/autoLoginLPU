chrome.storage.sync.get(['autoLoginEnabled', 'username', 'password'], function (data) {

    const isAutoLoginEnabled = data.autoLoginEnabled || false;
    const username = data.username || '';
    const password = data.password || '';

    if (isAutoLoginEnabled && username && password) {
        function autofillAndSubmit(formSelectors) {
            const { usernameSelector, passwordSelector, formSelector, submitButtonSelector } = formSelectors;

            const usernameField = document.querySelector(usernameSelector);
            const passwordField = document.querySelector(passwordSelector);

            if (usernameField && passwordField) {
                usernameField.value = username;
                passwordField.value = password;

                const form = document.querySelector(formSelector);
                const submitButton = document.querySelector(submitButtonSelector);

                if (form) {
                    
                    if (submitButton) {
                        submitButton.click();
                        console.log("Form submitted for:", window.location.hostname);
                        location.reload();
                    } else {
                        form.submit();
                        console.log("Form submitted directly for:", window.location.hostname);
                        location.reload();
                    }
                }
            }
        }

        const url = window.location.hostname;
        if (url.includes("ums.lpu.in")) {
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
    }
});
