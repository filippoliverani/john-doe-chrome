const expect = require('chai').expect;
const cookiesToRemove = require('../../src/js/cookies-to-remove.js');

describe('cookiesToRemove', function () {
  it('returns cookies to remove', function () {
    const tabs = [
      { url: 'https://www.first.com' },
      { url: 'http://m.second.com' }
    ];
    const windows = [{ tabs: tabs }, { tabs: tabs }];
    const cookies = [
      {
        domain: 'first.com',
        path: '/test',
        name: 'first',
      },
      {
        domain: 'another.com',
        path: '/test',
        name: 'another',
      }
    ];

    const expectedCookiesToRemove = [{ url: 'http://another.com/test', name: 'another' }];
    expect(cookiesToRemove(windows, cookies)).to.eql(expectedCookiesToRemove);
  });

  it('returns cookies to remove checking naked domains', function () {
    const tabs = [{ url: 'https://first.com' }];
    const windows = [{ tabs: tabs }];
    const cookies = [
      {
        domain: '.first.com',
        path: '/test',
        name: 'first',
      }
    ];

    expect(cookiesToRemove(windows, cookies)).to.be.empty
  });
});
