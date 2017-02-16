var settings = {};

var load = function() {
  chrome.storage.sync.get('settings', function(storage) {
    settings = storage.settings;

    var enforcePrivacy = document.getElementById('privacy');
    enforcePrivacy.addEventListener('click', enforcePrivacy);

    var enable = document.getElementById('enable');
    enabled.checked = settings.enabled || false;
    enabled.addEventListener('click', setEnabled);
  });
};

var enforcePrivacy = function() {
  chrome.privacy.network.networkPredictionEnabled = false;

  chrome.privacy.services.alternateErrorPagesEnabled = false;
  chrome.privacy.services.autofillEnabled = false;
  chrome.privacy.services.hotwordSearchEnabled = false;
  chrome.privacy.services.passwordSavingEnabled = false;
  chrome.privacy.services.safeBrowsingEnabled = false;
  chrome.privacy.services.searchSuggestEnabled = false;
  chrome.privacy.services.spellingServiceEnabled = false;
  chrome.privacy.services.translationServiceEnabled = false;

  chrome.privacy.websites.thirdPartyCookiesAllowed = false;
  chrome.privacy.websites.hyperlinkAuditingEnabled = false;
};

var setEnabled = function(event) {
  settings.enabled = this.checked;
  saveSettings();
};

var saveSettings = function() {
  chrome.storage.sync.set({'settings': settings});
  chrome.extension.sendMessage({settingsUpdated: true});
};

document.addEventListener('DOMContentLoaded', load);
