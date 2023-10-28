import { Divider, HStack, Text, VStack } from "@gluestack-ui/themed";


export default function ApproveTask({ route }) {
    const task = route.params.task
    return (
        
        <VStack bg="$white" flex={1} p="$4" space="md">
            <VStack>
                <Text fontSize="$xl" fontWeight="bold">
                    {task.title} 
                </Text>
            </VStack>
            <VStack space="xs">
                <Text>
                    Task Description
                </Text>
                <VStack h="$40" bg="#f8f5fa" p="$2" rounded="$md">
                    <Text>{task.description}</Text>
                </VStack>
            </VStack>

            <HStack justifyContent="space-between">
                <Text>
                    Due Date
                </Text>
                <Text>
                    {task.dueDate}
                </Text>

            </HStack>

            <Divider my="$0.5" />

            <HStack justifyContent="space-between">
                <Text>
                    Time
                </Text>
                <Text>
                    {task.dueTime}
                </Text>
            </HStack>

            <Divider my="$0.5" />
            <HStack justifyContent="space-between">
                <Text>
                    Mark As Done
                </Text>
                <Text>

                </Text>
            </HStack>

        </VStack>

    )
}