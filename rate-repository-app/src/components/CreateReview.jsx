import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import * as yup from 'yup';

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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.flexItems} name="ownerName" placeholder="Repository owner's username" />
      <FormikTextInput style={styles.flexItems} name="repositoryName" placeholder="Repository's name" />
      <FormikTextInput style={styles.flexItems} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput multiline style={styles.flexItems} name="review" placeholder="Review" />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text color='highContrast' fontWeight='bold'>Create Review</Text>
      </Pressable>
    </View>
  );
};

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner\'s username is required'),
  repositoryName: yup
    .string()
    .required('Repository\'s name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup
    .string(),
});

export const ReviewFormContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const ReviewPage = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data }  = await createReview({ variables: { ownerName, repositoryName, rating: Number(rating), text: review } });
      if(data && data.createReview) {
        navigate(`/${data.createReview.repositoryId}`); // Navigate to the new review
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewPage;
