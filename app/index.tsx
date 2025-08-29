import {StyleSheet, View} from 'react-native';
import CribbageBoard from '@/components/CribbageBoard';
import {Stack} from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />

      <View style={styles.container}>
        <CribbageBoard player1Points={95} player2Points={35} width={30} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
