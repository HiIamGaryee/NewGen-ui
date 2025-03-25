import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For icons in tab bar
import { TouchableOpacity, Text } from "react-native";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Diet from "./screens/Diet";
import Game from "./screens/Game";
import Health from "./screens/Health";
import Report from "./screens/Report";
import Chatbot from "./screens/Chatbot";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// http://localhost:8080/api/auth/logout

// Bottom Tab Navigator
function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginRight: 15 }}
          >
            <Text
              style={{ color: "#002147", fontSize: 16, fontWeight: "bold" }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={Health}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chatbot"
          component={Chatbot}
          options={{ headerShown: true, title: "AI Chatbot" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
