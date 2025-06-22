import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

import DashboardScreen from './screens/DashboardScreen';
import NoteScreen from './screens/NoteScreen';
import FormScreen from './screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'My Notes' }}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{ title: 'Note Detail' }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: 'New/Edit Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}