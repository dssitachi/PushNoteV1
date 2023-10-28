
import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, CircleIcon, HStack, Icon, Text, VStack } from "@gluestack-ui/themed"
import { useState } from "react";
import { getTasksByAssignee, updateTask } from "../services/task/task.service";
import { LayoutAnimation, UIManager } from "react-native";


if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EmployeeTaskItem({ task, setTasks }) {
	
	async function handleChange(checked) {
		try {
			const updatedTask = { ...task, status: checked ? "completed" : "pending" };
			await updateTask(updatedTask)
			const res = await getTasksByAssignee();
			setTasks(res.data)
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		} catch (err) {
			console.log('ehh')
			console.log(err);
		}
	}

	return (
		<VStack p="$4" mx="$4" my="$1" bg="#f8f5fa" rounded="$md" space="xs">
			
			<HStack alignItems="flex-start">
				<Checkbox size="md" isChecked={task.status == 'completed' ? true : false} aria-label="Task Completed" onChange={handleChange}>
					<CheckboxIndicator mr="$2">
						<CheckboxIcon as={CheckIcon} />
					</CheckboxIndicator>
				</Checkbox>

				<VStack space="xs">
					<Text isTruncated={true} strikeThrough={task.status == 'completed' ? true : false}>{task.title}</Text>
					<HStack alignItems="center" space="sm">
						<Text size="xs" color="#526D82">Deadline: {task.dueDate} by {task.dueTime} </Text>
						{(task.priority == "urgent") && (
                        <>
                            <Icon as={CircleIcon} color="#adb5bd" w="$1.5" h="$1.5" />
                            <Text size="xs" color="$red600" >Urgent</Text>
                        </>
                    )}
					</HStack>
				</VStack>
			</HStack>
			
		</VStack>
	)
}