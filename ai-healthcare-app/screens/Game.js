import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import he from "he";
import { useTranslation } from "react-i18next";

const API_URL =
  "https://the-trivia-api.com/api/questions?categories=science&limit=10&tags=health";

const Game = () => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.map((question) => ({
          question: he.decode(question.question),
          options: [
            ...question.incorrectAnswers.map((answer) => he.decode(answer)),
            he.decode(question.correctAnswer),
          ].sort(() => Math.random() - 0.5),
          answer: he.decode(question.correctAnswer),
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching quiz questions:", error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResult(true);
      // postScore();
    }
  };

  // const postScore = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/games/score", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         score: score,
  //       }),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("Score posted successfully:", result);
  //     } else {
  //       console.error("Failed to post score:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error posting score:", error);
  //   }
  // };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300);
    setShowResult(false);
    setLoading(true);
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.map((question) => ({
          question: he.decode(question.question),
          options: [
            ...question.incorrectAnswers.map((answer) => he.decode(answer)),
            he.decode(question.correctAnswer),
          ].sort(() => Math.random() - 0.5),
          answer: he.decode(question.correctAnswer),
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("game_title")}</Text>
      <Text style={styles.timer}>
      {t("time_left")}: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#003366" />
      ) : showResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
          {t("your_score")}: {score} / {questions.length} 🎉
          </Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>{t("play_again")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#000" },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 15,
  },
  quizContainer: { alignItems: "center", width: "100%" },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#000",
  },
  optionButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "#003366",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  resultContainer: { alignItems: "center", marginTop: 20 },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default Game;
