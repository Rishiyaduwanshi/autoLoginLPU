
chrome.runtime.onInstalled.addListener(() => {
  console.log('Auto Login Extension Installed');
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveCredentials') {
    const { username, password } = message.credentials;

    
    chrome.storage.sync.set({ username, password }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving credentials:", chrome.runtime.lastError);
        sendResponse({ status: "error", message: chrome.runtime.lastError.message });
      } else {
        console.log("Credentials saved successfully");
        sendResponse({ status: "success" });
      }
    });
    return true; 
  }
});

