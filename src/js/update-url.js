const toBeRemoved = /([\?\&](utm_|fb_|ref_)([_a-z1-9=]+)|(action_object_map|action_type_map|action_ref_map|feature|fref|hc_location|yclid)=[^&#]+)/ig;

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
