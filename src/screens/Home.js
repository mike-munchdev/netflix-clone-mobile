import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';
import MovieRows from '../components/MovieRows';
import http from '../rest/http';
import { requests } from '../rest/requests';

const Home = () => {
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView}>
        <FeaturedMovie fetchUrl={requests.fetchAnimatedMovies} />
        <MovieRows
          fetchUrl={requests.fetchAnimatedMovies}
          title="Animated Movies"
        />
        <MovieRows
          fetchUrl={requests.fetchFamilyMovies}
          title="Family Movies"
        />
        <MovieRows fetchUrl={requests.fetchHistoryMovies} title="History" />
        <MovieRows
          fetchUrl={requests.fetchDocumentaries}
          title="Documentaries"
        />
        <MovieRows fetchUrl={requests.fetchWesternMovies} title="Westerns" />
      </ScrollView>
    </Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
});
