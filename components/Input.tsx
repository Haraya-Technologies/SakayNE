import { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  darkTheme?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  icon,
  error,
  autoCapitalize = 'none',
  editable = true,
  darkTheme = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const bgColor = darkTheme ? Colors.pineShade + '60' : Colors.surface;
  const textColor = darkTheme ? Colors.pistachioCream : Colors.text;
  const placeholderColor = darkTheme ? Colors.oliveMist : Colors.textTertiary;
  const borderColor = darkTheme ? Colors.mossGreen + '40' : Colors.border;
  const borderColorFocused = darkTheme ? Colors.botanicalGreen : Colors.borderFocused;
  const iconColor = darkTheme ? Colors.sageLeaf : Colors.textTertiary;
  const iconColorFocused = darkTheme ? Colors.botanicalGreen : Colors.primary;

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-sm font-semibold mb-1.5" style={{ color: textColor }}>
          {label}
        </Text>
      )}
      <View
        className="flex-row items-center rounded-xl px-4"
        style={{
          borderWidth: isFocused ? 2 : 1,
          borderColor: error ? Colors.error : isFocused ? borderColorFocused : borderColor,
          backgroundColor: bgColor,
          height: 52,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? iconColorFocused : iconColor}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-base"
          style={{ color: textColor, padding: 0 }}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} hitSlop={8}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-xs mt-1 ml-1" style={{ color: Colors.error }}>
          {error}
        </Text>
      )}
    </View>
  );
}
