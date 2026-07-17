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
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-sm font-semibold mb-1.5" style={{ color: Colors.text }}>
          {label}
        </Text>
      )}
      <View
        className="flex-row items-center rounded-xl px-4"
        style={{
          borderWidth: isFocused ? 2 : 1,
          borderColor: error ? Colors.error : isFocused ? Colors.borderFocused : Colors.border,
          backgroundColor: Colors.surface,
          height: 52,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? Colors.primary : Colors.textTertiary}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-base"
          style={{ color: Colors.text, padding: 0 }}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
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
              color={Colors.textTertiary}
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
