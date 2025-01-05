import { View, Text, ActivityIndicator, ImageStyle, StyleProp, Image, Animated } from 'react-native'
import React, { useState } from 'react'
import { useAnimation } from '@/hooks/useAnimation'

interface Props {
    uri: string
    style?: StyleProp<ImageStyle>
}

const FadeInImage = ({ uri, style }: Props) => {
    const [isLoading, setisLoading] = useState(true)
    
    const {fadeIn, animatedOpacity} = useAnimation()

    return (
        <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading && (
                    <ActivityIndicator
                        style={{ position: 'absolute' }}
                        color="gray"
                        size={30}
                    />
                )
            }

            <Animated.Image
                source={{ uri }}
                style={[style, { opacity: animatedOpacity }]}
                onLoadEnd={() => {
                    fadeIn({})
                    setisLoading(false)
                }}
            />

        </Animated.View>
    )
}

export default FadeInImage