import {View} from 'react-native';
import CribbageBoard from '@/components/CribbageBoard';
import {Stack} from 'expo-router';
import Button from '@/components/Button';
import {useState} from 'react';

export default function HomeScreen() {
  let [player1Points, setPlayer1Points] = useState(0);
  let [player2Points, setPlayer2Points] = useState(0);

  interface AddPointsToBoardProps {
    player: number;
    points: number;
  }

  const addPointsToBoard = ({player, points}: AddPointsToBoardProps) => {
    console.log(`Player ${player} added ${points} points`);

    if (player === 1) {
      const newPoints = player1Points + points;
      setPlayer1Points(newPoints);
      console.log(`Player 1 points ${newPoints}`);
    }

    if (player === 2) {
      const newPoints = player2Points + points;
      setPlayer2Points(newPoints);
      console.log(`Player 2 points ${newPoints}`);
    }
  };

  return (
    <>
      <Stack.Screen options={{headerShown: false}} />

      <View className="flex-1 bg-gray-100 items-center justify-center pb-8 pt-16 px-8">
        <Button
          player={1}
          pressFunction={() => addPointsToBoard({player: 1, points: 1})}
          longPressFunction={() => addPointsToBoard({player: 1, points: 5})}
        />
        <CribbageBoard player1Points={player1Points} player2Points={player2Points} width={30} />
        <Button
          player={2}
          pressFunction={() => addPointsToBoard({player: 2, points: 1})}
          longPressFunction={() => addPointsToBoard({player: 2, points: 5})}
        />
      </View>
    </>
  );
}
