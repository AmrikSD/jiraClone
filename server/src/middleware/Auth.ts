import { Context } from '@utils/Context'
import { verify as verifyJwt } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { accessSecret } from '@utils/secret'

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authHeader = context.req.headers['authorization']

  if (!authHeader) {
    throw new Error('Not Authenticated')
  }

  try {
    const token = authHeader.split(' ')[1]
    const payload = verifyJwt(token, accessSecret)
    context.payload = payload as any //FIXME: as any
  } catch (err) {
    throw new Error('Not Authenticated')
  }

  return next()
}
