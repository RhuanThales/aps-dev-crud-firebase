import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon  from 'react-native-vector-icons/Ionicons';
import Home from './src/pages/Home';
import Player from './src/pages/Player';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons = {
  Home: {
    name: 'ios-home'
  },
  Player: {
    name: 'ios-people'
  }
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={ ({route}) => ({
        tabBarIcon: ({color, size}) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />
        }
      }) }
      tabBarOptions={{
        style: {
          backgroundColor: '#000'
        },
        activeTintColor: '#FFF',
        inactiveTintColor: '#8046E0'
      }}
    >
      <Tab.Screen name="Início" component={Home}/>
      <Tab.Screen name="Jogadores" component={Player}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return(
 <NavigationContainer>
   <Stack.Navigator>
      <Stack.Screen name="Início" component={Tabs} options={{ headerShown: false }}/>
      <Stack.Screen name="Jogadores" component={Player}/>
   </Stack.Navigator>
 </NavigationContainer>
 )
}
