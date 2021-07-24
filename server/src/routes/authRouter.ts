import { Router } from 'express'
import cookieParser from 'cookie-parser'
import { logger } from '@utils/logger'
import { verify } from 'jsonwebtoken'
import { refreshSecret } from '@utils/secret'
import { User } from '@entity/Users'
import { createAccessToken, sendRefreshToken } from '@auth/tokens'

const authRouter = Router().use(cookieParser())

/**
 * Route used to provide an access token to the user.
 *
 * 1. Checks the request has a refresh token
 * 2. Checks the refresh token is valid,
 * 3. Searches for the user id in the database.
 * 4. Checks that the refresh token version matches
 * 4. Create a new access token user
 *
 */
authRouter.post('/refresh_token', async (req, res) => {
  logger.http(`jcjwt: ${req.cookies.jcjwt}`)
  const token = req.cookies.jcjwt

  if (!token) {
    logger.info(`no token found`)
    return res.send({ ok: false, accessToken: '' })
  }

  let payload: any = null
  try {
    payload = verify(token, refreshSecret!)
  } catch (err) {
    logger.error(err)
    return res.send({ ok: false, accessToken: '' })
  }

  //Token is valid, can send back access token.
  const user = await User.findOne({ id: payload.userID })
  if (!user) {
    logger.error(`Found valid token but no user with ID: ${payload.userID}`)
    return res.send({ ok: false, accessToken: '' })
  }

  if (user.refreshTokenVersion !== payload.version) {
    logger.error(`Refresh token expired for user : ${payload.userID}`)
    return res.send({ ok: false, accessToken: '' })
  }

  logger.info(`refreshing new (7 day) refresh token for user ${payload.userID}`)
  sendRefreshToken(res, user)

  logger.info(`providing access token for user ${payload.userID}`)
  return res.send({ ok: true, accessToken: createAccessToken(user) })
})

export { authRouter }
