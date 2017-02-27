var expect = require('chai').expect;
var jsdom = require('jsdom');
var updateDocument = require('../../src/js/update-document.js');

describe('updateDocument', function () {
  var userAgent = 'Correctzilla/1.0'

  it('updates navigator attributes', function () {
    var doc = jsdom.jsdom();

    updateDocument(doc, userAgent);

    var win = doc.defaultView
    expect(win.navigator.userAgent).to.equal(userAgent);
    expect(win.navigator.platform).to.equal('Win32');
  });

  it('updates canvas attributes', function () {
    var doc = jsdom.jsdom('<canvas id="canvas" width="5" height="5"/>');

    updateDocument(doc, userAgent);

    var canvas = doc.getElementById('canvas');
    expect(canvas.toDataURL()).to.equal('');
  });

  it('updates CSS attributes', function () {
    var doc = jsdom.jsdom('<span id="span"/>');

    updateDocument(doc, userAgent);

    var span = doc.getElementById('span');
    span.style.fontFamiliy = 'Test Font Name';

    expect(span.style.fontFamily).to.equal('');
  });
});
