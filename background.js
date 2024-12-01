// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Auto Login Extension Installed');
});

// Listener to handle messages (e.g., saving credentials)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveCredentials') {
    const { username, password } = message.credentials;

    // Save credentials to Chrome storage
    chrome.storage.sync.set({ username, password }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving credentials:", chrome.runtime.lastError);
        sendResponse({ status: "error", message: chrome.runtime.lastError.message });
      } else {
        console.log("Credentials saved successfully");
        sendResponse({ status: "success" });
      }
    });
    return true; // Keeps the message channel open for async response
  }
});

// Removed the `chrome.cookies.onChanged` listener since it's not supported in Manifest V3
