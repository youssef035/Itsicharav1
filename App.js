import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Apps/Screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./Apps/Navigations/TabNavigation";
import LawyerForm from "./Apps/Screens/LawyerForm";
import { Header } from "react-native/Libraries/NewAppScreen";
import ThankLawyer from "./Apps/Screens/ThankLawyer";
import WelcomeScreen from "./Apps/Screens/WelcomeScreen";
import SignupScreen from "./Apps/Screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_dmFsdWVkLWxhZHliaXJkLTc1LmNsZXJrLmFjY291bnRzLmRldiQ">
      <View className="flex-1  bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="welcome"
                options={{ headerShown: false }}
                component={WelcomeScreen}
              />
              <Stack.Screen name="formule" component={LawyerForm} />
              <Stack.Screen
                name="thanks"
                options={{ headerShown: false }}
                component={ThankLawyer}
              />
              <Stack.Screen
                name="signup"
                options={{ headerShown: false }}
                component={SignupScreen}
              />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
