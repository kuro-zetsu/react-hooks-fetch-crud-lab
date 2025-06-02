import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, deleteQuestion, updateQuestion}) {


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <QuestionItem updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} question={question} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
