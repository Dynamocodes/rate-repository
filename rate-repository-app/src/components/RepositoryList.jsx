import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Menu, Button, Searchbar } from 'react-native-paper';
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

export class RepositoryListContainer extends React.Component {
  renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => this.props.onItemPress(item.id)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  renderHeader = () => {
    return (
      <View>
        <Menu
          visible={this.props.isMenuVisible}
          onDismiss={this.props.hideMenu}
          anchor={
            <Button onPress={this.props.showMenu}>
              {this.props.selectedSort === 'latest' && "Latest repositories"}
              {this.props.selectedSort === 'highest' && "Highest rated repositories"}
              {this.props.selectedSort === 'lowest' && "Lowest rated repositories"}
            </Button>
          }
        >
          <Menu.Item onPress={() => this.props.setSelectedSort('latest')} title="Latest repositories" />
          <Menu.Item onPress={() => this.props.setSelectedSort('highest')} title="Highest rated repositories" />
          <Menu.Item onPress={() => this.props.setSelectedSort('lowest')} title="Lowest rated repositories" />
        </Menu>
        <Searchbar 
          placeholder="Search..."
          onChangeText={text => this.props.setSearchTerm(text)}
          value={this.props.searchTerm}
        />
      </View>
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const { repositories } = useRepositories(selectedSort, searchTerm);
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
    setSearchTerm={setSearchTerm}
    searchTerm={searchTerm}
    />
  );
};

export default RepositoryList;
