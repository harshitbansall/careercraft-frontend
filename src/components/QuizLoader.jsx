import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function QuizLoader() {
    return (
        <div className="quiz-container" style={{ display: "flex" }}>
            <div style={{paddingTop:"40px", paddingLeft:"70px", paddingRight:"80px"}}>
                    <TailSpin
                        height="100"
                        width="100"
                        color="#036bfc"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
            </div>
            <div style={{ width: "80%", textAlign:"left" }}>
                <h1 style={{fontSize:"3.5rem", margin:"0"}}>Brace Yourselves.</h1>
                <h2 style={{fontSize:"2rem", margin:"0"}}>We are preparing your AI powered Quiz.</h2>
                <h2 style={{fontSize:"1.5rem", margin:"0"}}>May take upto 30 seconds.</h2>

            </div>


        </div>
    )
}
