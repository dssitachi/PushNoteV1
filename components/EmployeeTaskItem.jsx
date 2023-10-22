
import { CheckIcon, Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, HStack, Text, VStack, View, set } from "@gluestack-ui/themed"
import axios from "axios";
import { useState } from "react";

export default function EmployeeTaskItem({ task }) {
	const [taskCompleted, setTaskCompleted] = useState(task.status == "completed");
	async function handleChange(checked) {
		try {
			const updatedTask = {...task, status: checked ? "completed" : "pending"};
			const res = await axios.patch("http://192.168.1.3:3000/tasks/updateTask", 
				updatedTask
			)
			setTaskCompleted(checked);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<VStack p="$4" mx="$4" my="$1" bg="#f8f5fa" rounded="$md">
			<HStack>
				<Checkbox size="md" isChecked={taskCompleted} aria-label="Task Completed" onChange={handleChange}>
					<CheckboxIndicator mr="$2">
						<CheckboxIcon as={CheckIcon} />
					</CheckboxIndicator>
				</Checkbox>
				<Text isTruncated={true} strikeThrough={taskCompleted}>{task.title}</Text>
			</HStack>
		</VStack>
	)
}