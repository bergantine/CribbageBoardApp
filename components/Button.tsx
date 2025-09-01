import {Text, TouchableOpacity} from 'react-native';
import {cn} from '@/utils';

interface ButtonProps {
  player: number;
  pressFunction: () => void;
}

export default function Button({player, pressFunction}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'px-5 py-3 rounded-lg m-2',
        player === 1 ? 'bg-green-500 rotate-180 self-start' : 'bg-blue-500 self-end'
      )}
      onPress={() => {
        pressFunction();
      }}
    >
      <Text className="text-white text-base font-bold text-center">Player {player}</Text>
    </TouchableOpacity>
  );
}
