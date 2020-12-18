import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: colors.headerBackground,
  },
});
