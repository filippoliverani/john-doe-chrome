let userAgent = navigator.userAgent;

chrome.storage.sync.get('userAgent', function (storage) {
  userAgent = storage.userAgent;
});

chrome.storage.sync.get('settings', function (storage) {
  const settings = storage.settings;
  if (!settings || !settings.enabled) return;

  updateContent(document, userAgent);
});
