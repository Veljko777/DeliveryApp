import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import colors from "../assets/colors";

const listImg = require("../images/list.png");
const mapImg = require("../images/map.png");

const Header = (props) => {
  const RenderImg = () => {
    return props.view === "List" ? mapImg : listImg;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={props.changeView}
      >
        <Image style={styles.navIcon} source={RenderImg()} />
      </TouchableOpacity>
      <View style={styles.item}>
        <ImageBackground
          style={styles.navIcon}
          source={require("../images/courier.png")}
        >
          <Image
            style={styles.checkImg}
            source={require("../images/check.png")}
          />
        </ImageBackground>

        <Text style={styles.text}>
          {props.deliveriesCount.delivered + "/" + props.deliveriesCount.total}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={props.changeFilter}
      >
        <Image
          style={styles.navIcon}
          source={require("../images/filter.png")}
        />
        <Text style={styles.text}>{props.filter}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: colors.headerBackground,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navIcon: {
    height: 40,
    width: 40,
  },
  item: {
    minWidth: 100,
    alignItems: "center",
  },
  checkImg: {
    position: "absolute",
    top: -0,
    right: -15,
    height: 25,
    width: 25,
  },
  text: { color: "white" },
});
