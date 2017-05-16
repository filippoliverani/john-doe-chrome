const toBeRemoved = /([\?\&](utm_|fb_|ref_|action_)([_a-z1-9=]+)|(feature|ref|fref|hc_location|yclid)=[^&#]+)/ig;

function updateUrl(url) {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex < 0) return url;

  let updatedUrl = url.replace(toBeRemoved, '');
  if (updatedUrl.indexOf('&') === queryStringIndex) {
    updatedUrl = updatedUrl.replace('&', '?');
  }

  return updatedUrl;
}

if (typeof module !== 'undefined') {
  module.exports = updateUrl;
}
