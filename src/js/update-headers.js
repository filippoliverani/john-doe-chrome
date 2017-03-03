function updateHeaders(headers, url, userAgent) {
  var updatedHeaders = []
  for (var header of headers) {
    updateHeaderValue(header, url, userAgent);
    updatedHeaders.push(header);
  }
  return updatedHeaders;
};

function updateHeaderValue(header, url, userAgent) {
  switch (header.name) {
    case 'Accept':
      header.value = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
      break;
    case 'Accept-Encoding':
      header.value = 'gzip, deflate';
      break;
    case 'Accept-Language':
      header.value = 'en-US,en;q=0.5';
      break;
    case 'User-Agent':
      header.value = userAgent;
      break;
    case 'Referer':
      if (header.value && !url.includes(header.value)) header.value = url;
      break;
  }
};

if (typeof module !== 'undefined') {
  module.exports = updateHeaders;
}
