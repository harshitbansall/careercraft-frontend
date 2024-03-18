import { useState } from "react";
import { resultInitialState } from "../constants";

export default function QuizBox({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIndex, setAnswerIndex] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);

    const { question, options, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIndex(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }

    const onClickNext = () => {
        setAnswerIndex(null);
        setResult((prev) =>
            answer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                } : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        )

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    };
    return (
        <div className="quiz-container">
            {!showResult ? (<div>
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question-no"> / {questions.length}</span>

                <h2 className="question-title">{question}</h2>

                <ul>
                    {
                        options.map((answer, index) => (
                            <li onClick={() => onAnswerClick(answer, index)} key={answer} className={answerIndex === index ? 'selected-answer' : null}>
                                {answer}
                            </li>
                        ))
                    }
                </ul>
                <div className="footer">
                    <button className="nextButton" onClick={onClickNext} disabled={answerIndex === null}>
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </div>) : <div className="result">
                <h1 className="result-heading">Result</h1>
                <p className="result-params">
                    Total Questions: <span>{questions.length}</span>
                </p>

                <p className="result-params">
                    Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p className="result-params">
                    Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <p className="result-params">
                    Total Score: <span>{result.score}</span> / <span>{questions.length * 5}</span>
                </p>
                <button className="nextButton">
                    Analyze Results
                </button><br/>
                <button className="nextButton">
                    Retake Quiz
                </button>
                <button className="nextButton" style={{marginLeft:"20px"}}>
                    Generate New
                </button>
            </div>}

        </div>
    )
}
