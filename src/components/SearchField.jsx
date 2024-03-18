/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./SearchField.css";

function SearchField(props) {


    useEffect(() => {
      props.setProgress(20);
      setTimeout(() => {
        props.setProgress(100);
      }, 500);
    }, []);

  return (
    <div style={{width:"800px", marginTop:"-60px"}}>
      <h1 className="home-heading">What <span style={{color:"cyan"}}>topic</span> would you like to take a quiz on ?</h1>
      <form action="/quiz">
        <input
          id="searchInputBox"
          name="query"
          type="search"
          placeholder="eg. Python"
        />
      </form>
    </div>
  );
}

export default SearchField;
