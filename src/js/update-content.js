var script = '';
var display = {
  width: 1366,
  height: 768,
  depth: 24
};

var updateContent = function(doc, userAgent) {
  var documentElement = (doc.head || doc.documentElement);
  var scriptElement = doc.createElement('script');

  scriptElement.textContent = createScript(userAgent, doc.URL);
  documentElement.insertBefore(scriptElement, documentElement.firstChild);
  scriptElement.parentNode.removeChild(scriptElement);
};

var createScript = function(userAgent, url) {
  resetScript();

  updateDocument(url);
  updateWindow();
  updateScreen();
  updateHistory();
  updateNavigator(userAgent);
  updateCanvas();
  updateStyleDeclaration();
  updateTimezone();

  return script;
};

var resetScript = function() {
  script = '';
};

var updateDocument = function(url) {
  script += "window.document.__defineGetter__('referrer', function() {return '" + url + "';});\n";
};

var updateHistory = function() {
  script += "History.prototype.__defineGetter__('length', function() {return 0;});\n";
};

var updateScreen = function() {
  defineGetter('screen', 'height', display.height);
  defineGetter('screen', 'width', display.width);
  defineGetter('screen', 'colorDepth', display.depth);
  defineGetter('screen', 'pixelDepth', display.depth);
  defineGetter('screen', 'availLeft', 0);
  defineGetter('screen', 'availTop', 0);
  defineGetter('screen', 'availHeight', display.height);
  defineGetter('screen', 'availWidth', display.width);
};

var updateWindow = function() {
  defineGetter('window', 'outerHeight', display.height);
  defineGetter('window', 'outerWidth', display.width);
  defineGetter('window', 'innerHeight', display.height);
  defineGetter('window', 'innerWidth', display.width);
  defineGetter('window', 'screenX', 0);
  defineGetter('window', 'screenY', 0);
  defineGetter('window', 'scrollX', 0);
  defineGetter('window', 'scrollY', 0);
};

var updateNavigator = function(userAgent) {
  defineGetter('window.navigator', 'userAgent', userAgent);
  defineGetter('window.navigator', 'appName', '');
  defineGetter('window.navigator', 'appCodeName', '');
  defineGetter('window.navigator', 'appVersion', '');
  defineGetter('window.navigator', 'languages', []);
  defineGetter('window.navigator', 'mimeTypes', []);
  defineGetter('window.navigator', 'platform', 'Win32');
  defineGetter('window.navigator', 'plugins', []);
  defineGetter('window.navigator', 'product', '');
  defineGetter('window.navigator', 'productSub', '');
  defineGetter('window.navigator', 'vendor', '');
};

var defineGetter = function(object, name, returnValue) {
  script += object + ".__defineGetter__('" + name + "', function() {return '" + returnValue + "';});\n";
};

var updateCanvas = function() {
  script += "HTMLCanvasElement.prototype.toDataURL = function() {return '';};\n";
};

var updateStyleDeclaration = function() {
  script += "CSSStyleDeclaration.prototype.__defineSetter__('fontFamily', function() {});\n";
};

var updateTimezone = function(url) {
  script += "Date.prototype.getTimezoneOffset = function() {return 0;};\n";
};

if (typeof module !== 'undefined') {
  module.exports = updateContent;
}
