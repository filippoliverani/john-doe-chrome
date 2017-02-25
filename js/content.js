var userAgent = navigator.userAgent;

chrome.storage.sync.get('userAgent', function(storage) {
  userAgent = storage.userAgent;
});

chrome.storage.sync.get('settings', function(storage) {
  settings = storage.settings;
  if (!settings || !settings.enabled) return;

  updateContent();
});

var updateContent = function() {
  var script = secureDom(userAgent);

  var scriptElement = document.createElement('script');
  scriptElement.textContent = script
  var doc = (document.head || document.documentElement);
  doc.insertBefore(scriptElement, doc.firstChild);
  scriptElement.parentNode.removeChild(scriptElement);
};
