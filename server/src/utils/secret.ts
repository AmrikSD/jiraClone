import crypto from 'crypto'

const accessSecret = crypto.randomBytes(20).toString('hex')
const refreshSecret = crypto.randomBytes(20).toString('hex')

export { accessSecret, refreshSecret }
