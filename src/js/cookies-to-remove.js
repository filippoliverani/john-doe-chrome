function openUrls(windows) {
  return windows.reduce((winsUrls, win) =>
    winsUrls.concat(win.tabs.reduce((tabsUrls, tab) => {
      if (tab.url) tabsUrls.push(tab.url);
      return tabsUrls;
    }, []))
  , []);
}

function cookieInUse(domain, urls) {
  const host = domain.replace(/^\./, '');
  return urls.some(url => url.includes(host));
}

function urlFrom(cookie) {
  const prefix = cookie.secure ? 'https://' : 'http://';

  return prefix + cookie.domain + cookie.path;
}

function cookiesToRemove(windows, cookies) {
  const urlsInUse = openUrls(windows);
  return cookies.reduce((toRemove, cookie) => {
    if (!cookieInUse(cookie.domain, urlsInUse)) {
      toRemove.push({ url: urlFrom(cookie), name: cookie.name });
    }
    return toRemove;
  }, []);
}

if (typeof module !== 'undefined') {
  module.exports = cookiesToRemove;
}
