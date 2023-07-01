import { View, StyleSheet, Pressable, Linking, FlatList } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'

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

const MyReviewsContainer = ({reviews}) => {
    return(
        <View style={styles.flatlistContainer}>
            <FlatList
            data={reviews}
            renderItem={ReviewItem}
            ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    )
    
}

const MyReviewsPage = () => {

    const resultMe = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });
    const me = resultMe.loading ? undefined : resultMe.data.me
    if(me && me.username ){
        const reviewNodes = resultMe.data.me.reviews.edges.map(edge => edge.node)
        console.log(reviewNodes)
        return (
            <MyReviewsContainer
            reviews={reviewNodes}/>
        )
    }

    return null
}

export default MyReviewsPage;