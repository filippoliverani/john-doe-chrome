function updateHeaders(headers, url, frameId = 0, userAgent) {
  const isIFrame = frameId !== 0;
  const updatedHeaders = [];
  for (const header of headers) {
    updateHeaderValue(header, url, isIFrame, userAgent);
    updatedHeaders.push(header);
  }
  return updatedHeaders;
}

function updateHeaderValue(header, url, isIFrame, userAgent) {
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
      if (!isSameOrigin(header.value, url) && !isIFrame) {
        header.value = getHostname(url);
      }
      break;
  }
}

function isSameOrigin(originUrl, newUrl) {
  return newUrl && newUrl.includes(getHostname(originUrl));
}

function getHostname(url) {
  return url.match(/(.+:\/\/)?([^\/]+)/)[0];
}

if (typeof module !== 'undefined') {
  module.exports = updateHeaders;
}
