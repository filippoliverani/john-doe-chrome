let settings = {};

function clearBrowsingData() {
  chrome.browsingData.remove(
    { since: 0 },
    {
      appcache: true,
      cache: true,
      downloads: true,
      fileSystems: true,
      formData: true,
      history: true,
      indexedDB: true,
      localStorage: false,
      pluginData: true,
      webSQL: true
    }
  );
}

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
}

function saveSettings() {
  chrome.storage.sync.set({ settings: settings });
  chrome.extension.sendMessage({ settingsUpdated: true });
}

function setEnabled(event) {
  settings.enabled = event.srcElement.checked;
  saveSettings();
}

function load() {
  chrome.storage.sync.get('settings', function (storage) {
    settings = storage.settings || {};

    const toggle = document.getElementById('toggle');
    if (settings.enabled) toggle.MaterialSwitch.on();
    toggle.addEventListener('change', setEnabled);

    const browsingData = document.getElementById('browsing-data');
    browsingData.addEventListener('click', clearBrowsingData);

    const privacy = document.getElementById('privacy');
    privacy.addEventListener('click', enforcePrivacy);
  });
}

document.addEventListener('DOMContentLoaded', load);
