const toBeRemoved = /([\?\&]utm_(([_a-z0-9=]+))=[^&#]+)/ig;

function updateUrl(url) {
  var queryStringIndex = url.indexOf('?');
  if (queryStringIndex < 0) return url;

  var updatedUrl = url.replace(toBeRemoved, '');;
  if (updatedUrl.indexOf('&') == queryStringIndex) {
    updatedUrl = updatedUrl.replace('&', '?');
  }

  return updatedUrl;
};

if (typeof module !== 'undefined') {
  module.exports = updateUrl;
}
