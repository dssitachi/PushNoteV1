import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuth from "../context/AuthContext";
import EmployerHome from "./owner/Home";
import EmployeeHome from "./employee/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTask from "./owner/AddTask";
import CompletedTasks from "./employee/CompletedTasks";
import EmployeeTaskDetails from "./employee/TaskDetails";
import EmployerTaskDetails from "./owner/EmployerTaskDetails";
import EditTask from "./owner/EditTask";
import { Chat } from "./employee/EmployeeChat";
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
                    <Stack.Screen name="TaskDetails" component={EmployerTaskDetails}
                        options={{
                            title: "",
                        }}
                    />
                    <Stack.Screen name="EditTask" component={EditTask}
                        options={{
                            title: "Edit Task",
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
                    <Stack.Screen name="TaskDetails" component={EmployeeTaskDetails}
                        options={{
                            title: "",
                        }}
                    />
                    <Stack.Screen name="CompletedTasks" component={CompletedTasks}
                        options={{
                            title: "",
                        }}
                    />
                    <Stack.Screen name="Chat" component={Chat}
                        options={{
                            title: "Chat",
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}


export default Home;