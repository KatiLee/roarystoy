import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToCameraScreen = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
        {/* <FontAwesomeIcon icon='fa-solid fa-camera-retro' style={{color: '#4676c8',}} /> */}
      <TouchableOpacity onPress={goToCameraScreen} style={styles.button}>
        <Text style={styles.buttonText}>Take A Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
