# LPU Auto Login Extension

This Chrome extension automatically logs into LPU portals (such as [UMS](https://ums.lpu.in/), [LPU Live](https://lpulive.lpu.in/), and [OAS](https://oas.lpu.in/)) by saving the username and password, making the login process easier and faster for users.

## Features

- Automatically fills in the username and password fields on supported LPU portals.
- Saves your credentials securely in Chrome's sync storage (works across devices if signed in to the same Google account).
- Easy installation from the [GitHub Releases](https://github.com/Rishiyaduwanshi/autoLoginLPU/releases) page.

## Installation

1. Visit the [GitHub Releases](https://github.com/Rishiyaduwanshi/autoLoginLPU/releases) page.
2. Download the latest `.zip` file containing the extension.
3. Extract the contents of the `.zip` file.
4. Go to `chrome://extensions/` in your Chrome browser.
5. Enable "Developer mode" (top right).
6. Click "Load unpacked" and select the folder where you extracted the extension files.
7. Once installed, the extension will appear in your browser toolbar.

### Quick Download Button

If you want to quickly download the latest release, click the button below:

<a href="https://github.com/rishiyaduwanshi/autoLoginLPU/releases/download/v1.0/extension.zip" target="_blank">
  <img src="https://img.shields.io/badge/Download-Extension-brightgreen" alt="Download Extension"/>
</a>

**Note:** This extension is currently available for download via GitHub. Once it’s live on the Chrome Web Store, you’ll be able to install it directly from there.

## Usage

1. After installation, click on the extension icon in the Chrome toolbar.
2. Enter your LPU portal credentials (username and password) and click "Save".
3. The extension will automatically fill your credentials on the login page of supported LPU portals when you visit them.

## Permissions

This extension requires the following permissions:

- **Storage**: To save your credentials securely in Chrome's sync storage.
- **ActiveTab**: To interact with the current active tab and auto-fill login details.
- **Scripting**: To inject scripts into LPU portal pages for auto-filling.
- **Host Permissions**: This allows the extension to interact with the LPU portals (e.g., `ums.lpu.in`, `lpulive.lpu.in`, `oas.lpu.in`).

## Privacy

Your credentials are stored securely using Chrome's sync storage. They are only accessible to the extension and are not shared with third parties.

**Note:** Ensure you only use this extension on trusted machines and networks.

## Contributing

Feel free to open an issue or create a pull request if you want to improve the extension.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
