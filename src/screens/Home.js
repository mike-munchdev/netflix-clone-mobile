import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';
import MovieRow from '../components/MovieRow';
import http from '../rest/http';
import { requests } from '../rest';

const Home = () => {
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView}>
        <FeaturedMovie fetchUrl={requests.fetchAnimatedMovies} />
        <MovieRow
          fetchUrl={requests.fetchAnimatedMovies}
          title="Animated Movies"
        />
        <MovieRow fetchUrl={requests.fetchFamilyMovies} title="Family Movies" />
        <MovieRow fetchUrl={requests.fetchHistoryMovies} title="History" />
        <MovieRow
          fetchUrl={requests.fetchDocumentaries}
          title="Documentaries"
        />
        <MovieRow fetchUrl={requests.fetchWesternMovies} title="Westerns" />
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
