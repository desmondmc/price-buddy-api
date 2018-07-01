const db = require('../db')

const authenticate = async (req, _, next) => {
  const authToken = req.get('auth-token')

  const findUser = 
  `
    SELECT * FROM public.user
    WHERE auth_token='${authToken}';
  `

  const result = await db.query(findUser)

  if (result.rowCount > 0) {
    req.userId =  result.rows[0].id;
  }

  next()
};

module.exports = authenticate;