import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-native";

const useSignIn = () => {
    const navigate = useNavigate()
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    });

    const signIn = async ({ username, password }) => {
      const { data } = await mutate({variables:{username, password}});
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();

      if (data) {
        navigate('/');
      }

      return data
    };

    return [signIn, result];
  };
  export default useSignIn