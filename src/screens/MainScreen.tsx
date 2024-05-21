import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoodCard from '../components/FoodCard';
import { AppContext } from '../components/AppContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('posts');
        if (storedPosts) {
          dispatch({ type: 'SET_POSTS', payload: JSON.parse(storedPosts) });
        }
      } catch (error) {
        console.error('Failed to load posts from storage', error);
      }
    };
    loadPosts();
  }, [dispatch]);

  useEffect(() => {
    const savePosts = async () => {
      try {
        await AsyncStorage.setItem('posts', JSON.stringify(state.posts));
      } catch (error) {
        console.error('Failed to save posts to storage', error);
      }
    };
    savePosts();
  }, [state.posts]);

  useEffect(() => {
    console.log('All posts:', state.posts);
  }, [state.posts]);

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_POST', payload: id });
  };

  const handleEdit = (id) => {
    navigation.navigate('EditPost', { postId: id });
  };

  const filteredPosts = state.posts.filter(post => !state.selectedCategory || post.category === state.selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {["All", "Georgian", "Italian", "Mexican"].map(category => (
          <TouchableOpacity key={category} onPress={() => handleCategorySelect(category === "All" ? null : category)}>
            <Text style={[styles.categoryButton, state.selectedCategory === category && styles.selectedCategoryButton]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => navigation.navigate("CardDetails", { food: item })}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={(state.selectedCategory || 'all') + '2'}  
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPost")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    width:"100%"
  },
  categoryButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
    width:85,
    height:40,
    fontSize:17,
  
  },
  selectedCategoryButton: {
    backgroundColor: 'blue',
    color: 'white',
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    gap:30
  },
});

export default MainScreen;
