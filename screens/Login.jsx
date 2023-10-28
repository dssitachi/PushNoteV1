import React, { useState } from 'react';
import useAuth from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "../usePushNotifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { 
    Box, ButtonSpinner, EyeIcon, 
    EyeOffIcon, Input, InputField, 
    InputSlot, LinkText, VStack,
    Text, View, InputIcon,
    Button, ButtonText, Link
} from "@gluestack-ui/themed";

export default function Login() {
    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { onLogin } = useAuth();
    const navigation = useNavigation();
    const { expoPushToken } = useNotifications();

    async function handleLogin() {
        setLoading(true);
        try {
            await onLogin(email, password, expoPushToken);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    function handleRegister() {
        navigation.navigate('Register');
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
                <Text size="2xl" bold="true" pb="$4">Sign in to PushNote</Text>
                <VStack space="md">
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
                        <Link>
                            <LinkText textAlign="right" size="xs">Forgot Password?</LinkText>
                        </Link>
                    </VStack>

                    <Button bg="#124759" onPress={handleLogin} isDisabled={loading}>
                        {loading && <ButtonSpinner mr="$2" />}
                        <ButtonText color="$white">Log In</ButtonText>
                    </Button>

                    <Button onPress={handleRegister} bg="#12475929" variant="outline" action="secondary" isDisabled={loading}>
                        <ButtonText fontWeight="$normal" color="$black">Create an account</ButtonText>
                    </Button>

                </VStack>
            </Box>
        </View>
    );
}
