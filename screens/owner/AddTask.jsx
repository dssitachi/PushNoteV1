

import React, { useEffect, useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Text, ButtonText, FormControl, Input, VStack, Button, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Pressable, InputIcon, InputSlot, CalendarDaysIcon, HStack, Box, ClockIcon, ChevronDownIcon, Icon, RadioGroup, RadioIndicator, RadioIcon, CircleIcon, RadioLabel, Radio } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";


function AddTask() {
	const navigation = useNavigation();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [employees, setEmployees] = useState([]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("normal");
	const [dueDate, setDueDate] = useState("");
	const [dueTime, setDueTime] = useState("");
	const [assignedTo, setAssignedTo] = useState("");


	useEffect(() => {
		async function getEmployees() {
			try {
				const res = await axios.get("http://192.168.1.3:3000/employees")
				setEmployees(res.data)
			} catch (err) {
				console.log(err);
			}
		}
		getEmployees();
	}, []);

	async function assignTask() {
		const task = {
			title,
			description,
			dueDate,
			dueTime,
			assignee: assignedTo.name,
			assigneeId: assignedTo.userId,
			assignedBy: "Assigned By",
			status: "pending",
		};
		try {
			const res = await axios.post("http://192.168.1.3:3000/tasks", task);
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
			setShowDatePicker(false);
			setDate(currentDate);
			setDueDate(currentDate.toDateString());
		} else {
			setShowDatePicker(false);
		}
	}

	function onTimeChange({ type }, selectedDate) {
		if (type === "set") {
			const currentDate = selectedDate || date;
			setShowTimePicker(false);
			setTime(currentDate);
			setDueTime(currentDate.toLocaleTimeString());
		} else {
			setShowTimePicker(false);
		}
	}

	return (

		<VStack bg="$white">
			<FormControl
				p="$4"
			>
				<VStack space="md">
					<VStack space="xs">
						<Text size="md" fontWeight="bold">
							Title
						</Text>
						<Input>
							<InputField type="text" placeholder="Task Title..." value={title} onChangeText={(e) => { setTitle(e) }} />
						</Input>
					</VStack>
					<VStack space="xs">
						<Text size="md" fontWeight="bold">
							Description
						</Text>
						<Input>
							<InputField type="text" placeholder="Describe Task..." value={description} onChangeText={(e) => { setDescription(e) }}/>
						</Input>
					</VStack>

					{/* Assigned To Dropdown */}
					<VStack space="xs">
						<Text size="md" fontWeight="bold">
							To
						</Text>
						<Select onValueChange={(assignedTo) => { setAssignedTo(assignedTo) }} selectedValue={assignedTo}>
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
						<Text size="md" fontWeight="bold">
							Deadline
						</Text>
						<HStack space="md">
							<Box sx={{ w: 175 }}>
								<Input textAlign="center" isReadOnly={true}>
									<InputField value={dueTime} size="$sm" placeholder="Time" />
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
										display="spinner"
										value={time}
										onChange={onTimeChange}
									/>
								)}
							</Box>

							<Box sx={{ w: 175 }}>
								<Input textAlign="center" isReadOnly={true}>
									<InputField value={dueDate} size="$sm" placeholder="Date" />
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
										display="spinner"
										value={date}
										onChange={onDateChange}
									/>
								)}
							</Box>
						</HStack>

					</VStack>

					<VStack space="xs">
						<Text size="md" fontWeight="bold">
							Priority</Text>
						<RadioGroup>
							<HStack space="xl">
								<Radio value="normal" size="sm" onValueChange={(e) => { setPriority(e)}}>
									<RadioIndicator mr="$1">
										<RadioIcon as={CircleIcon} strokeWidth={1} />
									</RadioIndicator>
									<RadioLabel>Normal</RadioLabel>
								</Radio>
								<Radio value="urgent" size="sm" onValueChange={(e) => { setPriority(e)}}>
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
							<Button bg="#12475929" variant="outline" action="secondary">
								{/* {loading && <ButtonSpinner mr="$2" />} */}
								<ButtonText fontWeight="$normal" color="$black">Schedule Task</ButtonText>
							</Button>

							<Button
								onPress={assignTask}
								sx={{ width: '45%' }}
								bg="#124759"
							>
								<ButtonText color="$white">Assign Task</ButtonText>
							</Button>
						</HStack>
					</VStack>

				</VStack>

			</FormControl>

		</VStack>
	);
}

export default AddTask;