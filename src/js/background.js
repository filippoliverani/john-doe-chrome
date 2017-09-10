const chromeVersion = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/)[2];
const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
let settings = {};

function loadSettings() {
  chrome.storage.sync.get('settings', (storage) => {
    settings = storage.settings;
  });
}

function beforeSendHeaders(details) {
  if (!settings || !settings.enabled) return {};

  const updatedHeaders = updateHeaders(details.requestHeaders, details.url, details.frameId, userAgent);
  return { requestHeaders: updatedHeaders };
}

function beforeRequest(details) {
  if (!settings || !settings.enabled) return {};

  const url = details.url;
  const updatedUrl = updateUrl(url);
  if (updatedUrl === url) return {};

  return { redirectUrl: updatedUrl };
}

chrome.storage.sync.set({ userAgent: userAgent });

loadSettings();

chrome.extension.onMessage.addListener((request) => {
  if (request.settingsUpdated) loadSettings();
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  beforeSendHeaders,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
);

chrome.webRequest.onBeforeRequest.addListener(
  beforeRequest,
  { urls: ['<all_urls>'] },
  ['blocking']
);

