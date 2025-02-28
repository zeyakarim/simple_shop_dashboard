import { Stack } from 'expo-router';

export default function CreateStockLayout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}  />
        </Stack>
    );
}