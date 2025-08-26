document.addEventListener('DOMContentLoaded', function () {
    const manifestData = chrome.runtime.getManifest();
    document.getElementById('version-text').textContent = `v${manifestData.version}`;

    const toggle = document.getElementById('auto-login-toggle');
    const linksList = document.getElementById('links-list');
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    const form = document.getElementById('credentials-form');
    const editLinksBtn = document.getElementById('edit-links-btn');
    const rightPanel = document.querySelector('.right-panel');

    const defaultLinks = [
        { name: 'UMS Portal', url: 'https://ums.lpu.in/lpuums' },
        { name: 'Placement Portal', url: 'https://ums.lpu.in/Placements' }
    ];

    function displayLinks(links) {
        linksList.innerHTML = ''; // Clear existing list
        links.forEach((link, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <a href="${link.url}" target="_blank">${link.name}</a>
                <span class="delete-icon" data-index="${index}">&times;</span>
            `;
            linksList.appendChild(linkItem);
        });

        // Re-add delete listeners to the new icons
        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                chrome.storage.sync.get({ importantLinks: [] }, function(data) {
                    let currentLinks = data.importantLinks;
                    currentLinks.splice(index, 1); // Remove the element
                    chrome.storage.sync.set({ importantLinks: currentLinks }, function() {
                        displayLinks(currentLinks); // Re-render the updated list
                    });
                });
            });
        });
    }

    // --- Initialization and Data Loading Logic ---
    chrome.storage.sync.get(['autoLoginEnabled', 'username', 'password', 'importantLinks'], function (data) {
        toggle.checked = !!data.autoLoginEnabled;
        if (data.username) document.getElementById('username').value = data.username;
        if (data.password) document.getElementById('password').value = data.password;

        if (data.importantLinks === undefined) {
            chrome.storage.sync.set({ importantLinks: defaultLinks }, function() {
                displayLinks(defaultLinks);
            });
        } else {
            displayLinks(data.importantLinks);
        }
    });

    // --- Event Listeners ---

    toggle.addEventListener('change', function () {
        chrome.storage.sync.set({ autoLoginEnabled: this.checked });
    });

    // Add new link
    document.getElementById('add-link').addEventListener('click', function() {
        const name = nameInput.value.trim();
        let url = urlInput.value.trim(); 

        if (name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            chrome.storage.sync.get({ importantLinks: [] }, function(data) {
                const links = data.importantLinks;
                links.push({ name, url }); 
                chrome.storage.sync.set({ importantLinks: links }, function() {
                    displayLinks(links);
                    nameInput.value = '';
                    urlInput.value = '';
                });
            });
        }
    });

    // Save credentials
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        chrome.storage.sync.set({ username, password }, function () {
            const saveButton = document.getElementById('save');
            saveButton.textContent = 'Saved!';
            setTimeout(() => { saveButton.textContent = 'Save Credentials'; }, 1500);
        });
    });

    // --- EDIT MODE Functionality ---
    editLinksBtn.addEventListener('click', function() {
        rightPanel.classList.toggle('edit-mode');
        if (rightPanel.classList.contains('edit-mode')) {
            this.textContent = 'Done';
            this.classList.add('active');
        } else {
            this.textContent = 'Edit';
            this.classList.remove('active');
        }
    });
});