import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";

import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStorage";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";
import FrontCarousel from "@/components/Slider/FrontCarousel";
import {
  Calendar,
  CalendarActiveDateRange,
  CalendarOnDayPress,
  CalendarTheme,
  fromDateId,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import {
  WindowsXpButton,
  WindowsXpCalendar,
  windowsXpTokens,
  WindowsXpWindow,
} from "@/components/WindowsXpCalendar";
import { add, sub } from "date-fns";
import { format } from "date-fns/fp";
import CustomCaleendarPicker from "@/components/CustomCaleendarPicker";
import { Adapt, Select, Sheet, YStack } from "tamagui";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDatePicker from "@/components/CustomDatePicker";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    "italy",
    "spain",
    "barcelona",
    "finland",
  ]);
  const [items, setItems] = useState([
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid", parent: "spain" },
    { label: "Barcelona", value: "barcelona", parent: "spain" },

    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome", parent: "italy" },

    { label: "Finland", value: "finland" },
  ]);
  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();
  const width = Dimensions.get("window").width;
  const headerHeight = useHeaderHeight();

  const addMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight / 4 }}
    >
      <View style={styles.account}>
        <FrontCarousel />
      </View>
      <View style={styles.actionRow}>
        <RoundButton text="Add" icon={"add"} onPress={addMoney} />
        <RoundButton
          text="Exchange"
          icon={"refresh"}
          onPress={clearTransactions}
        />

        <RoundButton text="Stat" icon={"stats-chart-outline"} />
        <Dropdown />
      </View>
      <Text>test</Text>

      <View>
        <CustomCaleendarPicker />
        {/* <CustomDatePicker /> */}

        {/* <WindowsXP /> */}
      </View>
      {/* transactions  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={defaultStyles.sectionHeader}>Transaction</Text>
        <Text
          style={{
            color: Colors.primary,
            paddingRight: 25,
            fontSize: 16,
          }}
        >
          See All
        </Text>
      </View>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <Text
            style={{
              padding: 14,
              color: Colors.gray,
            }}
          >
            No transactions yet
          </Text>
        ) : (
          //last 3 transactions
          transactions.slice(-3).map((transaction, index, array) => (
            <View
              key={transaction.id}
              style={[
                {
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                },
                // Apply border bottom to all except the last item
                index !== array.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.lightGray,
                  paddingBottom: 10,
                },
              ]}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? "arrow-up" : "arrow-down"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {transaction.title}
                </Text>
                <Text
                  style={{
                    color: Colors.gray,
                    fontSize: 12,
                  }}
                >
                  {/* {transaction?.date && transaction?.date?.toDateString()} */}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                {transaction.amount} &#x9F3;
              </Text>
            </View>
          ))
        )}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    marginBottom: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
  },
  balance: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    color: "white",
    fontSize: 40,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  windowsXpBackground: {
    backgroundColor: windowsXpTokens.colors.background,
    padding: 12,
    flex: 1,
  },
});

export default Page;

export const WindowsXP = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(true);

  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(
    sub(new Date(), { days: 1 })
  );

  const handleOpenPicker = useCallback(() => {
    setIsPickerVisible((p) => !p);
  }, []);

  const handleDayPress = useCallback<CalendarOnDayPress>((dateId) => {
    setCurrentCalendarMonth(fromDateId(dateId));
    setSelectedDate(fromDateId(dateId));
    setIsPickerVisible(false);
  }, []);

  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(
    () => [
      {
        startId: toDateId(selectedDate),
        endId: toDateId(selectedDate),
      },
    ],
    [selectedDate]
  );

  const handlePreviousMonth = useCallback(() => {
    setCurrentCalendarMonth(sub(currentCalendarMonth, { months: 1 }));
  }, [currentCalendarMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentCalendarMonth(add(currentCalendarMonth, { months: 1 }));
  }, [currentCalendarMonth]);

  return (
    <View style={styles.windowsXpBackground}>
      <WindowsXpWindow title="@marceloterreiro/flash-calendar">
        <Calendar.VStack justifyContent="flex-start" spacing={12}>
          <Text>
            This is a Windows's XP themed calendar, using the composable API
            pattern to fully customize the calendar's appearance.
          </Text>

          <WindowsXpButton onPress={handleOpenPicker}>
            {format("dd/MM/yyyy")(selectedDate)}
          </WindowsXpButton>

          {isPickerVisible && (
            <WindowsXpCalendar
              calendarActiveDateRanges={calendarActiveDateRanges}
              calendarMaxDateId="2024-06-31"
              calendarMinDateId="2024-01-01"
              calendarMonthId={toDateId(currentCalendarMonth)}
              getCalendarWeekDayFormat={format("E")}
              onCalendarDayPress={handleDayPress}
              onNextMonthPress={handleNextMonth}
              onPreviousMonthPress={handlePreviousMonth}
            />
          )}
        </Calendar.VStack>
      </WindowsXpWindow>
    </View>
  );
};
const items = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
  { name: "Honeydew" },
  { name: "Starfruit" },
  { name: "Blueberry" },
  { name: "Raspberry" },
  { name: "Strawberry" },
  { name: "Mango" },
  { name: "Pineapple" },
  { name: "Lime" },
  { name: "Lemon" },
  { name: "Coconut" },
  { name: "Guava" },
  { name: "Papaya" },
  { name: "Orange" },
  { name: "Grape" },
  { name: "Jackfruit" },
  { name: "Durian" },
];
