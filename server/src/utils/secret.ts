import crypto from 'crypto'

const jwtSecret = crypto.randomBytes(20).toString('hex')
const cookieSecret = crypto.randomBytes(20).toString('hex')

export { jwtSecret, cookieSecret }
