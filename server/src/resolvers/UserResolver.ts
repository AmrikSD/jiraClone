import { User } from '@entity/Users'
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql'
import argon2 from 'argon2'
import { Context } from 'src/utils/Context'
import { createAccessToken, createRefreshToken } from 'src/auth/auth'

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

  @Query(() => [User])
  users() {
    return User.find()
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
    res.cookie('jcjwt', createRefreshToken(user), {
      httpOnly: true
    })

    return {
      accessToken: createAccessToken(user)
    }
  }
}
export { UserResolver }
