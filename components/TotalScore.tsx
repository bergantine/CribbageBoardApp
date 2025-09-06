import { cn } from '@/utils';
import { Text } from 'react-native';

interface TotalScoreProps {
  player: number;
  points: number;
}

export default function TotalScore({ player, points }: TotalScoreProps) {
  return (
    <Text
      className={cn(
        'absolute font-bold text-base',
        player === 1
          ? 'text-brand-green left-40 rotate-180 bottom-[75%]'
          : 'text-brand-blue right-40 top-[75%]'
      )}>
      {points}
      <Text className="text-sm text-surface-subtle font-normal"> / 121</Text>
    </Text>
  );
}
