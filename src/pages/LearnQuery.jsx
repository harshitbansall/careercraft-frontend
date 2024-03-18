/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./LearnQuery.css";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

export default function LearnQuery(props) {
  let navigate = useNavigate();
  const [queryData, setQueryData] = useState([])

  const handleSubmit = (e) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate("/brainstorm?query=" + document.getElementById("learnQueryInputBox").value);
  };

  useEffect(() => {
    props.setProgress(30);
    const loadData = async function () {

      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/learn");
      setQueryData(data.data);
      props.setProgress(100);
    };
    loadData();
  }, []);

  return (
    <div style={{ width: "800px", marginTop: "100px" }}>
      <div style={{ marginBottom: "100px" }}>
        <h1 className="home-heading">What <span style={{ color: "cyan" }}>topic</span> would you like to brainstorm ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="learnQueryInputBox"
            name="query"
            type="search"
            placeholder="eg. Python"
          />
          {/* <select className="selectLang" placeholder="Select Language">
            <option style={{ display: "none" }} disabled selected value>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
          </select> */}
        </form>
      </div>
      <div style={{ minHeight: "200px" }}>
        <h2 style={{ color: "cyan", fontFamily: "monospace" }}>
          Recent Brainstorms
        </h2>
        {
          queryData.map((item, idx) => {
            return (
              <Link key={item.query} to={"/brainstorm?query=" + item.query}>
                <input className="learnQueryOptions" value={item.query.slice(0, 10)} readOnly></input>
              </Link>

            )
          })
        }
      </div>
    </div>
  );
}