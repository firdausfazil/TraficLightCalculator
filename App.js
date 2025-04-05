// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screen/Main';
import Quiz from './src/screen/Quiz';
import Calculation from './src/screen/Calculation';
import Notes from './src/screen/Notes';
import MainQuiz from './src/screen/MainQuiz';
import Animation from './src/screen/Animation';
import TestAnimation from './src/screen/TestAnimation';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="MainQuiz" component={MainQuiz} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Calculation" component={Calculation} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Animation" component={Animation} />
      <Stack.Screen name="Animation2" component={TestAnimation} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}