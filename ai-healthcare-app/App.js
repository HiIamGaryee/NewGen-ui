import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Chatbot from "./screens/Chatbot";
import Recommendations from "./screens/Recommendations";
import SignUpV2 from "./screens/SignUpV2";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpv2" component={SignUpV2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Recommendations" component={Recommendations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Replace your-api-url.com with your actual API URL.
