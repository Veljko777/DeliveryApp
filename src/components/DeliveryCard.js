import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../assets/colors";

export default function DeliveryCard(props) {
  const renderBackground = () => {
    if (props.index % 2 === 0) {
      return { backgroundColor: "lightgrey" };
    } else return {};
  };

  const renderStatus = () => {
    return props.item.deliveryStatus === undefined
      ? "no status"
      : props.item.deliveryStatus;
  };

  const DeliveredBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ChangeStatus("delivered");
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Delivered</Text>
      </TouchableOpacity>
    );
  };

  const DeliveringBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ChangeStatus("delivering");
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Delivering</Text>
      </TouchableOpacity>
    );
  };

  const RenderButtonsHelper = () => {
    if (props.item.deliveryStatus === "delivering") {
      return (
        <View style={styles.btnSection}>
          <View />
          <DeliveredBtn />
        </View>
      );
    } else if (props.item.deliveryStatus === "delivered") return null;
    else {
      return (
        <View style={styles.btnSection}>
          <DeliveringBtn />
          <DeliveredBtn />
        </View>
      );
    }
  };

  const RenderButtons = () => {
    return <RenderButtonsHelper />;
  };

  const ChangeStatus = (status) => {
    let data = {
      id: props.item.id,
      status: status,
    };

    props.updateDataBase(data);
  };

  return (
    <View style={[styles.container, renderBackground()]}>
      <Image style={styles.img} source={require("../images/courier.png")} />
      <View style={styles.rigthSection}>
        <Text style={[styles.text, styles.name]}>Name: {props.item.name}</Text>
        <Text style={[styles.text, styles.address]}>
          Address: {props.item.address}
        </Text>
        <Text style={styles.text}>Status: {renderStatus()}</Text>
        <RenderButtons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
  },
  text: { color: "black", paddingBottom: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  address: { fontStyle: "italic" },

  rigthSection: {
    padding: 10,
    width: "85%",
  },
  btnSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.headerBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    padding: 15,
    paddingVertical: 8,
  },
});
