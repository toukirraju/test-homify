import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

const Page = () => {
  const [countryCode, setCountryCode] = React.useState("+880");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const KeyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  enum SigninType {
    PHONE,
    FACEBOOK,
    GOOGLE,
    APPLE,
  }

  const { signIn } = useSignIn();

  const handleSignin = async (type: SigninType) => {
    if (type === SigninType.PHONE) {
      console.log("Sign In with Phone");
      const fullPhoneNumber = countryCode + mobileNumber;
      try {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.error("Sign In Error", error);
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    } else if (type === SigninType.FACEBOOK) {
      console.log("Sign In with Facebook");
    } else if (type === SigninType.GOOGLE) {
      console.log("Sign In with Google");
    } else if (type === SigninType.APPLE) {
      console.log("Sign In with Apple");
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={KeyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Create an account to get started
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile Number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            mobileNumber !== "" ? styles.eneble : styles.disable,
            {
              marginBottom: 20,
            },
          ]}
          onPress={() => handleSignin(SigninType.PHONE)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.gray,
            }}
          />
          <Text
            style={{ marginHorizontal: 8, fontSize: 20, color: Colors.gray }}
          >
            or
          </Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.gray,
            }}
          />
        </View>
        {/* social login */}
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              backgroundColor: "#fff",
              marginBottom: 20,
            },
          ]}
          onPress={() => handleSignin(SigninType.FACEBOOK)}
        >
          <Ionicons name="logo-facebook" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              backgroundColor: "#fff",
              marginBottom: 20,
            },
          ]}
          onPress={() => handleSignin(SigninType.GOOGLE)}
        >
          <Ionicons name="logo-google" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              backgroundColor: "#fff",
              marginBottom: 20,
            },
          ]}
          onPress={() => handleSignin(SigninType.APPLE)}
        >
          <Ionicons name="logo-apple" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  eneble: {
    backgroundColor: Colors.primary,
  },
  disable: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
