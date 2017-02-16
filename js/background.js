var settings = {};
var chromeVersion = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/)[2]
var userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + chromeVersion + ' Safari/537.36';

var loadSettings = function() {
  chrome.storage.sync.get('settings', function(storage) {
    settings = storage.settings;
  });
};

var updateHeaders = function(details) {
  if (!settings || !settings.enabled) return;

  var headers = [];
  for (var header of details.requestHeaders) {
    updateHeader(header, details.url);
    headers.push(header);
  }

  return {requestHeaders: headers};
};

var updateHeader = function(header, url) {
  switch (header.name) {
    case 'Accept':
      header.value = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
      break;
    case 'Accept-Encoding':
      header.value = 'gzip, deflate';
      break;
    case 'Accept-Language':
      header.value = 'en-US,en;q=0.5';
      break;
    case 'User-Agent':
      header.value = userAgent;
      break;
    case 'Referer':
      if (header.value && !url.includes(header.value)) header.value = url;
      break;
  }
};

chrome.storage.sync.set({'userAgent': userAgent});

loadSettings();

chrome.extension.onMessage.addListener(function(request) {
  if(request.settingsUpdated) loadSettings();
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  updateHeaders,
  {urls: ['<all_urls>']},
  ['blocking', 'requestHeaders']
);
