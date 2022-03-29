import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Title from "../components/title";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title titleText="Quizller" />
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/rikocode/image/upload/v1648319195/Hand_holding_pen-rafiki_xmbwqa.png",
          }}
          style={styles.banner}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  banner: {
    width: 330,
    height: 330,
    resizeMode: "contain",
    marginBottom: 50,
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingVertical: 20,
    height: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#1A759F",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
