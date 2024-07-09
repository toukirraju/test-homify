import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.roundBtn]}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            SG
          </Text>
        </TouchableOpacity>
        {/* search bar  */}
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>

        <View style={styles.circle}>
          <Ionicons name="notifications" size={24} color={Colors.dark} />
        </View>

        <View style={styles.circle}>
          <Ionicons name="menu" size={24} color={Colors.dark} />
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    paddingHorizontal: 20,
  },
  roundBtn: {
    backgroundColor: Colors.gray,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    marginHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 0.9,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  searchIcon: {
    padding: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
  },
});
