import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon, FlatList, HStack, Icon, Link, LinkText, Text, View } from "@gluestack-ui/themed";
import EmployeeTaskItem from "../../components/EmployeeTaskItem";
import { Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import React from 'react';
import { getTasksByAssignee } from "../../services/task/task.service";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EmployeeTask({ route }) {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [open, setIsOpen] = useState([true, true]);

    function onPress(index) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newState = [...open];
        newState[index] = !newState[index]
        setIsOpen(newState);
    }

    useEffect(() => {
        async function getTasks() {
            try {
                const res = await getTasksByAssignee();
                setTasks(res.data)
            } catch (err) {
                console.log('eh')
                console.log(err);
            }
        }
        getTasks();
    }, [route]);

    return (
        <View flex={1} bg="#fff">

            {
                tasks.map((task, index) => (
                    <React.Fragment key={index}>
                        <Pressable onPress={() => { onPress(index) }}>
                            <HStack alignItems="center">
                                <Text pl="$4" pr="$2" py="$2">{task.title}</Text>
                                {open.at(index) ?
                                    <Icon as={ChevronUpIcon}  w="$4" h="$4" />
                                    :<Icon as={ChevronDownIcon} w="$4" h="$4" /> 
                                }
                            </HStack>
                        </Pressable>
                        {
                            open.at(index) &&
                            (
                                <FlatList style={{ flexGrow: 0 }} data={task.data} renderItem={({ item }) => (
                                    <Pressable onPress={() => navigation.navigate('TaskDetails', { task: item })}>
                                        <EmployeeTaskItem
                                            key={item.taskId}
                                            task={item}
                                            setTasks={setTasks}
                                        />
                                    </Pressable>
                                )} />
                            )
                        }
                    </React.Fragment>
                ))
            }



        </View>
    )
}