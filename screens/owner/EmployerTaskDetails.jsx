import { Button, ButtonText, Divider, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


export default function EmployerTaskDetails({ route }) {
    const task = route.params.task
    const navigation = useNavigation()
    async function approveTask() {
        try {
            const res = await axios.patch(`http://192.168.1.3:3000/tasks/${task.taskId}`)
            navigation.navigate('Tasks', { 'refresh': true });
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <VStack bg="$white" flex={1} p="$4" space="md">
            <VStack>
                <Text fontSize="$xl" fontWeight="$500">
                    {task.title}
                </Text>
            </VStack>
            <VStack space="xs">
                <Text>
                    Task Description
                </Text>
                <VStack h="$40" bg="#f8f5fa" p="$4" rounded="$md">
                    <Text>{task.description}</Text>
                </VStack>
            </VStack>

            <VStack space="xs" >
                <Text fontWeight="$500">
                    To
                </Text>
                <Text bg="#f8f5fa" p="$2" rounded="$md">
                    {task.assignee}
                </Text>
            </VStack>

            <VStack space="xs" >
                <Text fontWeight="$500">
                    Deadline
                </Text>

                <HStack justifyContent="space-between" space="sm">
                    <VStack bg="#f8f5fa" flex={1} px="$2" py="$1">
                        <Text size="xs">TIME</Text>
                        <Text>{task.dueTime}</Text>
                    </VStack>
                    <VStack bg="#f8f5fa" flex={1} px="$2" py="$1">
                        <Text size="xs">DATE</Text>
                        <Text>{task.dueDate}</Text>
                    </VStack>
                </HStack>
            </VStack>

            <VStack space="xs" >
                <Text fontWeight="$500">
                    Priority
                </Text>
                <Text bg="#f8f5fa" p="$2" rounded="$md">
                    {task.priority}
                </Text>
            </VStack>

            <VStack>
            <Button
                onPress={approveTask}
                bg="#124759"
            >
                <ButtonText color="$white" fontWeight="$500">Approve Task</ButtonText>
            </Button>
            </VStack>
        </VStack>
    )
}