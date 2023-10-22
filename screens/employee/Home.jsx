import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text } from 'react-native'
import EmployeeTask from "./EmployeeTask";
import TaskDetails from "../TaskDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BellIcon, HStack, Icon, SearchIcon, SettingsIcon } from "@gluestack-ui/themed";
import EmployeeNoticeBoard from "./EmployeeNoticeBoard";
import Profile from "../Profile";
import { Clipboard, ListTodo, UserCircle2 } from "lucide-react-native";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function EmployeeHome() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Task" component={EmployeeTask}
                options={{
                    tabBarLabel: 'Tasks',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon as={ListTodo} color={focused ? 'blue' : 'black'} />
                    ),
                    headerRight: () => (
                        <HStack space="xl" px="$4">
                            <Icon as={SearchIcon} color="black" />
                            <Icon as={BellIcon} color="black" />
                        </HStack>
                    )
                }}
            />
            <Tab.Screen name="News Board" component={EmployeeNoticeBoard}
                options={{
                    tabBarLabel: 'News Board',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon as={Clipboard} color={focused ? 'blue' : 'black'} />
                    ),

                }}
            />

            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon as={UserCircle2} color={focused ? 'blue' : 'black'} />
                    ),
                    headerRight: () => (
                        <HStack px="$4">
                            <Icon as={SettingsIcon} color="black" />
                        </HStack>
                    )
                }}
            />
        </Tab.Navigator>
    )
}