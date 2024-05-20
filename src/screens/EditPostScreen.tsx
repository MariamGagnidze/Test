import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../components/AppContext';

const EditPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const { state, dispatch } = useContext(AppContext);
  const post = state.posts.find(p => p.id === postId);

  const [foodName, setFoodName] = useState(post ? post.name : ''); 
  const [recipe, setRecipe] = useState(post ? post.recipe : ''); 

  const saveChanges = () => {
    dispatch({
      type: 'UPDATE_POST',
      payload: { id: postId, name: foodName, recipe: recipe },
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        value={foodName}
        onChangeText={setFoodName}
        placeholder="Enter edited food name"
      />
      <Text style={styles.label}>Recipe:</Text>
      <TextInput
        style={styles.input}
        value={recipe}
        onChangeText={setRecipe}
        placeholder="Enter edited recipe"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
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

export default EditPostScreen;
