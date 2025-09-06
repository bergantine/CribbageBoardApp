import { View } from 'react-native';
import CribbageBoard from '@/components/CribbageBoard';
import { Stack } from 'expo-router';
import AddButton from '@/components/AddButton';
import { useState } from 'react';
import { useIOSShakeToUndo } from '@/utils';
import TurnScore from '@/components/TurnScore';

export default function HomeScreen() {
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [player1TurnPoints, setPlayer1TurnPoints] = useState(0);
  const [player2TurnPoints, setPlayer2TurnPoints] = useState(0);
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const [lastPointsAddedForPlayer, setLastPointsAddedForPlayer] = useState(0);

  const checkIfWon = (player: number, newPoints: number) => {
    if (newPoints > 120) {
      const otherPlayerPoints = player === 1 ? player2Points : player1Points;
      const winner = player === 1 ? 'Green' : 'Blue';

      if (otherPlayerPoints <= 60) {
        console.log('Double skunk!');
      } else if (otherPlayerPoints <= 90) {
        console.log('Skunk!');
      } else {
        console.log(`Player ${winner} won!`);
      }

      setTimeout(() => {
        resetGame();
      }, 5000);
    }
  };

  const resetGame = () => {
    setPlayer1Points(0);
    setPlayer2Points(0);
    setLastPointsAdded(0);
    setLastPointsAddedForPlayer(0);
    console.log('Game reset');
  };

  interface AddPointsToBoardProps {
    player: number;
    points: number;
  }

  const addPointsToBoard = ({ player, points }: AddPointsToBoardProps) => {
    console.log(`Player ${player} added ${points} points`);

    if (player === 1) {
      if (lastPointsAddedForPlayer === 1) {
        const newPoints = player1TurnPoints + points;
        setPlayer1TurnPoints(newPoints);
        console.log(`Player 1 turn points ${newPoints}`);
      } else {
        setPlayer1TurnPoints(1);
      }

      const newPoints = player1Points + points;
      setPlayer1Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(1);
      console.log(`Player 1 points ${newPoints}`);
      checkIfWon(player, newPoints);
    }

    if (player === 2) {
      if (lastPointsAddedForPlayer === 2) {
        const newPoints = player2TurnPoints + points;
        setPlayer2TurnPoints(newPoints);
        console.log(`Player 2 turn points ${newPoints}`);
      } else {
        setPlayer2TurnPoints(1);
      }

      const newPoints = player2Points + points;
      setPlayer2Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(2);
      console.log(`Player 2 points ${newPoints}`);
      checkIfWon(player, newPoints);
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

      <View className="flex-1 items-center justify-center bg-gray-100 px-8 pb-8 pt-16 relative">
        <AddButton
          player={1}
          pressFunction={() => addPointsToBoard({ player: 1, points: 1 })}
          longPressFunction={() => addPointsToBoard({ player: 1, points: 5 })}
        />
        {lastPointsAddedForPlayer === 1 && <TurnScore player={1} points={player1TurnPoints} />}
        <CribbageBoard player1Points={player1Points} player2Points={player2Points} width={30} />
        {lastPointsAddedForPlayer === 2 && <TurnScore player={2} points={player2TurnPoints} />}
        <AddButton
          player={2}
          pressFunction={() => addPointsToBoard({ player: 2, points: 1 })}
          longPressFunction={() => addPointsToBoard({ player: 2, points: 5 })}
        />
      </View>
    </>
  );
}
