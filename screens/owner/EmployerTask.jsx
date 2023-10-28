import { useEffect, useState } from 'react'
import EmployerTaskItem from "../../components/EmployerTaskItem";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText, AddIcon, Box, Button, ButtonText, Divider, Fab, FabIcon, FlatList, HStack, Icon, Pressable, Text, VStack, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { SlidersHorizontalIcon } from "lucide-react-native";

export default function EmployerTask({ route }) {
	const navigation = useNavigation();
	const [tasks, setTasks] = useState([]);
	const [taskType, setTaskType] = useState('pending');
	const [showActionsheet, setShowActionsheet] = useState(false)
	
	function handleAddTask() {
		navigation.navigate('AddTask');
	}

	function handleNavigation(task) {
		if(taskType == 'pending')
			navigation.navigate('EditTask', { task })
		else if(taskType == 'completed') 
			navigation.navigate('TaskDetails', {task})
	}

	function handleClose() {
		setShowActionsheet(!showActionsheet)
	} 

	function handleFilterTask(type) {
		setTaskType(type)
		handleClose()
	}

	useEffect(() => {
		async function getAssignedTasks() {
			try {
				const res = await axios.get(`http://192.168.1.3:3000/tasks/${taskType}`)
				setTasks(res.data)
			} catch (err) {
				console.log(err);
			}
		}
		getAssignedTasks();
	}, [route, taskType]);

	return (
		<View flex={1} bg="#fff" px="$1">
			<VStack px="$2" pb="$2">
				<Box alignSelf="right" >
					<Pressable onPress={handleClose}>
						<HStack justifyContent="flex-end" alignItems="center" space="xs">
						<Icon as={SlidersHorizontalIcon}/>
						<Text size="sm">FILTER</Text>
						</HStack>
					</Pressable>
					<Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
						<ActionsheetBackdrop />
						<ActionsheetContent  zIndex={999}>
							<ActionsheetDragIndicatorWrapper>
								<ActionsheetDragIndicator />
							</ActionsheetDragIndicatorWrapper>
							<ActionsheetItem onPress={() => { handleFilterTask('pending') }}>
								<ActionsheetItemText>Pending</ActionsheetItemText>
							</ActionsheetItem>
							<ActionsheetItem onPress={() => {  handleFilterTask('completed') }}>
								<ActionsheetItemText>Completed</ActionsheetItemText>
							</ActionsheetItem>
							<ActionsheetItem onPress={() => { handleFilterTask('approved') }}>
								<ActionsheetItemText>Approved</ActionsheetItemText>
							</ActionsheetItem>
						</ActionsheetContent>
					</Actionsheet>
				</Box>
			</VStack>

			<FlatList data={tasks} renderItem={({ item }) => (
				<Pressable onPress={() => {handleNavigation(item) }}>
					<EmployerTaskItem
						key={item.taskId}
						task={item}
					/>
				</Pressable>
			)} />

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