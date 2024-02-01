import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './src/Screens/Main/Home';
import {useThemeAwareObject} from './src/theme';
export default function App() {
  const createStyles = () => {
    const themeStyles = StyleSheet.create({
      container: {
        flex: 1,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}
