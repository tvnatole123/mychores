import React, { useState, useEffect, Node } from 'react';
import { View, Text } from 'react-native';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { RegisterScreen, Todos, LoginScreen } from './screens';
import styles from './styles';

const Stack = createStackNavigator();

const App: () => Node = () => {
 // Set an initializing state whilst Firebase connects
 const [initializing, setInitializing] = useState(true);
 const [user, setUser] = useState(null);

 // Handle user state changes
 function onAuthStateChanged(user) {
   setUser(user);
   if (initializing) setInitializing(false);
 }

 useEffect(() => {
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   return subscriber; // unsubscribe on unmount
 }, []);

 if (initializing) return null;

  return (
    <>
    <StatusBar barStyle='light-content' hidden />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Root'
        headerMode='screen'
      >
         {user ? (
            <>
             <Stack.Screen
              name='Todos'
              options={{
                headerShown: false
              }}
            >
               {(props) => <Todos user={user} />}
            </Stack.Screen>
            </>
         ) : (
           <>
              <Stack.Screen name="Login" options={{
                headerShown: false
              }}
              component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" options={{
                headerShown: false
              }}
              component={RegisterScreen} />
           </>
         )}
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};


export default App;
