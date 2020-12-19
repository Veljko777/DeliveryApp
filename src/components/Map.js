import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import DeliveryCard from "./DeliveryCard";
import colors from "../assets/colors";

export default function Map(props) {
  const [item, setItem] = useState({});

  const RenderSingleMarker = (marker) => {
    return (
      <Marker
        onPress={() => {
          setItem(marker);
        }}
        key={marker.id}
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lng,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        title={marker.title}
      />
    );
  };

  const RenderMarker = (marker) => {
    if (props.filter === "New") {
      if (marker.deliveryStatus != "delivered") {
        return RenderSingleMarker(marker);
      }
      return null;
    } else {
      if (marker.deliveryStatus === "delivered") {
        return RenderSingleMarker(marker);
      }
      return null;
    }
  };

  const renderDeliveryCard = () => {
    if (item.id != undefined) {
      return (
        <View style={styles.popup}>
          <View style={styles.popupHeader}>
            <TouchableOpacity onPress={() => setItem({})}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../images/close.png")}
              />
            </TouchableOpacity>
          </View>

          <DeliveryCard
            item={item}
            index={1}
            updateDataBase={props.updateDataBase}
          />
        </View>
      );
    } else return null;
  };

  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.data[0].lat,
          longitude: props.data[0].lng,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {props.data.map((marker) => RenderMarker(marker))}
      </MapView>
      {renderDeliveryCard()}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  callout: {
    position: "absolute",
    bottom: 10,
    left: 0,
  },
  popup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  popupHeader: {
    alignItems: "flex-end",
    padding: 5,
    backgroundColor: colors.headerBackground,
    borderRadius: 15,
  },
});
