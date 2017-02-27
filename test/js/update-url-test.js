var expect = require('chai').expect;
var updateUrl = require('../../src/js/update-url.js');

describe('updateUrl', function () {
  it('leaves url unchanged when no query string parameters are present', function () {
    var url = 'http://test.url/test-path';

    expect(updateUrl(url)).to.equal('http://test.url/test-path');
  });

  it('leaves url unchanged when no unwanted string parameters are present', function () {
    var url = 'http://test.url/test-path?key1=value1&key2=value2';

    expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
  });

  it('removes unwanted query string parameters', function () {
    var url = 'http://test.url/test-path?key1=value1&utm_source=source&key2=value2&utm_campaign=campaign';

    expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
  });

  it('removes unwanted first query string parameter', function () {
    var url = 'http://test.url/test-path?utm_source=source&utm_campaign=source&key1=value1&key2=value2';

    expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
  });
});
