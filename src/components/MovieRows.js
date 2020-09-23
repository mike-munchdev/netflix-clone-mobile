import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import http from '../rest/http';
import { baseImageURI } from '../rest/requests';

const MovieRows = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await http.get(fetchUrl);

        setMovies(response.data.results);
      } catch (error) {}
    })();
  }, [fetchUrl]);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.movieView}>
              <Image
                source={{ uri: `${baseImageURI}${item.poster_path}` }}
                resizeMode="cover"
                style={styles.posterImage}
              />
            </View>
          );
        }}
        horizontal
      />
    </View>
  );
};

export default MovieRows;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 5,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
  },
  movieNameText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  posterImage: {
    height: '100%',
    width: '100%',
  },
  movieView: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round((Dimensions.get('window').width * 28) / 100),
    height: 180,
  },
});
