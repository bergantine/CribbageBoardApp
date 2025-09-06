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
        'm-2 px-5 py-3 bg-surface-lowContrast w-[160px] h-[160px] rounded-full flex items-center justify-center',
        player === 1 ? 'rotate-180 self-start' : 'self-end'
      )}
      onPress={() => {
        pressFunction();
      }}
      onLongPress={() => {
        longPressFunction();
      }}>
      <Text
        className={cn(
          'text-center text-7xl font-bold',
          player === 1 ? 'text-brand-green' : 'text-brand-blue'
        )}>
        +
      </Text>
    </TouchableOpacity>
  );
}
