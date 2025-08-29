import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface CribbageBoardProps {
  player1Points: number;
  player2Points: number;
  width?: number;
}

const CribbageBoard = ({player1Points, player2Points, width = 52}: CribbageBoardProps) => {
  const aspectRatio = 382 / 52; // height/width
  const height = width * aspectRatio;

  const maxPoints = 121;

  // Calculate progress as percentage (0-100)
  const player1Progress = (player1Points / maxPoints) * 100;
  const player2Progress = (player2Points / maxPoints) * 100;

  // Your original SVG paths
  const innerTrackPath =
    'M11 381V26C11 17.7157 17.7157 11 26 11V11C34.2843 11 41 17.6297 41 25.914C41 131.362 41 332.447 41 366.151C41 368.912 38.7614 371 36 371V371C33.2386 371 31 368.883 31 366.122C31 331.91 31 126.43 31 27';

  const outerTrackPath =
    'M1 381V26C1 12.1929 12.1929 1 26 1V1C39.8071 1 51 12.1565 51 25.9637C51 132.082 51 313.33 51 366.149C51 374.433 44.2843 381 36 381V381C27.7157 381 21 374.37 21 366.085C21 312.132 21 125.111 21 26.5';

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <Svg
          width={width}
          height={height}
          viewBox="0 0 52 382"
          preserveAspectRatio="xMidYMid meet"
          style={styles.svg}
        >
          {/* Background tracks (dark grey) */}
          <Path d={innerTrackPath} stroke="#cfcfcf" strokeWidth="1" fill="none" />
          <Path d={outerTrackPath} stroke="#cfcfcf" strokeWidth="1" fill="none" />

          {/* Progress tracks (colored) */}
          <Path
            d={innerTrackPath}
            stroke="#0073E6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000" // Large number to cover entire path
            strokeDashoffset={1000 - player2Progress * 10} // Animate based on progress
          />
          <Path
            d={outerTrackPath}
            stroke="#89CE00"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={1000 - player1Progress * 10}
          />
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
    transform: [{rotate: '15deg'}],
  },
  svg: {
    // Scale up for better visibility
    transform: [{scale: 3}],
  },
});

export default CribbageBoard;

// Usage example:
// <CribbageBoard player1Points={95} player2Points={35} width={20} />
