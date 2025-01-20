import React from 'react';
import { PressableProps, StyleProp, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { LinkProps } from 'expo-router';

interface ThemedLinkProps extends TextProps{
  children: string;
  onPress: () => void;
}

const ThemedLink = ({style, children, onPress}: ThemedLinkProps) => {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[
        {
          color: primaryColor,
          marginVertical: 20,
        },
        style,
      ]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ThemedLink;




// interface Props extends LinkProps {
//     children: string;

// }

// const ThemedLink = ({style, ...rest}:Props) => {
//     const primaryColor = useThemeColor({}, 'primary')
    
//   return (
//     <Link
//         style={[
//             {
//                 color: primaryColor,
//                 marginVertical: 20,
//             },
//             style
//         ]}
        
//         {...rest}
//     />
//   )
// }

// export default ThemedLink