const URL = require('url')

const sanitize = (url) => {
  const q = URL.parse(url, true)
  //todo exclude the last parameter
  return q.protocol + '//www.' + q.hostname.replace('www.','') + q.pathname
}

module.exports = sanitize