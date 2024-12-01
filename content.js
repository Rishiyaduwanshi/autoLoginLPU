
chrome.storage.sync.get(['username', 'password'], function (data) {
    const { username, password } = data;


    function autofillAndSubmit(formSelectors) {
        const { usernameSelector, passwordSelector, formSelector } = formSelectors;

        const usernameField = document.querySelector(usernameSelector);
        const passwordField = document.querySelector(passwordSelector);


        if (usernameField && passwordField) {
            usernameField.value = username;
            passwordField.value = password;

            console.log(usernameField.value);
            console.log(passwordField.value);

            const form = document.querySelector(formSelector);
            if (form) {
                form.submit();
                console.log("Form submitted for:", window.location.hostname);
            }
        }
    }

 
    const url = window.location.hostname;

    if (url.includes("ums.lpu.in")) {
        autofillAndSubmit({
            usernameSelector: 'input[name="txtU"]',
            passwordSelector: 'input[name="TxtpwdAutoId_8767"]',
            formSelector: 'form[action="./"]',
        });
    } else if (url.includes("lpulive.lpu.in")) {
        autofillAndSubmit({
            usernameSelector: 'input[name="LoginId"]',
            passwordSelector: 'input[name="password"]',
            formSelector: 'form[action="/login"]',
        });
    } else if (url.includes("oas.lpu.in")) {
        autofillAndSubmit({
            usernameSelector: 'input[name="LoginId"]',
            passwordSelector: 'input[name="Password"]',
            formSelector: 'form[action="/Home/NewLoginMethod"]',
        });
    }
});


