import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useBalanceStore } from "@/store/balanceStorage";

const FrontCarousel = () => {
  const { balance } = useBalanceStore();
  const width = Dimensions.get("window").width;
  return (
    <Carousel
      loop
      width={width}
      height={width / 2.5}
      autoPlay={true}
      data={[
        {
          thumbnail: require("@/assets/images/paid.png"),
          title: "Paid",
          amount: balance(),
        },
        {
          thumbnail: require("@/assets/images/payable.png"),
          title: "Payable",
          amount: balance(),
        },
        {
          thumbnail: require("@/assets/images/usertemp.png"),
          title: "User",
          amount: balance(),
        },
      ]}
      scrollAnimationDuration={5000}
      autoPlayInterval={3000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 5,
            marginHorizontal: 20,
            marginVertical: 10,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={item.thumbnail}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                paddingVertical: 20,
                paddingLeft: 30,
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={styles.balance}>{balance()}</Text>
                <Text style={styles.currency}>&#x9F3;</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  );
};

export default FrontCarousel;

const styles = StyleSheet.create({
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
});
