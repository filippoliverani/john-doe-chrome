var userAgent = '';
var script = '';

chrome.storage.sync.get('userAgent', function(storage) {
  userAgent = storage.userAgent;
});

chrome.storage.sync.get('settings', function(storage) {
  settings = storage.settings;
  if (!settings || !settings.enabled) return;

  update();
});

var update = function() {
  resetScript();

  appendNavigatorGetter('userAgent', userAgent);
  appendNavigatorGetter('appName', '');
  appendNavigatorGetter('appCodeName', '');
  appendNavigatorGetter('appVersion', '');
  appendNavigatorGetter('languages', []);
  appendNavigatorGetter('platform', '');
  appendNavigatorGetter('plugins', []);
  appendNavigatorGetter('product', '');
  appendNavigatorGetter('productSub', '');
  appendNavigatorGetter('vendor', '');
  appendGetter('window', 'name', '');
  appendSetter('window', 'name');

  insertScript();
};

var appendNavigatorGetter = function(name, returnValue) {
  script += "window.navigator.__defineGetter__('" + name + "', function() {return '" + returnValue + "';});\n";
};

var appendGetter = function(name, returnValue) {
  script += "window.__defineGetter__('" + name + "', function() {return '" + returnValue + "';});\n";
};

var appendSetter = function(name) {
  script += "window.__defineSetter__('" + name + "', function() {} );\n";
};

var resetScript = function() {
  script = '';
};

var insertScript = function() {
  var scriptElement = document.createElement('script');
  scriptElement.textContent = script
  var doc = (document.head || document.documentElement);
  doc.insertBefore(scriptElement, doc.firstChild);
  scriptElement.parentNode.removeChild(scriptElement);
};
