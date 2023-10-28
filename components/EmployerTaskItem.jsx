import React from 'react'
import { Avatar, AvatarFallbackText, CircleIcon, HStack, Icon, MessageCircleIcon, Pressable, Text, VStack } from "@gluestack-ui/themed"
import { BellRing, TrashIcon } from "lucide-react-native"

export default function EmployerTaskItem({ task }) {
    
    return (
        <VStack px="$2" m="$2" bg="$white" space="sm" borderWidth="$1" borderColor="#b3b3b329" rounded="$md">
            <VStack>
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

            <VStack>
                <Text fontWeight="semibold">{task.title}</Text>
            </VStack>

            <HStack justifyContent="space-between" alignItems="center" borderTopWidth="$1" borderColor="#b3b3b329">
                <Avatar bgColor="#124759" size="xs" borderRadius="$full">
                    <AvatarFallbackText>{task.assignee}</AvatarFallbackText>
                </Avatar>

                <HStack space="xl" py="$2" alignItems="center">
                    <Pressable>
                        <Icon as={MessageCircleIcon} w="$4" h="$4" />
                    </Pressable>
                    <Pressable>
                        <Icon as={BellRing} w="$4" h="$4" />
                    </Pressable>
                    <Pressable>
                        <Icon as={TrashIcon} w="$4" h="$4" color="$red" />
                    </Pressable>

                </HStack>
            </HStack>

        </VStack>
    )
}