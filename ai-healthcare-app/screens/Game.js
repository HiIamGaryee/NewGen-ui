import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const quizQuestions = [
  { question: "What is the recommended daily water intake for an adult?", options: ["1L", "2L", "3L", "4L"], answer: "2L" },
  { question: "Which vitamin is mainly obtained from sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
  { question: "Which of the following foods is a good source of protein?", options: ["Banana", "Chicken", "Rice", "Cabbage"], answer: "Chicken" },
  { question: "What is the ideal amount of sleep for an adult?", options: ["4-5 hours", "6-7 hours", "7-9 hours", "10-12 hours"], answer: "7-9 hours" },
  { question: "What is the normal body temperature in Celsius?", options: ["34°C", "35.5°C", "36.5°C", "38°C"], answer: "36.5°C" },
  { question: "Which mineral is important for strong bones?", options: ["Iron", "Calcium", "Potassium", "Magnesium"], answer: "Calcium" },
  { question: "Which food contains the most fiber?", options: ["Chicken", "White Rice", "Oats", "Eggs"], answer: "Oats" },
  { question: "What organ does the liver help detoxify?", options: ["Lungs", "Heart", "Kidneys", "Stomach"], answer: "Kidneys" },
  { question: "Which exercise is best for heart health?", options: ["Weightlifting", "Yoga", "Running", "Stretching"], answer: "Running" },
  { question: "What is the main function of red blood cells?", options: ["Fight infections", "Carry oxygen", "Digest food", "Regulate body temperature"], answer: "Carry oxygen" },
  { question: "Which food is high in healthy fats?", options: ["French Fries", "Avocado", "Cookies", "White Bread"], answer: "Avocado" },
  { question: "What is a common symptom of dehydration?", options: ["Sweating", "Headache", "Fever", "Increased energy"], answer: "Headache" },
  { question: "How many minutes of exercise should adults aim for daily?", options: ["10 min", "20 min", "30 min", "60 min"], answer: "30 min" },
  { question: "Which of the following is a whole grain?", options: ["White bread", "Brown rice", "Pastry", "Cornflakes"], answer: "Brown rice" },
  { question: "What is the largest organ in the human body?", options: ["Liver", "Skin", "Heart", "Brain"], answer: "Skin" },
];

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)

  // Timer Countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResult(true); // Auto-submit when time is up
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300); // Reset timer to 5 minutes
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Quiz 🏋️‍♂️</Text>
      <Text style={styles.timer}>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</Text>

      {showResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Score: {score} / {quizQuestions.length} 🎉</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Play Again 🔄</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>{quizQuestions[currentQuestion].question}</Text>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#000" },
  timer: { fontSize: 18, fontWeight: "bold", color: "#d9534f", marginBottom: 15 }, // Red timer color
  quizContainer: { alignItems: "center", width: "100%" },
  question: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#000" },
  optionButton: { width: "90%", padding: 15, backgroundColor: "#003366", borderRadius: 10, marginBottom: 10, alignItems: "center" },
  optionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  resultContainer: { alignItems: "center", marginTop: 20 },
  resultText: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#000" },
  button: { backgroundColor: "#003366", padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default Game;
