import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    
  },
  navBarText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.navBarText}>Home</Text>
    </View>
  );
};

export default NavBar;