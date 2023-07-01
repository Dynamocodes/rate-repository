import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'stretch',
    padding:5,
  },
  flexItems:{
    padding:15,
    margin: 5,
  },
  button:{
    backgroundColor: theme.colors.primary,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:15,
    margin:5,
    borderRadius:5,
    color: theme.colors.highContrast
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.flexItems} name="username" placeholder="Username" />
      <FormikTextInput secureTextEntry style={styles.flexItems} name="password" placeholder="Password" />
      <FormikTextInput secureTextEntry style={styles.flexItems} name="passwordConfirmation" placeholder="Password confirmation" />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text color='highContrast' fontWeight='bold'>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpFormContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;
    
    try {
      const result = await createUser({ variables: { username, password } });
  
      if (result.data.createUser) {
        const { data } = await signIn({ username, password });
        
        if (data) {
          navigate('/');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  return <SignUpFormContainer onSubmit={onSubmit} />;
};

export default SignUpPage;
