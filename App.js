import React from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";

import Header from "./src/components/Header";
import ListView from "./src/components/ListView";
import MapView from "./src/components/MapView";
import DeliveryCard from "./src/components/DeliveryCard";

import colors from "./src/assets/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.headerBackground} />
      <Header />
      <ListView />
      <MapView />
      <DeliveryCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
