import { View, StyleSheet, Pressable, Linking, FlatList } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.backgroundPrimary
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.backgroundPrimary,
  },
  topRightItemContainer: {
    flexShrink: 1,
    padding: 5,
  },
  topLeftItemContainer: {
    padding: 10,
    margin: 5,
    borderColor: theme.colors.primary,
    borderWidth:2,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  flatlistContainer: {
    marginTop: 10,
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
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item }) => {
  if(!item){
    return null
  }
  const formatDate = (date) => {
    const splitDate = date.split("T")
    return splitDate[0].replace(/-/g, ".")
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.topLeftItemContainer}>
        <Text fontWeight="bold" color="primary">{item.rating}</Text>
      </View>
      <View style={styles.topRightItemContainer}>
        <Text fontWeight="bold">{item.user.username}</Text>
        <Text color="textSecondary">{formatDate(item.createdAt)}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  )
};


const SingleRepositoryViewContainer = ({repository}) => {

  if(!repository){return null}

  const handlePress = () => {
    Linking.openURL(repository.url);
  }
  
  const reviewNodes = repository.reviews.edges.map((edge) => edge.node)
  
  return(
    <>
      <View style={styles.container}>
        <RepositoryItem item={repository}/>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text color='highContrast' fontWeight='bold'>Open in GitHub</Text>
        </Pressable>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
        data={reviewNodes}
        renderItem={ReviewItem}
        ItemSeparatorComponent={ItemSeparator}
        />
      </View>
      
    </>
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