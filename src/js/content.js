var userAgent = navigator.userAgent;

chrome.storage.sync.get('userAgent', function(storage) {
  userAgent = storage.userAgent;
});

chrome.storage.sync.get('settings', function(storage) {
  settings = storage.settings;
  if (!settings || !settings.enabled) return;

  updateDocument(document, userAgent);
});
