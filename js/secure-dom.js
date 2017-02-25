var script = '';

var secureDom = function(userAgent) {
  resetScript();

  updateNavigator(userAgent);
  updateWindow();
  updateCanvas();
  updateStyleDeclaration();

  return script;
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
