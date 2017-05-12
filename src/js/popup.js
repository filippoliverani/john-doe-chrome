var settings = {};

function load() {
  chrome.storage.sync.get('settings', function(storage) {
    settings = storage.settings || {};

    var enable = document.getElementById('enabled');
    enabled.checked = settings.enabled;
    enabled.addEventListener('click', setEnabled);

    var browsingData = document.getElementById('browsing-data');
    browsingData.addEventListener('click', clearBrowsingData);

    var privacy = document.getElementById('privacy');
    privacy.addEventListener('click', enforcePrivacy);
  });
};

function clearBrowsingData() {
  chrome.browsingData.remove(
    {since: 0},
    {
      "appcache": true,
      "cache": true,
      "downloads": true,
      "fileSystems": true,
      "formData": true,
      "history": true,
      "indexedDB": true,
      "localStorage": false,
      "pluginData": true,
      "webSQL": true
    }
  );
};

function enforcePrivacy() {
  chrome.privacy.network.networkPredictionEnabled = false;

  chrome.privacy.services.alternateErrorPagesEnabled = false;
  chrome.privacy.services.autofillEnabled = false;
  chrome.privacy.services.hotwordSearchEnabled = false;
  chrome.privacy.services.passwordSavingEnabled = false;
  chrome.privacy.services.safeBrowsingEnabled = false;
  chrome.privacy.services.safeBrowsingExtendedReportingEnabled = false;
  chrome.privacy.services.searchSuggestEnabled = false;
  chrome.privacy.services.spellingServiceEnabled = false;
  chrome.privacy.services.translationServiceEnabled = false;

  chrome.privacy.websites.thirdPartyCookiesAllowed = false;
  chrome.privacy.websites.hyperlinkAuditingEnabled = false;
};

function setEnabled(event) {
  settings.enabled = this.checked;
  saveSettings();
};

function saveSettings() {
  chrome.storage.sync.set({'settings': settings});
  chrome.extension.sendMessage({settingsUpdated: true});
};

document.addEventListener('DOMContentLoaded', load);
