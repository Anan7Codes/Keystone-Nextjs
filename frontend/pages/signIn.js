import { gql, useMutation } from "@apollo/client";
import { client } from './_app'

const SIGN_IN_MUTATION = gql`
mutation(
    $username: String,
    $password: String
) {
  authenticateKeystoneUserWithPassword(username: $username, password: $password){
    token
    item {
        username
    }
  }
}
`

export default function SignIn() {
  const [signIn, newSignIn] = useMutation(SIGN_IN_MUTATION)
  console.log(newSignIn)

  return (
    <div>
      <button onClick={() => {
          signIn({
              variables: {
                  username: 'anand7u',
                  password: 'anandhuk'
              }
          })
      }}>Sign In</button>

    </div>
  )
}
