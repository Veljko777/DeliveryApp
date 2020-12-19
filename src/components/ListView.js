import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import DeliveryCard from "./DeliveryCard";

export default function ListView(props) {
  const [data, setData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (loadMore) {
      setLoadMore(false);
      let dataToAdd = getNext10Rows();
      setData([...data, ...dataToAdd]);
    }
  });

  const getNext10Rows = () => {
    let lastId = data.length;
    let availableData;
    if (props.filter === "New") {
      availableData = props.db.filter((element) => {
        return element.deliveryStatus !== "delivered";
      });
    } else {
      availableData = props.db.filter((element) => {
        return element.deliveryStatus === "delivered";
      });
    }
    let dataToAdd = availableData.slice(lastId, lastId + 10);
    return dataToAdd;
  };

  const getMoreData = () => {
    setLoadMore(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <DeliveryCard
            item={item}
            index={index}
            updateDataBase={props.updateDataBase}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          getMoreData();
        }}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
