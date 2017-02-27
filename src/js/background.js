var settings = {};
var chromeVersion = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/)[2]
var userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + chromeVersion + ' Safari/537.36';

var loadSettings = function() {
  chrome.storage.sync.get('settings', function(storage) {
    settings = storage.settings;
  });
};

var beforeSendHeaders = function(details) {
  if (!settings || !settings.enabled) return;

  var updatedHeaders = updateHeaders(details.requestHeaders, details.url, userAgent);
  return {requestHeaders: updatedHeaders};
};

var beforeRequest = function(details) {
  if (!settings || !settings.enabled) return;

  var updatedUrl = updateUrl(details.url);
  return {redirectUrl: updatedUrl};
};

chrome.storage.sync.set({'userAgent': userAgent});

loadSettings();

chrome.extension.onMessage.addListener(function(request) {
  if(request.settingsUpdated) loadSettings();
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  beforeSendHeaders,
  {urls: ['<all_urls>']},
  ['blocking', 'requestHeaders']
);

chrome.webRequest.onBeforeRequest.addListener(
  beforeRequest,
  {urls: ['<all_urls>']},
  ['blocking']
);

