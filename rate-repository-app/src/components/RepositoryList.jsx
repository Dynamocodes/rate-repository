import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Menu, Button } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onItemPress, selectedSort, setSelectedSort, visible, openMenu, closeMenu }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => onItemPress(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              {selectedSort === "latest" && "Latest repositories"}
              {selectedSort === "highest" && "Highest rated repositories"}
              {selectedSort === "lowest" && "Lowest rated repositories"}
            </Button>
          }
        >
          <Menu.Item onPress={() => {setSelectedSort("latest"); closeMenu();}} title="Latest repositories" />
          <Menu.Item onPress={() => {setSelectedSort("highest"); closeMenu();}} title="Highest rated repositories" />
          <Menu.Item onPress={() => {setSelectedSort("lowest"); closeMenu();}} title="Lowest rated repositories" />
        </Menu>
      }
      renderItem={renderItem}
    />
  );
};


const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const { repositories } = useRepositories(selectedSort);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleItemPress = (id) => {
    navigate(`/${id}`);
  };

  return (
    <RepositoryListContainer 
    repositories={repositories}
    onItemPress={handleItemPress}
    selectedSort={selectedSort}
    setSelectedSort={setSelectedSort}
    visible={visible}
    openMenu={openMenu}
    closeMenu={closeMenu}
    />
  );
};

export default RepositoryList;
