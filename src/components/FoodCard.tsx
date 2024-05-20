import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoodCard = ({ item, onPress, onDelete, onEdit }) => { 
  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleEdit = () => {
    onEdit(item.id); 
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Ionicons name="create" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text>{item.recipe}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.viewMore}>View More</Text>
      </TouchableOpacity>
    </View>
  );
  
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
   },
   cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default FoodCard;
