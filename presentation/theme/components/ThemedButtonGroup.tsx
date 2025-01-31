import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedView } from './ThemedView';

interface Props {
  options: string[];
  selectedOptions: string[];

  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {

  const primaryColor = useThemeColor({}, 'primary');

  return (
    <ThemedView style={styles.container}>
      {
        options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.button,
              selectedOptions.includes(option) && { backgroundColor: primaryColor }
            ]}
          >
            <ThemedText
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.buttonText,
                selectedOptions.includes(option) && styles.selectedButtonText
              ]}
            >
              {/* esto es para que la primera letra sea mayúscula */}
              {option[0].toUpperCase() + option.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))
      }
    </ThemedView>
  )
}

export default ThemedButtonGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    //fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#fff',
  }
})