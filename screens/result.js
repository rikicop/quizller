import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Title from "../components/title";

const Result = ({ navigation, route }) => {
  const { score } = route.params;
  const resultImage =
    score >= 40
      ? "https://res.cloudinary.com/rikocode/image/upload/v1648486361/win_xjr7od.png"
      : "https://res.cloudinary.com/rikocode/image/upload/v1648487297/Bad_idea-pana_wzycac.png";

  https: return (
    <View style={styles.container}>
      <Title titleText="RESULTS" />
      <Text style={styles.scoreText}>{score}</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: resultImage,
          }}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

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
  scoreText: {
    fontSize: 40,
    fontWeight: "600",
    color: "black",
    marginBottom: 30,
    alignSelf: "center",
  },
});
