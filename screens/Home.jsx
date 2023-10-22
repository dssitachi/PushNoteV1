import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuth from "../context/AuthContext";
import EmployerHome from "./owner/Home";
import EmployeeHome from "./employee/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTask from "./owner/AddTask";
import TaskDetails from "./TaskDetails";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Home() {
    const { authState } = useAuth();
    return (
        <Stack.Navigator >
            { authState.isAdmin ? (
                <>
                    <Stack.Screen name="Home" component={EmployerHome}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="AddTask" component={AddTask}
                        options={{
                           title: "Add Task"
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="Home" component={EmployeeHome}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="TaskDetails" component={TaskDetails}
                        options={{
                            title: "",
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}


export default Home;