import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Header = ({ viewStyles }) => {
  return (
    <View style={{ ...styles.container, ...viewStyles }}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.menuText}>Movies</Text>
      <Text style={styles.menuText}>TV Shows</Text>
      <Text style={styles.menuText}>My List</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  logo: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  menuText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
