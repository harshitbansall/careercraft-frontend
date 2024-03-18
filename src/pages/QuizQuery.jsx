/* eslint-disable react/prop-types */
import "./QuizQuery.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

export default function QuizQuery(props) {
  const [queryData, setQueryData] = useState([])
  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate("/quiz?query=" + document.getElementById("quizQueryInputBox").value);
  };

  useEffect(() => {
    props.setProgress(30);
    const loadData = async function () {

      const { data } = await axios.get("https://teamdebug.pythonanywhere.com/api/v1/practice");
      setQueryData(data.data);
      props.setProgress(100);
    };
    loadData();
  }, []);
  return (
    <div style={{ width: "800px", marginTop: "100px" }}>
      <div style={{ marginBottom: "100px" }}>
        <h1 className="home-heading">What <span style={{ color: "cyan" }}>topic</span> would you like to take a quiz on ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="quizQueryInputBox"
            name="query"
            type="search"
            placeholder="eg. Python"
          />
          {/* <select name="difficulty" className="selectLang" placeholder="Select Language">
            <option style={{ display: "none" }} disabled selected value>Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select> */}
        </form>
      </div>
      <div style={{ minHeight: "200px" }}>
        <h2 style={{ color: "cyan", fontFamily: "monospace" }}>
          Recent Quizes
        </h2>
        {
          queryData.map((item, idx) => {
            return (
              <Link key={item.query} to={"/quiz?query=" + item.query}>
                <input className="learnQueryOptions" value={item.query.slice(0, 10)} readOnly></input>
              </Link>

            )
          })
        }
      </div>
    </div >
  );
}