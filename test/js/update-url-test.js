const expect = require('chai').expect;
const updateUrl = require('../../src/js/update-url.js');

describe('updateUrl', function () {
  describe('clean url', function () {
    it('leaves url unchanged when no query string parameters are present', function () {
      const url = 'http://test.url/test-path';

      expect(updateUrl(url)).to.equal('http://test.url/test-path');
    });

    it('leaves url unchanged when no unwanted string parameters are present', function () {
      const url = 'http://test.url/test-path?key1=value1&key2=value2';

      expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
    });

    it('removes unwanted query string parameters', function () {
      const url = 'http://test.url/test-path?key1=value1&utm_source=source&key2=value2&utm_campaign=campaign';

      expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
    });

    it('removes unwanted first query string parameter', function () {
      const url = 'http://test.url/test-path?utm_source=source&utm_campaign=source&key1=value1&key2=value2';

      expect(updateUrl(url)).to.equal('http://test.url/test-path?key1=value1&key2=value2');
    });
  });

  describe('update search', function () {
    it('changes to non redirecting url when url is a google search', function () {
      const url = 'https://www.google.com/search?q=test+search';

      expect(updateUrl(url)).to.equal('https://encrypted.google.com/search?q=test+search');
    });

    it('removes google search unwanted query string parameters', function () {
      const url = 'https://www.google.com/search?q=test+search&aqs=chrome..42&sourceid=chrome';

      expect(updateUrl(url)).to.equal('https://encrypted.google.com/search?q=test+search');
    });
  });
});
