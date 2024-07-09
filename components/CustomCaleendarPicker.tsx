import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Calendar,
  CalendarTheme,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import { addMonths, set } from "date-fns";
import { Adapt, Button, ScrollView, Select, Sheet, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns/fp";

const today = toDateId(new Date());

const linearAccent = "#4f9ebd";

const linearTheme: CalendarTheme = {
  rowMonth: {
    content: {
      textAlign: "center",
      color: "rgba(18, 161, 137, 0.5)",
      fontWeight: "700",
    },
  },
  rowWeek: {
    container: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(18, 161, 137, 0.5)",
      borderStyle: "solid",
    },
  },
  itemWeekName: {
    content: { color: "rgba(18, 161, 137, 0.5)", fontWeight: "500" },
  },
  itemDayContainer: {
    activeDayFiller: {
      backgroundColor: linearAccent,
    },
    // spacer: {
    //   backgroundColor: "rgba(18, 161, 137, 0.4)",
    //   borderRadius: 4,
    // },
  },
  itemDay: {
    idle: ({ isPressed, date }) => {
      const day = date.getDay();
      const isWeekend = day === 5 || day === 6; // Friday is 5, Saturday is 6

      return {
        container: {
          backgroundColor: isPressed ? linearAccent : "transparent",
          borderRadius: 4,
        },
        content: {
          color: isWeekend && !isPressed ? "rgba(9, 128, 133, 0.5)" : "#646e6d",
          // You can add more weekend-specific styles here
          fontWeight: isWeekend ? "bold" : "normal",
        },
      };
    },
    today: ({ isPressed }) => ({
      container: {
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: isPressed ? 4 : 30,
        backgroundColor: isPressed ? linearAccent : "rgba(5, 89, 138, 0.5)",
      },
      content: {
        color: isPressed ? "#ffffff" : "rgb(255, 255, 255)",
      },
    }),
    active: ({ isEndOfRange, isStartOfRange }) => ({
      container: {
        backgroundColor: linearAccent,
        borderTopLeftRadius: isStartOfRange ? 4 : 0,
        borderBottomLeftRadius: isStartOfRange ? 4 : 0,
        borderTopRightRadius: isEndOfRange ? 4 : 0,
        borderBottomRightRadius: isEndOfRange ? 4 : 0,
      },
      content: {
        color: "#ffffff",
      },
    }),
  },
};

const CustomCaleendarPicker = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [openYearSheet, setOpenYearSheet] = useState(false);
  const [openMonthSheet, setOpenMonthSheet] = useState(false);

  const nextMonth = () => {
    setCurrentCalendarMonth(addMonths(currentCalendarMonth, 1));
  };

  const prevMonth = () => {
    setCurrentCalendarMonth(addMonths(currentCalendarMonth, -1));
  };

  //jump to today
  const jumpToday = () => {
    setCurrentCalendarMonth(new Date());
    setSelectedDate(toDateId(new Date()));
  };

  //jump to selected year
  const jumpSelectedYear = (year: number) => {
    setCurrentCalendarMonth(set(currentCalendarMonth, { year }));
  };

  // jump to selected month
  const jumpSelectedMonth = (month: number) => {
    setCurrentCalendarMonth(set(currentCalendarMonth, { month: month - 1 }));
  };

  console.log(currentCalendarMonth, "corr", selectedDate, "sel");

  useEffect(() => {
    jumpSelectedYear(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    jumpSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  return (
    <View>
      {/* calender action buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <TouchableOpacity
          onPress={prevMonth}
          style={{
            flexDirection: "row",
            gap: 5,
            borderRadius: 5,
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#add8e6",
            borderWidth: 1,
          }}
        >
          <Ionicons name="caret-back" size={18} color="gray" />
        </TouchableOpacity>
        {/* <Button onPress={jumpToday}>Today</Button>
        <Button onPress={() => jumpSelectedYear(2023)}>2023</Button>
        <Button onPress={() => jumpSelectedMonth(6)}>June</Button> */}

        <YearPicker getYear={(year) => setSelectedYear(year)} />

        <TouchableOpacity
          onPress={jumpToday}
          style={{
            flexDirection: "row",
            gap: 5,
            borderRadius: 5,
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#add8e6",
            borderWidth: 1,
          }}
        >
          <Ionicons name="today" size={18} color="gray" />
        </TouchableOpacity>

        <MonthPicker getMonth={(month) => setSelectedMonth(month)} />

        <TouchableOpacity
          onPress={nextMonth}
          style={{
            flexDirection: "row",
            gap: 5,
            borderRadius: 5,
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#add8e6",
            borderWidth: 1,
          }}
        >
          <Ionicons name="caret-forward" size={18} color="gray" />
        </TouchableOpacity>
      </View>
      <Calendar
        theme={linearTheme}
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={toDateId(currentCalendarMonth)}
        onCalendarDayPress={setSelectedDate}
        calendarFirstDayOfWeek="sunday"
        calendarMaxDateId={toDateId(new Date())}
        getCalendarWeekDayFormat={format("EE")}
      />
    </View>
  );
};

export default CustomCaleendarPicker;

//make drop down for year picker

const ITEM_HEIGHT = 70; // Adjust based on your item height

const YearPicker = ({ getYear }: { getYear?: (year: number) => void }) => {
  //year list from 10years earlier from prensent year and  future 10 years from present year
  const years = Array.from(
    { length: 21 },
    (_, i) => new Date().getFullYear() - 10 + i
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  //get selected year
  getYear && getYear(Number(selectedYear));

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // modal close
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index !== -1) {
        const selectedIndex = years.findIndex(
          (year) => year.toString() === selectedYear
        );
        if (selectedIndex !== -1) {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: true,
            viewPosition: 0,
          });
        }
      }
    },
    [selectedYear, years]
  );

  const scrollToIndex = useCallback((index: any) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.15,
    });
  }, []);

  useEffect(() => {
    const selectedIndex = years.findIndex(
      (year) => year.toString() === selectedYear
    );
    if (selectedIndex !== -1) {
      scrollToIndex(selectedIndex);
    }
  }, [selectedYear, years, scrollToIndex]);

  const renderItem = useCallback(
    ({ item }: { item: number }) => (
      <TouchableOpacity
        style={{
          height: ITEM_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            item.toString() === selectedYear ? "#add8e6" : "transparent",
          marginVertical: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          setSelectedYear(item.toString());
          handleCloseModalPress();
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item}</Text>
      </TouchableOpacity>
    ),
    [selectedYear]
  );

  return (
    <View>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={{
          flexDirection: "row",
          gap: 5,
          borderRadius: 5,
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#add8e6",
          borderWidth: 1,
        }}
      >
        <Text style={{ color: "gray" }}>{selectedYear}</Text>
        <Ionicons name="caret-down" size={18} color="gray" />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: "lightgray",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
      >
        <Text
          style={{
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Choose a year
        </Text>
        <BottomSheetFlatList
          ref={flatListRef}
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </BottomSheetModal>
    </View>
  );
};

// make drop down for month picker

const MonthPicker = ({
  getMonth,
}: {
  getMonth?: (month: number) => void;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  //get selected month
  getMonth && getMonth(selectedMonth);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // modal close
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      //scroll to selected month
      if (index !== -1) {
        const selectedIndex = months.findIndex(
          (month) => month.value === selectedMonth
        );
        if (selectedIndex !== -1) {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: true,
            viewPosition: 0,
          });
        }
      }
    },
    [selectedMonth, months]
  );

  const scrollToIndex = useCallback((index: any) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.15,
    });
  }, []);

  useEffect(() => {
    const selectedIndex = months.findIndex(
      (month) => month.value === selectedMonth
    );
    if (selectedIndex !== -1) {
      scrollToIndex(selectedIndex);
    }
  }, [selectedMonth, months, scrollToIndex]);

  return (
    <View>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={{
          flexDirection: "row",
          gap: 5,
          borderRadius: 5,
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#add8e6",
          borderWidth: 1,
        }}
      >
        <Text style={{ color: "gray" }}>{months[selectedMonth - 1].label}</Text>
        <Ionicons name="caret-down" size={18} color="gray" />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: "lightgray",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
      >
        <Text
          style={{
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Choose a month
        </Text>
        <BottomSheetFlatList
          ref={flatListRef}
          data={months}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  item.value === selectedMonth ? "#add8e6" : "transparent",
              }}
              onPress={() => {
                setSelectedMonth(item.value);
                handleCloseModalPress();
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <BottomSheetScrollView
          scrollEnabled
          contentContainerStyle={{
            paddingBottom: 24,
            backgroundColor: "white",
          }}
        >
          {months.map((month) => (
            <TouchableOpacity
              key={month.value}
              style={{
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  month.value === selectedMonth ? "#add8e6" : "transparent",
              }}
              onPress={() => {
                setSelectedMonth(month.value);
                handleCloseModalPress();
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {month.label}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView> */}
      </BottomSheetModal>
    </View>
  );
};
