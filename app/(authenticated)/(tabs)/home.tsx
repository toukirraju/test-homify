import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";

const Page = () => {
  const balance = 1000;
  const handlePress = () => {
    console.log("Pressed");
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>&#x9F3;</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton text="Add" icon={"add"} onPress={handlePress} />
        <RoundButton text="Exchange" icon={"refresh"} />
        <RoundButton text="Details" icon={"list"} />
        {/* <Dropdown /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 40,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default Page;
