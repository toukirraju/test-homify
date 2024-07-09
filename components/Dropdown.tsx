import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverProps,
  XStack,
  YStack,
} from "tamagui";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Dropdown = () => {
  return (
    <TamaguiDropdown
      triggerButton={
        <TouchableOpacity style={styles.circle}>
          <Ionicons name="ellipsis-horizontal" size={30} color={Colors.dark} />
        </TouchableOpacity>
      }
    >
      <YStack width={100}>
        <XStack width={100}>
          <Label size="$3">Name</Label>
          <Input size="$3" />
        </XStack>

        <Popover.Close asChild>
          <Button
            size="$3"
            onPress={() => {
              /* Custom code goes here, does not interfere with popover closure */
            }}
          >
            Submit
          </Button>
        </Popover.Close>
      </YStack>
    </TamaguiDropdown>
  );
};

export default Dropdown;

export function TamaguiDropdown({
  Icon,
  Name,
  triggerButton,
  children,
  ...props
}: PopoverProps & {
  Icon?: any;
  Name?: string;
  triggerButton?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Popover size="$5" allowFlip {...props}>
      <View style={styles.container}>
        <Popover.Trigger asChild>
          {triggerButton && triggerButton}
        </Popover.Trigger>
        <Text style={styles.label}>More</Text>
      </View>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "superBouncy",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        style={Platform.select({
          ios: {
            // iOS-specific styles
            marginTop: 0, // Adjust as necessary
            marginRight: 10, // Adjust as necessary
          },
          android: {
            // Android-specific styles
            marginTop: 20, // Adjust as necessary
            marginRight: 10, // Adjust as necessary
          },
        })}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {/* children component  */}
        <View>{children}</View>
      </Popover.Content>
    </Popover>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
});
