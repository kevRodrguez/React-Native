import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { usePushNotifications } from '@/hooks/usePushNotifications'

const PushApp = () => {
    const { expoPushToken, notifications } = usePushNotifications()

    return (
        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            {/* <ThemedText>Token: {expoPushToken}</ThemedText> */}

            <ThemedText
                style={{
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}
            >
                Notificaciones!!!
            </ThemedText>

            <FlatList
                data={notifications}
                keyExtractor={item => item.request.identifier}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc'
                        }}
                    >
                        <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {item.request.content.title}
                        </ThemedText>

                        <ThemedText>{item.request.content.body}</ThemedText>

                        <ThemedText>{JSON.stringify(item.request.content.data, null, 2)}</ThemedText>
                    </View>
                )}

                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: 'grey', opacity: 0.3 }} />
                )}
            />
        </View>
    )
}

export default PushApp