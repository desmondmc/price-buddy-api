const bodyCheck = (req, res, next) => {
  if (req.body) {
    next()
  } else {
    res.status(400).send('No body in request!')
  }
}

module.exports = bodyCheck