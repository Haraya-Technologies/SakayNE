import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
}: ButtonProps) {
  const sizeClasses = {
    sm: 'py-2.5 px-4',
    md: 'py-3.5 px-6',
    lg: 'py-4 px-8',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={`rounded-xl ${sizeClasses[size]} items-center justify-center flex-row`}
          style={{
            opacity: disabled ? 0.5 : 1,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              {icon && <View className="mr-2">{icon}</View>}
              <Text className={`text-white font-bold ${textSizes[size]}`}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        className={`rounded-xl ${sizeClasses[size]} items-center justify-center flex-row`}
        style={{
          width: fullWidth ? '100%' : undefined,
          borderColor: Colors.primary,
          borderWidth: 2,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`font-bold ${textSizes[size]}`} style={{ color: Colors.primary }}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={fullWidth ? { width: '100%' } : undefined}
        className={`rounded-xl ${sizeClasses[size]} items-center justify-center flex-row`}
      >
        {loading ? (
          <ActivityIndicator color={Colors.textSecondary} size="small" />
        ) : (
          <Text className={`font-semibold ${textSizes[size]}`} style={{ color: Colors.textSecondary }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      <View
        className={`rounded-xl ${sizeClasses[size]} items-center justify-center flex-row`}
        style={{ backgroundColor: Colors.secondary, opacity: disabled ? 0.5 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color={Colors.text} size="small" />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`font-bold ${textSizes[size]}`} style={{ color: Colors.text }}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
