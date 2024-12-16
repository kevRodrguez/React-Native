import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string,
    color?: 'primary' | 'secondary' | 'tertiary',

    variant?: 'contained' | 'text-only',
    className?: string,
}

const CustomButton = React.forwardRef(
    ({ children, color = 'primary', onPress, onLongPress, variant = 'contained', className }: Props,
        ref: React.Ref<View>) => {

        const btnColor = {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            tertiary: 'bg-tertiary',
        }[color];

        const textColor = {
            primary: 'text-primary',
            secondary: 'text-secondary-100',
            tertiary: 'text-tertiary',
        }[color];

        if (variant === 'text-only') {
            return (
                <Pressable
                    className={`p-3 ${className} rounded-xl`}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    ref={ref}
                >
                    <Text className={` text-center ${textColor} font-work-medium `}>{children}</Text>
                </Pressable>
            )
        }

        return (
            <Pressable
                className={`p-3 rouded-md ${btnColor} ${className} active:opacity-90 mb-5 rounded-xl`}
                onPress={onPress}
                onLongPress={onLongPress}
                ref={ref}>
                <Text className='text-white text-center  font-work-medium'>{children}</Text>
            </Pressable>
        )
    });

export default CustomButton

//Segunda forma de hacer sin usar forwardRef

// const CustomButton = ({ children, color = 'primary', onPress, onLongPress }: Props) => {

//     const btnColor = {
//         primary: 'bg-primary',
//         secondary: 'bg-secondary',
//         tertiary: 'bg-tertiary',
//     }[color];

//     return (
//         <Pressable
//             className={`p-3 rouded-md ${btnColor} active:opacity-90 mb-5`}
//             onPress={onPress}
//             onLongPress={onLongPress}>
//             <Text className='text-white text-center '>{children}</Text>
//         </Pressable>
//     )

// };
// export default CustomButton;