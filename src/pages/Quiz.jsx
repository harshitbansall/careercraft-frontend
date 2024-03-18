/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "./Quiz.css";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import QuizBox from "../components/QuizBox";
import QuizLoader from "../components/QuizLoader";


export default function Quiz(props) {
    // let questions = props.questions;
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const state = useLocation();

    useEffect(() => {
        props.setProgress(20);
        const loadData = async function () {
            const { data } = await axios.get("https://teamdebug.pythonanywhere.com/api/v1/quiz?query=" + searchParams.get("query"));

            setQuestions(data.quiz.quiz.questions);
            setLoading(false);
            props.setProgress(100);
        };
        setTimeout(() => {
            loadData();
          }, 1000);

    }, [state]);
    if (loading) {
        return (
            // <TransformWrapper limitToBounds={false} minScale={0.2}>
            //     <TransformComponent>
                    <QuizLoader />
            //     </TransformComponent>
            // </TransformWrapper>

        );
    } else {
        return (
            questions.length && <QuizBox questions={questions} />
        );
    }

}

