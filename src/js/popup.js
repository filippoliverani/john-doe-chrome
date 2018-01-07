const enabledIconPath = '../images/small.png';
const disabledIconPath = '../images/small-disabled.png';
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
  chrome.privacy.network.networkPredictionEnabled.set({ value: false });

  chrome.privacy.services.alternateErrorPagesEnabled.set({ value: false });
  chrome.privacy.services.autofillEnabled.set({ value: false });
  chrome.privacy.services.hotwordSearchEnabled.set({ value: false });
  chrome.privacy.services.passwordSavingEnabled.set({ value: false });
  chrome.privacy.services.safeBrowsingEnabled.set({ value: false });
  chrome.privacy.services.safeBrowsingExtendedReportingEnabled.set({ value: false });
  chrome.privacy.services.searchSuggestEnabled.set({ value: false });
  chrome.privacy.services.spellingServiceEnabled.set({ value: false });
  chrome.privacy.services.translationServiceEnabled.set({ value: false });

  chrome.privacy.websites.thirdPartyCookiesAllowed.set({ value: false });
  chrome.privacy.websites.hyperlinkAuditingEnabled.set({ value: false });
}

function saveSettings() {
  chrome.storage.sync.set({ settings });
  chrome.extension.sendMessage({ settingsUpdated: true });
}

function setEnabled(event) {
  settings.enabled = event.srcElement.checked;
  saveSettings();

  const iconPath = settings.enabled ? enabledIconPath : disabledIconPath;
  chrome.browserAction.setIcon({ path: iconPath });
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
