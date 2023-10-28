

import React, { useEffect, useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, ButtonText, FormControl, Input, VStack, Button, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Pressable, InputIcon, InputSlot, CalendarDaysIcon, HStack, Box, ClockIcon, ChevronDownIcon, Icon, RadioGroup, RadioIndicator, RadioIcon, CircleIcon, RadioLabel, Radio } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { getEmployees, updateTask } from "../../services/task/task.service";


function EditTask({ route }) {
    const taskData = route.params.task;
	const navigation = useNavigation();
	
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	
	const [employees, setEmployees] = useState([]);

	const [task, setTask] = useState({...taskData, assignedTo: {assignee: taskData.assignee, assigneeId: taskData.assigneeId}});

	function handleTask(type, value) {
		setTask({
			...task,
			[type]: value,
		});
	}
	
	useEffect(() => {
		async function fetchEmployees() {
			try {
				const res = await getEmployees()
				setEmployees(res.data)
			} catch (err) {
				console.log(err);
			}
		}
		fetchEmployees();
	}, []);

	async function handleUpdateTask() {
		const updatedTaskData = {
			...task,
			assignee: task.assignedTo.name,
			assigneeId: task.assignedTo.userId,
		};
		try {
			const res = await updateTask(updatedTaskData)
			navigation.navigate('Tasks', {'refresh': true});
		} catch (err) {
			console.log(err);
		}
	}

	function toggleDatePicker() {
		setShowDatePicker(!showDatePicker);
	}

	function toggleTimePicker() {
		setShowTimePicker(!showTimePicker);
	}

	function onDateChange({ type }, selectedDate) {
		if (type === "set") {
			const currentDate = selectedDate || date;
			const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
			setShowDatePicker(false);
			setDate(currentDate);
			handleTask('dueDate', formattedDate);
		} else {
			setShowDatePicker(false);
		}
	}

	function onTimeChange({ type }, selectedDate) {
		if (type === "set") {
			const currentDate = selectedDate || date;
			const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
			setShowTimePicker(false);
			setTime(currentDate);
			handleTask('dueTime', formattedTime)
		} else {
			setShowTimePicker(false);
		}
	}

	return (
		<VStack bg="$white" flex={1}>
			<FormControl p="$4">
				<VStack space="md">
					<VStack space="xs">
						<Text fontWeight="$500">
							Title
						</Text>
						<Input>
							<InputField type="text" placeholder="Task Title" value={task.title} onChangeText={(e) => { handleTask('title', e) }} />
						</Input>
					</VStack>
					<VStack space="xs">
						<Text fontWeight="$500">
							Description
						</Text>
						<Input>
							<InputField type="text" placeholder="Describe Task" value={task.description} onChangeText={(e) => { handleTask('description', e) }}/>
						</Input>
					</VStack>

					{/* Assigned To Dropdown */}
					<VStack space="xs">
						<Text size="md" fontWeight="$500">
							To
						</Text>
						<Select onValueChange={(assignedTo) => { handleTask('assignedTo', assignedTo) }} selectedValue={task.assignedTo.assignee}>
							<SelectTrigger>
								<SelectInput placeholder="Select member" />
								<SelectIcon mr="$3">
									<Icon as={ChevronDownIcon} />
								</SelectIcon>
							</SelectTrigger>
							<SelectPortal>
								<SelectBackdrop />
								<SelectContent>
									<SelectDragIndicatorWrapper>
										<SelectDragIndicator />
									</SelectDragIndicatorWrapper>
									{
										employees.map((employee) => (
											<SelectItem label={employee.name} value={employee} key={employee.userId} />
										))
									}
								</SelectContent>
							</SelectPortal>
						</Select>
					</VStack>

					<VStack space="xs">
						<Text size="md" fontWeight="$500">
							Deadline
						</Text>
						<HStack space="sm">
							<Box flex={1}>
								<Input textAlign="center" isReadOnly={true}>
									<InputField value={task.dueTime} size="$sm" placeholder="Time" />
									<InputSlot pr="$3" onPress={toggleTimePicker}>
										{/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
										<InputIcon
											as={ClockIcon}
											color="$darkBlue500"
										/>
									</InputSlot>
								</Input>

								{showTimePicker && (
									<DateTimePicker
										mode="time"
										display="default"
										value={time}
										onChange={onTimeChange}
									/>
								)}
							</Box>

							<Box flex={1}>
								<Input textAlign="center" isReadOnly={true}>
									<InputField value={task.dueDate} size="$sm" placeholder="Date" />
									<InputSlot pr="$3" onPress={toggleDatePicker}>
										<InputIcon
											as={CalendarDaysIcon}
											color="$darkBlue500"
										/>
									</InputSlot>
								</Input>

								{showDatePicker && (
									<DateTimePicker
										mode="date"
										display="default"
										value={date}
										onChange={onDateChange}
									/>
								)}
							</Box>
						</HStack>

					</VStack>

					<VStack space="xs">
						<Text size="md" fontWeight="$500">
							Priority</Text>
						<RadioGroup value={task.priority} onChange={(e) => { handleTask('priority', e)}}>
							<HStack space="xl">
								<Radio value="normal" size="sm">
									<RadioIndicator mr="$1">
										<RadioIcon as={CircleIcon} strokeWidth={1} />
									</RadioIndicator>
									<RadioLabel>Normal</RadioLabel>
								</Radio>
								<Radio value="urgent" size="sm">
									<RadioIndicator mr="$1">
										<RadioIcon as={CircleIcon} strokeWidth={1}  />
									</RadioIndicator>
									<RadioLabel>Urgent</RadioLabel>
								</Radio>
							</HStack>
						</RadioGroup>
					</VStack>

					<VStack pt="$2">
						<HStack justifyContent="space-between" alignItems="center"
							space="sm"
						>
							<Button
								onPress={handleUpdateTask}
								bg="#124759"
								flex={1}
							>
								<ButtonText color="$white" fontWeight="$500">Update Task</ButtonText>
							</Button>
						</HStack>
					</VStack>

				</VStack>

			</FormControl>

		</VStack>
	);
}

export default EditTask;