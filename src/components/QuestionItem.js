import React, { useState } from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [newCorrectAnswer, setNewCorrectAnswer] = useState(correctIndex);

  const handleChange = (event) => {
    setNewCorrectAnswer(event.target.value);
    updateQuestion({ ...question, correctIndex: event.target.value });
  };

  return (
    <>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={newCorrectAnswer}
          onChange={handleChange}
        >
          {options}
        </select>
      </label>
      <button onClick={(e) => deleteQuestion(id)}>Delete Question</button>
    </>
  );
}

export default QuestionItem;
