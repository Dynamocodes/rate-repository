import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onItemPress }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
    
    const renderItem = ({item}) => (
      <Pressable onPress={() => onItemPress(item.id)}>
        <RepositoryItem item={item}/>
      </Pressable>
    );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {

  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const handleItemPress = (id) => {
    navigate(`/${id}`);
  };


  return (
    <RepositoryListContainer 
    repositories={repositories}
    onItemPress={handleItemPress} />
  );
};

export default RepositoryList;