

import React, { useState } from 'react';
import useAuth from "../context/AuthContext";
import { useNotifications } from "../usePushNotifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Box, ButtonSpinner, EyeIcon,
	EyeOffIcon, Input, InputField,
	InputSlot, LinkText, VStack,
	Text, View, InputIcon,
	Button, ButtonText, Link, HStack
} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native";

export default function Register() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { expoPushToken } = useNotifications();
	const [loading, setLoading] = useState(false);

	const { onRegister } = useAuth();
	async function handleRegister() {
		console.log(expoPushToken)
		await onRegister(name, email, password, expoPushToken);
	};

	function navigateToLogin() {
        navigation.navigate('Login');
    }

	const [showPassword, setShowPassword] = useState(false)
	function handleState() {
		setShowPassword((showState) => {
			return !showState
		})
	}

	return (

		<View style={
			{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				flex: 1,
				justifyContent: 'center',
			}
		}>
			<Box p="$4">
				<Text size="2xl" bold="true" pb="$4">Create an account</Text>
				<VStack space="md">
					<VStack space="xs">
						<Text>
							Name
						</Text>
						<Input isDisabled={loading}>
							<InputField type="text" placeholder="John Dier" value={name} onChangeText={(e) => { setName(e) }} />
						</Input>
					</VStack>


					<VStack space="xs">
						<Text>
							Email
						</Text>
						<Input isDisabled={loading}>
							<InputField type="text" placeholder="you@example.com" value={email} onChangeText={(e) => { setEmail(e) }} />
						</Input>
					</VStack>

					<VStack space="xs">
						<Text>
							Password
						</Text>
						<Input textAlign="center" isDisabled={loading}>
							<InputField type={showPassword ? "text" : "password"} value={password} onChangeText={(e) => { setPassword(e) }} />
							<InputSlot pr="$3" onPress={handleState}>
								<InputIcon
									as={showPassword ? EyeIcon : EyeOffIcon}
									color="$darkBlue500"
								/>
							</InputSlot>
						</Input>

					</VStack>

					

					<Button onPress={handleRegister} bg="#124759" variant="outline" action="secondary" isDisabled={loading} border="$none">
						{loading && <ButtonSpinner mr="$2" />}
						<ButtonText fontWeight="$normal" color="$white">Create an account</ButtonText>
					</Button>

					<Button bg="#12475929" onPress={navigateToLogin} isDisabled={loading}>
						{loading && <ButtonSpinner mr="$2" />}
						<ButtonText color="$black">Log In</ButtonText>
					</Button>
				</VStack>
			</Box>
		</View>
	);
}