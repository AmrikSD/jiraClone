import { Query, Resolver } from 'type-graphql'

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return 'wowee hello!'
  }
}
export { UserResolver }
