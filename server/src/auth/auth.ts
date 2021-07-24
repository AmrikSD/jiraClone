import { User } from '@entity/Users'
import { sign } from 'jsonwebtoken'
import { jwtSecret, cookieSecret } from 'src/utils/secret'

export const createAccessToken = (user: User) => {
  return sign({ userID: user.id }, jwtSecret, { expiresIn: '15m' })
}

export const createRefreshToken = (user: User) => {
  return sign({ userID: user.id }, cookieSecret, { expiresIn: '7d' })
}
