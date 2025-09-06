import { View } from 'react-native';
import CribbageBoard from '@/components/CribbageBoard';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import { useState } from 'react';
import { useIOSShakeToUndo } from '@/utils';

export default function HomeScreen() {
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const [lastPointsAddedForPlayer, setLastPointsAddedForPlayer] = useState(0);

  interface AddPointsToBoardProps {
    player: number;
    points: number;
  }

  const addPointsToBoard = ({ player, points }: AddPointsToBoardProps) => {
    console.log(`Player ${player} added ${points} points`);

    if (player === 1) {
      const newPoints = player1Points + points;
      setPlayer1Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(1);
      console.log(`Player 1 points ${newPoints}`);

      if (newPoints > 120) {
        console.log('Player 1 won!');
      }
    }

    if (player === 2) {
      const newPoints = player2Points + points;
      setPlayer2Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(2);
      console.log(`Player 2 points ${newPoints}`);

      if (newPoints > 120) {
        console.log('Player 2 won!');
      }
    }
  };

  const handleShakeToUndo = () => {
    if (lastPointsAddedForPlayer === 1) {
      const newPoints = player1Points - lastPointsAdded;
      setPlayer1Points(newPoints);
      setLastPointsAdded(newPoints);
      setLastPointsAddedForPlayer(0);
      console.log(`Player 1 points ${newPoints}`);
    } else if (lastPointsAddedForPlayer === 2) {
      const newPoints = player2Points - lastPointsAdded;
      setPlayer2Points(newPoints);
      setLastPointsAdded(newPoints);
      setLastPointsAddedForPlayer(0);
      console.log(`Player 2 points ${newPoints}`);
    }
  };

  useIOSShakeToUndo(handleShakeToUndo);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 items-center justify-center bg-gray-100 px-8 pb-8 pt-16">
        <Button
          player={1}
          pressFunction={() => addPointsToBoard({ player: 1, points: 1 })}
          longPressFunction={() => addPointsToBoard({ player: 1, points: 5 })}
        />
        <CribbageBoard player1Points={player1Points} player2Points={player2Points} width={30} />
        <Button
          player={2}
          pressFunction={() => addPointsToBoard({ player: 2, points: 1 })}
          longPressFunction={() => addPointsToBoard({ player: 2, points: 5 })}
        />
      </View>
    </>
  );
}
