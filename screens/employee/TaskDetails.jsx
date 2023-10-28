import { Divider, Fab, FabIcon, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { MessagesSquare } from "lucide-react-native";


export default function EmployeeTaskDetails({ route }) {
    const task = route.params.task
    const navigation = useNavigation();
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
				onPress={() => { navigation.navigate('Chat') }}
			>
				<FabIcon as={MessagesSquare} />
			</Fab>
        </VStack>

    )
}