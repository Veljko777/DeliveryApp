import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import Header from "./src/components/Header";
import ListView from "./src/components/ListView";
import Map from "./src/components/Map";
import colors from "./src/assets/colors";

const rawData = require("./src/data/data.json");

export default function App() {
  const [db, setDb] = useState(rawData);
  const [view, setView] = useState("List");
  const [filter, setFilter] = useState("New");
  const [deliveriesCount, setDeliveriesCount] = useState({
    delivered: 0,
    total: 0,
  });

  useEffect(() => {
    if (deliveriesCount.total === 0) {
      setDeliveriesCount(getCount);
    }
  });

  const getCount = () => {
    let delivered = db.filter((element) => {
      return element.deliveryStatus === "delivered";
    });
    return { delivered: delivered.length, total: db.length };
  };

  const changeView = () => {
    setView(view === "List" ? "Map" : "List");
  };

  const changeFilter = () => {
    setFilter(filter === "New" ? "Delivered" : "New");
  };

  const RenderView = () => {
    if (view === "List") {
      return (
        <ListView
          filter={filter}
          db={db}
          filter={filter}
          updateDataBase={updateDataBase}
        />
      );
    } else
      return <Map data={db} updateDataBase={updateDataBase} filter={filter} />;
  };

  const updateDataBase = (data) => {
    let index = db.findIndex((el) => {
      return el.id == data.id;
    });

    db[index].deliveryStatus = data.status;
    setDeliveriesCount(getCount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.headerBackground} />
      <Header
        deliveriesCount={deliveriesCount}
        changeFilter={changeFilter}
        filter={filter}
        db={db}
        changeView={changeView}
        view={view}
      />
      <RenderView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
