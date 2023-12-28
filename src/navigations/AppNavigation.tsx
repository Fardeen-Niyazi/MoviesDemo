import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import MovieList from '../screens/MovieList';
import MovieDetails from '../screens/MovieDetails';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MovieList" component={MovieList} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
