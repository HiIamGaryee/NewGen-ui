import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/Dashboard";
import Chatbot from "./screens/Chatbot";
import Recommendations from "./screens/Recommendations";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Recommendations" component={Recommendations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Replace your-api-url.com with your actual API URL.