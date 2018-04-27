const unwantedQueryString = /[\?\&]((utm_|fb_|ref_)([^=]+)|(action_object_map|action_type_map|action_ref_map|feature|fref|hc_location|hc_ref|yclid))=[^\&\#]+/ig;
const unwantedGoogleSearchQueryString = /([\?\&](aqs|sourceid)=[^&#]+)/ig;
const googleSearch = /http(s)?:\/\/(www\.)?google\..+\/search\?/;

function cleanUrl(url, toRemove) {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex < 0) return url;

  let cleanedUrl = url.replace(toRemove, '');
  if (cleanedUrl.indexOf('&') === queryStringIndex) {
    cleanedUrl = cleanedUrl.replace('&', '?');
  }

  return cleanedUrl;
}

function updateGoogleSearch(url) {
  const matches = url.match(googleSearch);
  if (!matches) return url;

  return cleanUrl(url, unwantedGoogleSearchQueryString);
}

function updateUrl(url) {
  return updateGoogleSearch(cleanUrl(url, unwantedQueryString));
}

if (typeof module !== 'undefined') {
  module.exports = updateUrl;
}
