import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({id, role: "user"}, process.env.JWT_SECRET_KEY, {
    expiresIn: '10d'
  })
}

export default generateToken