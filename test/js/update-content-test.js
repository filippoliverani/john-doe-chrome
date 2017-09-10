const expect = require('chai').expect;
const jsdom = require('jsdom');
const updateDocument = require('../../src/js/update-content.js');

describe('updateContent', function () {
  var userAgent = 'Correctzilla/1.0'

  it('updates history attributes', function () {
    const doc = jsdom.jsdom();

    updateDocument(doc, userAgent);

    const win = doc.defaultView
    expect(win.history.length).to.equal(0);
  });

  it('updates navigator attributes', function () {
    const doc = jsdom.jsdom();

    updateDocument(doc, userAgent);

    const win = doc.defaultView;
    expect(win.navigator.userAgent).to.equal(userAgent);
    expect(win.navigator.platform).to.equal('Win32');
    expect(win.navigator.mimeTypes).to.deep.equal([]);
    expect(win.navigator.languages).to.deep.equal([]);
  });

  it('updates canvas attributes', function () {
    const doc = jsdom.jsdom('<canvas id="canvas" width="5" height="5"/>');

    updateDocument(doc, userAgent);

    const canvas = doc.getElementById('canvas');
    expect(canvas.toDataURL()).to.equal('');
  });

  it('updates CSS attributes', function () {
    const doc = jsdom.jsdom('<span id="span"/>');

    updateDocument(doc, userAgent);

    const span = doc.getElementById('span');
    span.style.fontFamiliy = 'Test Font Name';

    expect(span.style.fontFamily).to.equal('');
  });
});
