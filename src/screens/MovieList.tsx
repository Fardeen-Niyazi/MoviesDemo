import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ImageUrl = 'http://image.tmdb.org/t/p/w500';

interface MovieListData {
  backdrop_path: string;
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  overview: string;
}

const MovieList = () => {
  const [movieListData, setMovieListData] = useState<MovieListData[] | []>([]);
  const [isError, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    getMovieListingData();
  }, [page]);

  const getMovieListingData = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    let headers = {
      accept: `application/json`,
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzZhYjlhZjQ2NjI4MzYzNGFiYWQxOWM5ZDZlY2JiNiIsInN1YiI6IjY1OGQ0MGEzYTMzNjEyNTkzZTU5MmQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KWZsB0drqz0_9Gh6eSVVMtmo0UjcayxU_9l2fsPfbDU',
    };
    try {
      setIsLoading(true);
      let response = await axios.get(url, {headers});
      let result = response.data;
      let preViousData = movieListData;
      setMovieListData(movieListData.concat(result.results));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error : ', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Movies List</Text>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'red'} />
      ) : (
        <>
          <FlatList
            style={{flex: 1}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={movieListData}
            renderItem={({item, index}) => (
              <MoviesItem
                item={item}
                index={index}
                onPress={() =>
                  navigation.navigate('MovieDetails', {id: item.id})
                }
              />
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  display: 'flex',
                  justifyContent: 'center',
                  height: 40,
                  width: 150,
                  alignSelf: 'center',
                  marginVertical: 10,
                  borderRadius: 8,
                }}
                onPress={() => setPage(page + 1)}>
                <Text style={{alignSelf: 'center', color: '#fff'}}>
                  Load More
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const MoviesItem = ({
  item,
  index,
  onPress,
}: {
  item: MovieListData;
  index: number;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.movieItemStyle}>
      <Image
        style={styles.imageStyle}
        source={{uri: `${ImageUrl}${item.poster_path}`}}
      />
      <Text
        style={{
          width: 200,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          width: 200,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 14,
        }}>
        {'Release : ' + item.release_date}
      </Text>
      <Text
        style={{
          width: 200,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontWeight: 'normal',
        }}>
        {item.overview}
      </Text>
    </View>
  </TouchableOpacity>
);
export default MovieList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
  movieItemStyle: {
    marginVertical: 10,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
