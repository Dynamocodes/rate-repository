import { View, StyleSheet, Pressable, Linking } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.backgroundPrimary
  },
  button: {
    backgroundColor: theme.colors.primary,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:15,
    margin:5,
    borderRadius:5,
  },
});

const SingleRepositoryViewContainer = ({repository}) => {
  const handlePress = () => {
    Linking.openURL(repository.url);
  }
  return(
    <View style={styles.container}>
      <RepositoryItem item={repository}/>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text color='highContrast' fontWeight='bold'>Open in GitHub</Text>
      </Pressable>
    </View>
  )
}

const SingleRepositoryView = () => {

  const { id } = useParams();
  
  const {repository} = useRepository(id)
  
    return(
      <SingleRepositoryViewContainer repository={repository}/>
    )
  }

export default SingleRepositoryView;