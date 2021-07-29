import { User } from '@entity/Users'
import { sign } from 'jsonwebtoken'
import { accessSecret, refreshSecret } from '@utils/secret'
import { Response } from 'express'

export const createAccessToken = (user: User) => {
  return sign({ userID: user.id }, accessSecret, { expiresIn: '15m' })
}

export const createRefreshToken = (user: User) => {
  return sign(
    { userID: user.id, version: user.refreshTokenVersion },
    refreshSecret,
    {
      expiresIn: '7d'
    }
  )
}

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie('jcjwt', createRefreshToken(user), {
    httpOnly: true
  })
}
