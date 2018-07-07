const URL = require('url')

const shopFromUrl = (url) => {
  if (!url.includes('http')) {
    url = ' https://' + url
  }

  const q = URL.parse(url, true)
  const shopHost = q.hostname

  if (shopHost.includes('amazon') && _checkDomainEnding('amazon', shopHost)) {
    return 'amazon'
  } else if (shopHost.includes('otto') && _checkDomainEnding('otto', shopHost)) {
    return 'otto'
  }

  return 'not_supported'
}

const _checkDomainEnding = (domain,url) => {
  const supported_endings = [
    '.de',
    '.com.au',
    '.com.br',
    '.cn',
    '.fr',
    '.ca',
    '.in',
    '.it',
    '.com.mx',
    '.co.jp',
    '.nl',
    '.es',
    '.com',
    '.co.uk',
  ]

  // important to get the last appearance
  const tld_startpos = url.lastIndexOf(domain)+domain.length
  const tld = url.substring(tld_startpos)
  if (supported_endings.includes(tld)) {
    return true
  } else {
    return false
  }
}

module.exports = {
  shopFromUrl,
}