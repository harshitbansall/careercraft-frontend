import { Link } from "react-router-dom";
import logo from "../assets/education.png";

function NavBar() {
  return (
    <center>
    <div className="">
      <Link to="/">
        <img src={logo} alt="site logo" className="h-24 w-24" />
      </Link>
    </div>
    </center>
  );
}

export default NavBar;
