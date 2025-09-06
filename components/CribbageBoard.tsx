import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CribbageBoardProps {
  player1Points: number;
  player2Points: number;
  width?: number;
}

const CribbageBoard = ({ player1Points, player2Points, width = 52 }: CribbageBoardProps) => {
  const aspectRatio = 382 / 52; // height/width
  const height = width * aspectRatio;

  // outside track
  const player1TrackPath =
    'M1 381V26C1 12.1929 12.1929 1 26 1V1C39.8071 1 51 12.1565 51 25.9637C51 132.082 51 313.33 51 366.149C51 374.433 44.2843 381 36 381V381C27.7157 381 21 374.37 21 366.085C21 312.132 21 125.111 21 26.5';
  // inside track
  const player2TrackPath =
    'M11 381V26C11 17.7157 17.7157 11 26 11V11C34.2843 11 41 17.6297 41 25.914C41 131.362 41 332.447 41 366.151C41 368.912 38.7614 371 36 371V371C33.2386 371 31 368.883 31 366.122C31 331.91 31 126.43 31 27';

  // Original scale factors (these complete the paths at 120 points)
  const dashLength = 1440;
  const player2Scale = 9.13;
  const player1FirstCurveScale = 9.85;
  const firstCurvePointsAtStart = 40;
  const firstCurvePointsAtEnd = 44;
  const player1SecondCurveScale = 9.89;
  const secondCurvePointsAtStart = 81;
  const secondCurvePointsAtEnd = 83;

  // Calculate the adjusted progress for each player
  const calculateProgress = (points: number, isPlayer1: boolean): number => {
    if (points <= 0) return 0;

    if (!isPlayer1 || points < firstCurvePointsAtStart) {
      return points * player2Scale;
    } else if (points <= firstCurvePointsAtEnd) {
      return points * player1FirstCurveScale; // need to scale this so 40 is 9.13 + 1/4 of the difference between 9.85 and 9.13, 41 is 2/4 etc.
    } else if (points <= secondCurvePointsAtStart) {
      return (
        (points - firstCurvePointsAtEnd) * player2Scale +
        firstCurvePointsAtEnd * player1FirstCurveScale
      );
    } else if (points <= secondCurvePointsAtEnd) {
      return points * player1SecondCurveScale;
    } else {
      return (
        (points - secondCurvePointsAtEnd) * player2Scale +
        secondCurvePointsAtEnd * player1SecondCurveScale
      );
    }
  };

  // Calculate progress for each player
  const player1Progress = calculateProgress(player1Points, true);
  const player2Progress = calculateProgress(player2Points, false);

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <Svg
          width={width}
          height={height}
          viewBox="0 0 52 382"
          preserveAspectRatio="xMidYMid meet"
          style={styles.svg}>
          {/* Background tracks (dark grey) */}
          <Path d={player1TrackPath} stroke="#cfcfcf" strokeWidth="1" fill="none" />
          <Path d={player2TrackPath} stroke="#cfcfcf" strokeWidth="1" fill="none" />

          {/* Progress tracks (colored) */}
          {player1Progress > 0 && (
            <Path
              d={player1TrackPath}
              stroke="#89CE00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${player1Progress} ${dashLength}`}
              strokeDashoffset="0"
            />
          )}
          {player2Progress > 0 && (
            <Path
              d={player2TrackPath}
              stroke="#0073E6"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${player2Progress} ${dashLength}`}
              strokeDashoffset="0"
            />
          )}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ rotate: '15deg' }],
  },
  svg: {
    // Scale up for better visibility
    transform: [{ scale: 3 }],
  },
});

export default CribbageBoard;
