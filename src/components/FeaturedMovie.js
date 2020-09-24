import React, { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import http from '../rest/http';
import { baseImageURI } from '../rest';
import Header from './Header';

const FeaturedMovie = ({ fetchUrl }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await http.get(fetchUrl);

        const randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ];

        setFeaturedMovie(randomMovie);
      } catch (error) {
        setFeaturedMovie(null);
      }
    })();
  }, [fetchUrl]);

  return featuredMovie ? (
    <Fragment>
      <ImageBackground
        resizeMode="cover"
        style={styles.bannerImage}
        source={{
          uri: `${baseImageURI}${featuredMovie.backdrop_path}`,
        }}
      >
        <LinearGradient
          style={styles.linearGradient}
          locations={[0, 0.2, 0.6, 0.93]}
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,1)',
          ]}
        >
          <Header viewStyles={{ position: 'absolute', top: 60, zIndex: 1 }} />
        </LinearGradient>
        <View style={styles.headerContainer}>
          <Text adjustsFontSizeToFit style={styles.headerText}>
            {featuredMovie ? featuredMovie.title : ''}
          </Text>
        </View>
      </ImageBackground>
    </Fragment>
  ) : (
    <ActivityIndicator />
  );
};

export default FeaturedMovie;

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 350,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  headerContainer: {
    marginTop: (350 / 5) * -1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});
