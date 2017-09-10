const unwantedQueryString = /([\?\&](utm_|fb_|ref_)([_a-z1-9=]+)|(action_object_map|action_type_map|action_ref_map|feature|fref|hc_location|yclid)=[^&#]+)/ig;
const unwantedGoogleSearchQueryString = /([\?\&](aqs|sourceid)=[^&#]+)/ig;
const googleSearch = /http(s)?:\/\/(www\.)?google\..+\/search\?/;
const googleSearchWithoutRedirect = 'https://encrypted.google.com/search?';

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

  const cleanedUrl = cleanUrl(url, unwantedGoogleSearchQueryString);
  return cleanedUrl.replace(matches[0], googleSearchWithoutRedirect);
}

function updateUrl(url) {
  return updateGoogleSearch(cleanUrl(url, unwantedQueryString));
}

if (typeof module !== 'undefined') {
  module.exports = updateUrl;
}
