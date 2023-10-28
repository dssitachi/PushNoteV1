
import { Button, ButtonIcon, ButtonText, HStack, Pressable, Text, VStack, View } from "@gluestack-ui/themed"
import { Power } from "lucide-react-native"
import React from 'react'
import useAuth from "../context/AuthContext";

export default function Profile() {
    const { onLogout } = useAuth();
    function handleLogut() {
		onLogout()
	}
    return (
        <VStack flex={1} bg="$white" p="$4" space="md">
            <Text>Name</Text>
            <Text>John Doe</Text>

            <Text>Email</Text>
            <Text>johndoe@example.com</Text>

            <Pressable
                rounded="$xs"
                bg="$white"
                alignSelf="flex-start"
                onPress={handleLogut}
            >
                <HStack space="sm" alignItems="center">
                <ButtonIcon as={Power} color="$red600" />
                <ButtonText color="$red600" fontWeight="bold">Logout </ButtonText>
                </HStack>
            </Pressable>
        </VStack>
    )
}