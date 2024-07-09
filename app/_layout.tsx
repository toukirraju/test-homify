import Colors from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import {
  Link,
  Stack,
  useNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { TamaguiProvider, createTamagui } from "@tamagui/core"; // or 'tamagui'
import { config } from "@tamagui/config/v3";
import "@tamagui/core/reset.css";
import { PortalProvider } from "tamagui";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  // or 'tamagui'
  interface TamaguiCustomConfig extends Conf {}
}

const CLEARK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

//cache the clerk JWT token
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      // do nothing
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    ...FontAwesome.font,
  });

  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthGroup = segments.includes("(authenticated)");

    if (isSignedIn && isAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={36} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={36} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={36}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="help"
        options={{ title: "help", presentation: "modal" }}
      />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={36} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider shouldAddRootHost>
        <ClerkProvider
          publishableKey={CLEARK_PUBLISHABLE_KEY!}
          tokenCache={tokenCache}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar style="auto" />
              <InitialLayout />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ClerkProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
};

export default RootLayoutNav;
