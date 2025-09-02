import { Text, TouchableOpacity } from 'react-native';
import { cn } from '@/utils';

interface ButtonProps {
  player: number;
  pressFunction: () => void;
  longPressFunction: () => void;
}

export default function Button({ player, pressFunction, longPressFunction }: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'm-2 rounded-lg px-5 py-3',
        player === 1 ? 'rotate-180 self-start bg-green-500' : 'self-end bg-blue-500'
      )}
      onPress={() => {
        pressFunction();
      }}
      onLongPress={() => {
        longPressFunction();
      }}>
      <Text className="text-center text-base font-bold text-white">Player {player}</Text>
    </TouchableOpacity>
  );
}
