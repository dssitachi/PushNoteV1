import EmployerTask from "./EmployerTask";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BellIcon, HStack, Icon, SearchIcon, SettingsIcon } from "@gluestack-ui/themed";
import { Clipboard, ListTodo, UserCircle2 } from "lucide-react-native";
import EmployerNoticeBoard from "./EmployerNoticeBoard";
import Profile from "../Profile";

const Tab = createBottomTabNavigator();
export default function EmployerHome() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Task" component={EmployerTask}
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
            <Tab.Screen name="NewsBoard" component={EmployerNoticeBoard}
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