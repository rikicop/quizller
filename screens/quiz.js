import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

//shuffle the options
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&encode=url3986"
    );
    const data = await response.json();
    /* console.log(data.results[0]); */
    setQuestions(data.results);
    setOptions(genereateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleNextPress = () => {
    if (ques < 9) {
      setQues(ques + 1);
      setOptions(genereateOptionsAndShuffle(questions[ques + 1]));
    } else {
      navigation.navigate("Result");
    }
  };

  const genereateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleSelectedOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 10);
    }
    if (ques !== 9) {
      setQues(ques + 1);
      setOptions(genereateOptionsAndShuffle(questions[ques + 1]));
    }
    if (ques === 9) {
      navigation.navigate("Result", { score: score });
    }
  };

  /*  const handleShowResult = () => {
    navigation.navigate("Result", { score: score });
  }; */
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "700" }}>LOADING...</Text>
        </View>
      ) : (
        questions && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q. {decodeURIComponent(questions[ques].question)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[0])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[0])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[1])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[1])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[2])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[2])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectedOption(options[3])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[3])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              {/*  <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>PREV</Text>
            </TouchableOpacity> */}
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
              {/*  SHOW RESULT , Pero en mi caso no lo utilizo por que va directo a result */}
              {/*  <TouchableOpacity style={styles.button} onPress={handleShowResult}>
              <Text style={styles.buttonText}>SHOW RESULTS</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
    justifyContent: "space-around",
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#34A0A4",
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  question: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  parent: {
    height: "100%",
  },
});
