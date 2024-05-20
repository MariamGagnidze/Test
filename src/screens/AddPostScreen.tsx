import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../components/AppContext';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select'; 

const AddPostScreen = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);
  const [category, setCategory] = useState(''); 
  const [foodName, setFoodName] = useState('');
  const [recipe, setRecipe] = useState('');

  const savePost = async () => {
    if (foodName && recipe) {
      const newPost = {
        id: uuid.v4(),
        category,
        name: foodName,
        recipe,
      };
      dispatch({ type: 'ADD_POST', payload: newPost });
      try {
        const storedPosts = await AsyncStorage.getItem('posts');
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        await AsyncStorage.setItem('posts', JSON.stringify([...posts, newPost]));
      } catch (error) {
        console.error('Failed to save post to storage', error);
      }
      navigation.navigate('Main');
    } else {
      console.log('All fields are required.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category:</Text>
      <RNPickerSelect
  key="categoryPicker"
  style={{ 
    inputIOS: styles.input, 
    inputAndroid: styles.input, 
  }}
  value={category}
  onValueChange={(value) => setCategory(value)}
  placeholder={{ label: 'Select category', value: null }}
  items={[
    { label: 'Georgian', value: 'Georgian' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Mexican', value: 'Mexican' },
  ]}
/>


      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        value={foodName}
        onChangeText={setFoodName}
        placeholder="Enter food name"
      />
      <Text style={styles.label}>Recipe:</Text>
      <TextInput
        style={styles.input}
        value={recipe}
        onChangeText={setRecipe}
        placeholder="Enter recipe"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={savePost}>
        <Text style={styles.buttonText}>Save Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 19,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
  },
});

export default AddPostScreen;
