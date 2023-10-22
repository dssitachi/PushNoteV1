import { useState, useEffect } from 'react'
import { FlatList, View } from "@gluestack-ui/themed";
import axios from "axios";
import EmployeeTaskItem from "../../components/EmployeeTaskItem";
import { Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export default function EmployeeTask({ route }) {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        async function getTasks() {
            try {
                const res = await axios.get("http://192.168.1.3:3000/tasks/tasksByAssignee")
                setTasks(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getTasks();
    }, [route]);

    return (
        <View flex={1} bg="#fff">

            <FlatList data={tasks} renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate('TaskDetails', { task: item })}>
                <EmployeeTaskItem
                    key={item.taskId}
                    task={item}
                />
                </Pressable>
            )} />

        </View>
    )
}