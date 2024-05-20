import { View, Text, StyleSheet } from 'react-native';
import ImageComponent from '../components/ImageComponent';

const CardDetailsScreen = ({ route }) => {
  const { food } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.foodName}>{food.name}</Text>
      <ImageComponent/>
      <Text style={styles.header}>Recipe</Text>
      <Text>{food.recipe}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },imgStyle:{
  }
});

export default CardDetailsScreen;
