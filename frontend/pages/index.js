import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client';
import { client } from './_app'

const GET_USER = gql`
  query Query{
    authenticatedKeystoneUser {
      username
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if(data) {
    console.log(data)
    return <p>works</p>
  }
}