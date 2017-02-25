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

  updateNavigator();
  updateWindow();
  updateCanvas();
  updateStyleDeclaration();

  insertScript();
};

var updateNavigator = function() {
  updateNavigatorGetter('userAgent', userAgent);
  updateNavigatorGetter('appName', '');
  updateNavigatorGetter('appCodeName', '');
  updateNavigatorGetter('appVersion', '');
  updateNavigatorGetter('languages', []);
  updateNavigatorGetter('mimeTypes', []);
  updateNavigatorGetter('platform', 'Win32');
  updateNavigatorGetter('plugins', []);
  updateNavigatorGetter('product', '');
  updateNavigatorGetter('productSub', '');
  updateNavigatorGetter('vendor', '');
};

var updateNavigatorGetter = function(name, returnValue) {
  script += "window.navigator.__defineGetter__('" + name + "', function() {return '" + returnValue + "';});\n";
};

var updateWindow = function() {
  script += "window.__defineGetter__('name', function() {return '';});\n";
  script += "window.__defineSetter__('name', function() {});\n";
};

var updateCanvas = function() {
  script += "HTMLCanvasElement.prototype.toDataURL = function() {return '';};\n";
};

var updateStyleDeclaration = function() {
  script += "CSSStyleDeclaration.prototype.__defineSetter__('fontFamily', function() {});\n";
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
