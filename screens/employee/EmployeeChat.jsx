import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { sendMessage } from "../../services/chat.service"


export function Chat() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',

                },
            },
        ])
    }, [])

    const onSend = useCallback(async(messages = []) => {
        console.log(messages)
        await sendMessage( {
            message: messages[0].text,
            sender: "Qwer",
            receiver: "Admin",
            timestamp: messages[0].createdAt
        })
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}