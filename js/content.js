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

  updateNavigator('userAgent', userAgent);
  updateNavigator('appName', '');
  updateNavigator('appCodeName', '');
  updateNavigator('appVersion', '');
  updateNavigator('languages', []);
  updateNavigator('mimeTypes', []);
  updateNavigator('platform', 'Win32');
  updateNavigator('plugins', []);
  updateNavigator('product', '');
  updateNavigator('productSub', '');
  updateNavigator('vendor', '');
  updateWindow();
  updateCanvas();

  insertScript();
};

var updateNavigator = function(name, returnValue) {
  script += "window.navigator.__defineGetter__('" + name + "', function() {return '" + returnValue + "';});\n";
};

var updateWindow= function() {
  script += "window.__defineGetter__('name', function() {return '';});\n";
  script += "window.__defineSetter__('name', function() {} );\n";
};

var updateCanvas = function() {
  script += "HTMLCanvasElement.prototype.toDataURL = function() {return '';};\n";
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
