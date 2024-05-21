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
            <Ionicons name="create" size={30} color="blue"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.recipe} numberOfLines={3} ellipsizeMode="tail"> {item.recipe}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.viewMore}>View More</Text>
      </TouchableOpacity>
    </View>
  );
  
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height:200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    overflow: 'hidden',
   },
   cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginBottom: 5,
  },
  iconsContainer: {
    width:"100%",
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  foodName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:"center"

  },
  recipe:{
    fontSize: 18,
    marginBottom: 5,
    marginTop:5,
    textAlign:"center",
    height: 60, 
    overflow: 'hidden', 

  },
  viewMore: {
    color: 'blue',
    fontSize:20,
    textAlign:"center"
  },
  icons:{

  }
});

export default FoodCard;
