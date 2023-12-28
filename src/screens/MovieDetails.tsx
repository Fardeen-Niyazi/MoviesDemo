import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const ImageUrl = 'http://image.tmdb.org/t/p/w500';

const MovieDetails = () => {
  const route = useRoute();
  const id = route.params?.id ?? '695721';
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    getMovieDetailsData();
  }, []);

  const getMovieDetailsData = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    let headers = {
      accept: `application/json`,
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzZhYjlhZjQ2NjI4MzYzNGFiYWQxOWM5ZDZlY2JiNiIsInN1YiI6IjY1OGQ0MGEzYTMzNjEyNTkzZTU5MmQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KWZsB0drqz0_9Gh6eSVVMtmo0UjcayxU_9l2fsPfbDU',
    };
    try {
      setIsLoading(true);
      let response = await axios.get(url, {headers});
      let result = response.data;
      setDetails(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error : ', error);
    }
  };
  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'red'} />
      ) : (
        <>
          <Image
            style={styles.imageStyle}
            source={{uri: `${ImageUrl}${details?.backdrop_path}`}}
          />
          <Text style={{}}>
            {details?.title ?? 'Title'} {' ' + details?.release_date ?? 'Date'}
          </Text>
          <Text style={styles.taglineStyle}>
            {details?.tagline ?? 'tagline'}
          </Text>
          <Text style={styles.overviewStyle}>
            {details?.overview ?? 'tagline'}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
  imageStyle: {
    height: 300,
    width: '100%',
  },
  taglineStyle: {
    marginVertical: 10,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  overviewStyle: {
    marginBottom: 10,
  },
});
