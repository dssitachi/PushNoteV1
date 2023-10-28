import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddTask from "./screens/owner/AddTask";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import useAuth, { AuthProvider } from "./context/AuthContext";
import Login from "./screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Register from "./screens/Register";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export function Layout() {
    const { authState } = useAuth();
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        {authState.authenticated ? (
                            <>
                                <Stack.Screen
                                    name="Landing"
                                    component={Home}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="AddTask"
                                    component={AddTask}
                                    options={{ title: "Assign Task" }}
                                />
                            </>
                        ) : (
                            <>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ headerShown: false }}
                            />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GluestackUIProvider>
    );
}
