/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./SessionQuery.css";

export default function LearnQuery(props) {
  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 500);
  }, []);

  return (
    <div style={{ width: "800px", marginTop: "100px" }}>
      <h1 className="home-heading">Enter the following details</h1>
      <form action="/careerPlanning">
        <input
          id="searchInputBox"
          name="techNonTech"
          type="search"
          placeholder="Tech, Non-Tech"
        />
        <input
          id="searchInputBox"
          name="workLifeBalance"
          type="search"
          placeholder="Work Life Balance"
        />
        <input
          id="searchInputBox"
          name="skillsAndCertification"
          type="search"
          placeholder="Skills and Certification"
        />
        <input
          id="searchInputBox"
          name="collegePercentage"
          type="search"
          placeholder="College Percentage"
        />
        <input
          id="searchInputBox"
          name="technicalSkills"
          type="search"
          placeholder="Technical Skills"
        />
        <input
          id="searchInputBox"
          name="networkingIndex"
          type="search"
          placeholder="Networking Index"
        />

        <input
          id="searchInputBox"
          name="interestRateinJob"
          type="search"
          placeholder="Interest Percentage in Job"
        />
        <input
          id="searchInputBox"
          name="workExperience"
          type="search"
          placeholder="Work Experience"
        />
        <input
          id="searchInputBox"
          name="package"
          type="search"
          placeholder="Package"
        />
        <input
          id="searchInputBox"
          name="healthAndWellBeing"
          type="search"
          placeholder="Health and Well Being"
        />
        <input
          id="searchInputBox"
          name="jobOpenings"
          type="search"
          placeholder="Job Openings"
        />
        <input
          id="searchInputBox"
          name="industryKnowledge"
          type="search"
          placeholder="Industry Knowledge"
        />

        {/* <select className="selectLang" placeholder="Select Language">
          <option style={{display:"none"}} disabled selected value>Select Language</option>
          <option>English</option>
          <option>Hindi</option>
        </select> */}
        <br/>
        <button id="submitCareerPlanning" type="submit">Submit</button>
      </form>
    </div>
  );
}