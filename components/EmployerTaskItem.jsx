import React from 'react'
import { Avatar, AvatarFallbackText, Badge, BadgeText, Button, ButtonIcon, ButtonText, HStack, Icon, MessageCircleIcon, Text, VStack } from "@gluestack-ui/themed"
import { BellRing, TrashIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native";

export default function EmployerTaskItem({task}) {
    return (
        <VStack px="$2" m="$2" bg="$white" space="sm" borderWidth="$1" borderColor="#d3d3d3">
            <VStack>
                <HStack gap="$2" pt="$2">
                    <Badge size="sm" variant="solid" borderRadius="$none" action="error">
                        <BadgeText>{task.priority}</BadgeText>
                    </Badge>
                    <Badge size="sm" variant="solid" borderRadius="$none" action="info">
                        <BadgeText>Deadline: 12/2/23 By 7pm</BadgeText>
                    </Badge>
                </HStack>
            </VStack>

            <VStack>
                <Text fontWeight="semibold">{ task.title }</Text>
            </VStack>

            <HStack justifyContent="space-between" alignItems="center"  borderTopWidth="$1" borderColor="#d3d3d3">
                <Avatar bgColor="#124759" size="xs" borderRadius="$full">
                    <AvatarFallbackText>{ task.assignee }</AvatarFallbackText>
                </Avatar>

                <HStack space="$sm">
                    <Button
                        p="$0"
                        size="sm"
                        bg="$white"
                        borderRadius="$none">
                        <ButtonIcon as={MessageCircleIcon} color="$black" m="$0" p="$0" />
                    </Button>
                    <Button
                        size="sm"
                        bg="$white"
                        borderRadius="$none">
                        <ButtonIcon as={BellRing} color="$black" />
                    </Button>
                    <Button
                        size="sm"
                        bg="$white"
                        borderRadius="$none">
                        <ButtonIcon as={TrashIcon} color="$red" />
                    </Button>
                </HStack>
            </HStack>

        </VStack>
    )
}