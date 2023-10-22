import React, { useEffect } from 'react'
import EmployerTaskItem from "../../components/EmployerTaskItem";
import { AddIcon, Fab, FabIcon, FlatList, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function EmployerTask({route}) {
	const navigation = useNavigation();
	const [tasks, setTasks] = React.useState([]);
	function handleAddTask() {
		navigation.navigate('AddTask');
	}

	useEffect(() => {
		async function getTasks() {
			try {
				const res = await axios.get("http://192.168.1.3:3000/tasks")
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
				<EmployerTaskItem
					key={item.taskId}
					task={item}
				/>
			)} />

			{/* <EmployerTaskItem /> */}
			<Fab
				size="lg"
				placement="bottom right"
				isHovered={false}
				isDisabled={false}
				isPressed={false}
				sx={{
					paddingVertical: 25,
					paddingHorizontal: 25,
					backgroundColor: "#124759",
				}}
				onPress={handleAddTask}
			>
				<FabIcon as={AddIcon} />
			</Fab>
		</View>
	)
}