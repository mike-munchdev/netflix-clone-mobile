import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { baseImageURI, requests } from '../rest';
import http from '../rest/http';
import YouTubePlayer from './YouTubePlayer';

const MovieRow = ({ title, fetchUrl }) => {
  const movieRowRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [youTubePreviewPlaying] = useState(false);
  const [youTubeVideoId, setYouTubeVideoId] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await http.get(fetchUrl);
      setMovies(response.data.results);
    })();
  }, [fetchUrl]);

  const toggleAndPlayMoviePreview = async (movieId) => {
    try {
      // toggle preview off
      if (movieId === selectedMovieId) {
        setYouTubeVideoId(null);
        setPreviewVisible(false);
        setSelectedMovieId(null);
      } else {
        // toggle preview on and play
        setSelectedMovieId(movieId);
        const response = await http.get(requests.fetchVideosForMovie(movieId));
        const youTubePreview = response.data.results.find(
          (m) => m.site === 'YouTube' && m.type === 'Trailer'
        );

        // play
        if (youTubePreview) {
          setYouTubeVideoId(youTubePreview.key);
          setPreviewVisible(true);
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container} ref={movieRowRef}>
      <Text style={styles.titleText}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.movieView}
              onPress={() => {
                toggleAndPlayMoviePreview(item.id);
              }}
            >
              <Image
                source={{ uri: `${baseImageURI}${item.poster_path}` }}
                resizeMode="cover"
                style={styles.posterImage}
              />
            </TouchableOpacity>
          );
        }}
        horizontal
      />
      <YouTubePlayer
        visible={previewVisible}
        videoId={youTubeVideoId}
        setVisible={setPreviewVisible}
        playing={youTubePreviewPlaying}
      />
    </View>
  );
};

export default MovieRow;

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
