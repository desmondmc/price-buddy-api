const crypto = require('crypto')

const saltPassword = async (password) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 10000;

  const hash = await hashPromise(password, salt, iterations)

  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
};

const hashPromise = (password, salt, iterations) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (err, derivedKey) => {
    if (err) {
      reject(err);
      return;
    }

    const key = derivedKey.toString('hex')

    resolve(key)
  });
})

module.exports = { saltPassword };
