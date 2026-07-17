import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface VehicleCardProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export function VehicleCard({ name, icon, color }: VehicleCardProps) {
  return (
    <View className="items-center mx-2">
      <View
        className="w-16 h-16 rounded-2xl items-center justify-center"
        style={{ backgroundColor: color + '15' }}
      >
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text className="text-xs font-medium mt-2" style={{ color: Colors.textSecondary }}>
        {name}
      </Text>
    </View>
  );
}
