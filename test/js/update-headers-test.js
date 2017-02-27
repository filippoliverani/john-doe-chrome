var expect = require('chai').expect;
var updateHeaders = require('../../src/js/update-headers.js');

describe('updateHeaders', function () {
  it('replaces Accept header value', function () {
    var header = {
      name: 'Accept',
      value: 'application/private'
    };

    var updatedHeaders = updateHeaders([header]);
    expect(updatedHeaders[0].value).to.equal('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
  });

  it('replaces Accept-Encoding header value', function () {
    var header = {
      name: 'Accept-Encoding',
      value: 'privateencoding'
    };

    var updatedHeaders = updateHeaders([header]);
    expect(updatedHeaders[0].value).to.equal('gzip, deflate');
  });

  it('replaces User-Agent header value', function () {
    var header = {
      name: 'User-Agent',
      value: 'Privatezilla/1.0'
    };
    var userAgent = 'Correctzilla/1.0'

    var updatedHeaders = updateHeaders([header], 'unused_url', userAgent);
    expect(updatedHeaders[0].value).to.equal(userAgent);
  });

  it('replaces Referer header value', function () {
    var header = {
      name: 'Referer',
      value: 'http://private.url'
    };
    var url = 'http://another.url';

    var updatedHeaders = updateHeaders([header], url);
    expect(updatedHeaders[0].value).to.equal(url);
  });
});
