import { User } from '@entity/Users'
import { sign } from 'jsonwebtoken'
import { accessSecret, refreshSecret } from 'src/utils/secret'

export const createAccessToken = (user: User) => {
  return sign({ userID: user.id }, accessSecret, { expiresIn: '15m' })
}

export const createRefreshToken = (user: User) => {
  return sign({ userID: user.id }, refreshSecret, { expiresIn: '7d' })
}
