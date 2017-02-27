var script = '';

var updateDocument = function(doc, userAgent) {
  var documentElement = (doc.head || doc.documentElement);
  var scriptElement = doc.createElement('script');

  scriptElement.textContent = createScript(userAgent);
  documentElement.insertBefore(scriptElement, documentElement.firstChild);
  scriptElement.parentNode.removeChild(scriptElement);
};

var createScript = function(userAgent) {
  resetScript();

  updateWindow();
  updateNavigator(userAgent);
  updateCanvas();
  updateStyleDeclaration();

  return script;
};

var resetScript = function() {
  script = '';
};

var updateNavigator = function(userAgent) {
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
  script += "window.__defineGetter__('name', function() {return 'peppino';});\n";
  script += "window.__defineSetter__('name', function() {});\n";
};

var updateCanvas = function() {
  script += "HTMLCanvasElement.prototype.toDataURL = function() {return '';};\n";
};

var updateStyleDeclaration = function() {
  script += "CSSStyleDeclaration.prototype.__defineSetter__('fontFamily', function() {});\n";
};

if (typeof module !== 'undefined') {
  module.exports = updateDocument;
}
