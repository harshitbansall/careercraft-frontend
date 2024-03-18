/* eslint-disable react/prop-types */
import "./CareerPlanning.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CareerPlanning(props) {
  const [careerData, setCareerData] = useState([])
  let navigate = useNavigate();



  useEffect(() => {
    props.setProgress(30);
    const loadData = async function () {

      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/careerPlanning");
      setCareerData(data.data);
      props.setProgress(100);
    };
    loadData();
  }, []);
  return (
    <div style={{ width: "800px", marginTop: "100px" }}>
      <div style={{ marginBottom: "100px" }}>
        {
          careerData.map((item, idx) => {
            return (
              <p key={idx}>{item}</p>

            )
          })
        }
      </div>
    </div >
  );
}