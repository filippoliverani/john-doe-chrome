const display = {
  width: 1366,
  height: 768,
  depth: 24
};
let script = '';

function defineGetter(object, name, returnValue) {
  script += `Object.defineProperty(${object}, '${name}', { get: function() { return ${returnValue}; } });`;
}

function updateCanvas() {
  script += "HTMLCanvasElement.prototype.toDataURL = function() {return '';};";
}

function updateStyleDeclaration() {
  script += "Object.defineProperty(CSSStyleDeclaration.prototype, 'fontFamily', { set: function() {} });";
}

function updateTimezone() {
  script += 'Date.prototype.getTimezoneOffset = function() {return 0;};';
}

function updateDocument(url) {
  script += `window.document.__defineGetter__('referrer', function() {return '${url}';});\n`;
}

function updateHistory() {
  script += "History.prototype.__defineGetter__('length', function() {return 0;});\n";
}

function resetScript() {
  script = '';
}

function updateScreen() {
  defineGetter('screen', 'height', display.height);
  defineGetter('screen', 'width', display.width);
  defineGetter('screen', 'colorDepth', display.depth);
  defineGetter('screen', 'pixelDepth', display.depth);
  defineGetter('screen', 'availLeft', 0);
  defineGetter('screen', 'availTop', 0);
  defineGetter('screen', 'availHeight', display.height);
  defineGetter('screen', 'availWidth', display.width);
}

function updateWindow() {
  defineGetter('window', 'outerHeight', display.height);
  defineGetter('window', 'outerWidth', display.width);
  defineGetter('window', 'innerHeight', display.height);
  defineGetter('window', 'innerWidth', display.width);
  defineGetter('window', 'screenX', 0);
  defineGetter('window', 'screenY', 0);
}

function updateNavigator(userAgent) {
  defineGetter('window.navigator', 'userAgent', `'${userAgent}'`);
  defineGetter('window.navigator', 'appName', "''");
  defineGetter('window.navigator', 'appCodeName', "''");
  defineGetter('window.navigator', 'appVersion', "''");
  defineGetter('window.navigator', 'languages', '[]');
  defineGetter('window.navigator', 'mimeTypes', '[]');
  defineGetter('window.navigator', 'platform', "'Win32'");
  defineGetter('window.navigator', 'plugins', '[]');
  defineGetter('window.navigator', 'product', "''");
  defineGetter('window.navigator', 'productSub', "''");
  defineGetter('window.navigator', 'vendor', "''");
}

function createScript(userAgent, url) {
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
}

function updateContent(doc, userAgent) {
  const documentElement = (doc.head || doc.documentElement);
  const scriptElement = doc.createElement('script');

  scriptElement.textContent = createScript(userAgent, doc.URL);
  documentElement.insertBefore(scriptElement, documentElement.firstChild);
  scriptElement.parentNode.removeChild(scriptElement);
}

if (typeof module !== 'undefined') {
  module.exports = updateContent;
}
