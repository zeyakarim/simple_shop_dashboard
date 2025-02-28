import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathName = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <SafeAreaView style={{marginHorizontal: 10}}>
        <Text style={{ marginLeft:10, fontWeight: 'bold', marginTop:10, fontSize: 16}}>Dashboard</Text>
        <View style={styles.container}>
          <Pressable
            style={[
              styles.button,
              pathName === '/' ? styles.activeButton: null
            ]}
            onPress={() => router.push('/')}
          >
            <Text
              style={[
                styles.buttonText, 
                pathName === '/' ? styles.activeButtonText: null
              ]}
            >All Items</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.button,
              pathName === '/lowStocks' ? styles.activeButton: null
            ]}
            onPress={() => router.push('/lowStocks')}
          >
            <Text 
              style={[
                styles.buttonText, 
                pathName === '/lowStocks' ? styles.activeButtonText: null
              ]}
            >Low Stocks</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              pathName === '/createStock' ? styles.activeButton: null
            ]}
            onPress={() => router.push('/createStock')}
          >
            <Text
              style={[
                styles.buttonText, 
                pathName === '/createStock' ? styles.activeButtonText: null
              ]}
            >Create Stock</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: 'Dashboard', headerShown: false }} />
        <Stack.Screen name="lowStocks" options={{ headerTitle: 'Low Stocks', headerShown: false }} />
        <Stack.Screen name="createStock" options={{ headerTitle: 'Create Stock', headerShown: false }} /> 
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    margin: 10
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
  buttonText: {
    color: 'green',
  },
  activeButton: {
    backgroundColor: 'green'
  },
  activeButtonText: {
    color: '#fff'
  }
});