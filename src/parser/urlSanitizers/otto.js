const URL = require('url')

const sanitize = (url) => {
  const q = URL.parse(url, true)
  return q.protocol + '//www.' + q.hostname.replace('www.','') + q.pathname + q.hash
}

module.exports = sanitize