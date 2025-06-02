import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const url = "http://localhost:4000/questions";

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    } catch (error) {
      console.error(`Failed to fetch questions: ${error}`);
    }
  }, []);

  const addQuestion = (newQuestion) => {
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      })
        .then((response) => response.json())
        .then((data) =>
          setQuestions((prevQuestions) => [...prevQuestions, data])
        );
    } catch (error) {
      console.error(`Failed to add question: ${error}`);
    }
  };

  const deleteQuestion = (id) => {
    try {
      fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error(`Failed to delete question: ${error}`);
    }
  };

  const updateQuestion = (changedQuestion) => {
    try {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === changedQuestion.id
            ? { ...question, correctIndex: changedQuestion.correctIndex }
            : question
        )
      );
      fetch(`${url}/${changedQuestion.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          correctIndex: changedQuestion.correctIndex
        })
      })
    } catch (error) {
      console.error(`Failed to update correct answer: ${error}`);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          questions={questions}
        />
      )}
    </main>
  );
}

export default App;
