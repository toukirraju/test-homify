import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { add, sub } from "date-fns";
import { Adapt, Button, Select, Sheet } from "tamagui";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [openDay, setOpenDay] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const [day, setDay] = useState(selectedDate.getDate().toString());
  const [month, setMonth] = useState((selectedDate.getMonth() + 1).toString());
  const [year, setYear] = useState(selectedDate.getFullYear().toString());

  const [days, setDays] = useState([]);
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));
  const years = Array.from({ length: 101 }, (_, i) => {
    const yearValue = (new Date().getFullYear() - 50 + i).toString();
    return { label: yearValue, value: yearValue };
  });

  useEffect(() => {
    updateDays(parseInt(year), parseInt(month) - 1);
  }, [year, month]);

  const updateDays = (year, month) => {
    const lastDayOfMonth = sub(
      add(new Date(year, month + 1, 1), { days: -1 }),
      { days: 1 }
    ).getDate();
    setDays(
      Array.from({ length: lastDayOfMonth }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
      }))
    );
  };

  useEffect(() => {
    const newDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    setSelectedDate(newDate);
  }, [day, month, year]);

  console.log(year, month, day, selectedDate);

  const renderPicker = (value, items, setValue, setOpen) => (
    <SafeAreaView
      style={{
        alignItems: "center",
        gap: 6,
      }}
    >
      {items.map((item) => (
        <Select.Item
          onTouchStart={() => setValue(item.value)}
          style={{
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          selected={item.value === value}
        >
          {" "}
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.label}</Text>
        </Select.Item>
      ))}
    </SafeAreaView>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {/* select day */}
      <Select>
        <Select.Trigger style={{ width: 110 }}>
          <TouchableOpacity onPress={() => setOpenDay(true)}>
            <Text>{day}</Text>
          </TouchableOpacity>
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={true}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content>
          <Select.Viewport
            animation="quick"
            animateOnly={["transform", "opacity"]}
            enterStyle={{ o: 0, y: -10 }}
            exitStyle={{ o: 0, y: 10 }}
          >
            <Select.Group>
              <Select.Label>Choose a day</Select.Label>
              {renderPicker(day, days, setDay, setOpenDay)}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
      {/* select month */}
      <Select>
        <Select.Trigger style={{ width: 130 }}>
          <TouchableOpacity onPress={() => setOpenMonth(true)}>
            <Text>{month}</Text>
          </TouchableOpacity>
        </Select.Trigger>
        <Adapt when="sm" platform="touch">
          <Sheet
            native={true}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
        <Select.Content>
          <Select.Viewport
            animation="quick"
            animateOnly={["transform", "opacity"]}
            enterStyle={{ o: 0, y: -10 }}
            exitStyle={{ o: 0, y: 10 }}
          >
            <Select.Group>
              <Select.Label>Choose a month</Select.Label>
              {renderPicker(month, months, setMonth, setOpenMonth)}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
      {/* select year */}
      <Select>
        <Select.Trigger style={{ width: 140 }}>
          <TouchableOpacity onPress={() => setOpenYear(true)}>
            <Text>{year}</Text>
          </TouchableOpacity>
        </Select.Trigger>
        <Adapt when="sm" platform="touch">
          <Sheet
            native={true}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
        <Select.Content>
          <Select.Viewport
            animation="quick"
            animateOnly={["transform", "opacity"]}
            enterStyle={{ o: 0, y: -10 }}
            exitStyle={{ o: 0, y: 10 }}
          >
            <Select.Group>
              <Select.Label>Choose a year</Select.Label>

              {renderPicker(year, years, setYear, setOpenYear)}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
    </View>
  );
};

export default CustomDatePicker;
