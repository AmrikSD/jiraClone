import { User } from '@entity/Users'
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import argon2 from 'argon2'
import { Context } from '@utils/Context'
import { isAuth } from '@middleware/Auth'
import { createAccessToken, sendRefreshToken } from '@auth/tokens'
import { getConnection } from 'typeorm'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return 'wowee hello!'
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  getId(@Ctx() { payload }: Context) {
    return `${payload!.userID}`
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userID', () => Int) userID: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userID }, 'refreshTokenVersion', 1)

    return true
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword: string = await argon2.hash(password)
    try {
      await User.insert({
        email,
        password: hashedPassword
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('Invalid login')
    }

    const isValidLogin = await argon2.verify(user.password, password)

    if (!isValidLogin) {
      throw new Error('Invalid login')
    }

    //if here, login is successful, so give them the goods (tokens)
    sendRefreshToken(res, user)

    return {
      accessToken: createAccessToken(user)
    }
  }
}
export { UserResolver }
