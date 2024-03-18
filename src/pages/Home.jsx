/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "./Home.css";

import Section from "../styles/Section";
import mixins from "../styles/mixins";
import media from "../styles/media";
import theme from "../styles/theme";
import colors from "../styles/theme";
import fontSizes from "../styles/theme";

import styled from 'styled-components';
import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const StyledGrid = styled.div`
  margin-top: 30px;
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 5px;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;
const StyledProjectInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  display:grid;
  place-items:center;
  align-items: flex-start;
  position: relative;
  padding: 2rem 2rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: #172a45;
`;
const StyledProject = styled.div`
  transition: ${theme.transition};
  cursor: default;
  min-height:100px;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledProjectInner} {
      transform: translateY(-5px);
    }
  }
`;



function Home(props) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const [userFullName, setUserFullName] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 500);
    if (cookies.get("access_token")) {
      setLoading(true);
      const loadData = async function () {
        const { data } = await axios.get(
          // "https://hbansal28.pythonanywhere.com/api/v1/config",
          "https://careercraft.pythonanywhere.com/api/v1/config",
          { headers: { Authorization: "JWT " + cookies.get("access_token") } }
        );
        setLoading(false);
        if (data.success === "true") {
          setUserLogged(true);
          setUserFullName(data.user_details.full_name);
        } else if (data.success === "false") {
          setUserLogged(false);
        }
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  function logout() {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    alert("Logged Out.");
    window.location.reload();
  }

  var buttons = [
    { "heading": "Browse", "description": "Browse Resources accross the Internet", "link": "/learn", "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAExElEQVR4nO1aW4hcRRBtjc8YCRIfkYjRDxUfURT9EMUEEfUn4uNH8SdgVFTUjwhKFK+Z6tmMr4+oiBIlH5v4WAwEBEVQF0IQV27VnV1XRV0JRhFifEQjiXqrU1J3+pJ9zGbv3OnZmWAOXHZmb3dVnX5UVVePMQHRNyQLLKbLLTmw5DZb4tgi7wTk3wB5vyVO9bMl3gHEWwHdhgrxwzaWywYGZI7pJp7/RI63xCstuY+AmC05KfUg77TkXqjU5dJZJbDuGzkWiB8D4l8OGMT7LLoPshnB9DaLcnl1RE5bOyInaZ9oUI7Sz7VYzoQkXaYDAOjWA/LX40kBuve0b8dJ9KFcaYnHDijmbUB8RzQq88rKrMSyBNA9A8S7M5nEDOjWRbHMNZ0AxPyArnVPIKmSLA0pvxbLfIuuCsT/5jrWJnJWSB0GiFd74fuBXE2XiukQqnW5CIi/8rPzU2VYzgsiGIjvyqfcJrzCzAJqscwHch/6wfsxGpYz2hJYIbkEkP/OBCZ8t5lFRLHMtciD3pl8qk6mlCD177pO/cZ+yXQBfUOyAJC3N9y0W1NKiM6An9rtHfMgReyI5WqL7HRl9NXl3JY662bOR0L3iOkyLLrXGra4/pY6VpL0Zk/iu1djOdp0GYCy2CL/ow5Hg2rhjhbdRr/JHmrHgKgup+pjAgDQbfKD+2Qx5aNyjEZZjRntuD0lAMif6xOCDFB6nd+zXxTqYOP0Bp/MfdYuiXGpTNtkIt23Po0ptLx06nwC91QIEiHJALotPqbdOXNjcu9kyuP0lnZITJ6REGQA+Qk/yM8VIMLfauMKyTntkNDvOZFm78oQqWB6q5f57owJWxZ8iPe2cnKbztCcyMHatAJAuSbPjA/eME/UyL1YVPizdTlhOgPHE2lGRvu2QqSSyIXeBX8/87Qh/6o5TisKLPKjmnpHQ7Jwwv8nEVFUSU6xxCOWODItIhqShT6+7WreYFCO0yjuG91vSqDZ6DYjMl3bIrCxnJ6fU5o3QH7cz8ZoyEPTdETKoopysScyPFVZIoss8p6sQZxeG0ppJ4hAVrjI3O/HU1+S6/cKN5vACE4k1rpBRmTDlKqIL6Dtg7qcbXqdCLk3/T5eOVnR+97d2lDKOkVERI6wyD9kwRrl/ImKkH/PI6/pcSLg94eWXZXUxJfIQ37NbQlWdukQEYvuDU9kavypJnLVhAofuf6QhEIRAZTFemZXG6c9I2lub8m9okfJcYReN71EhNzbhc/sDdZuvSez2/QIkSrJUh+s92jMK15/7SEiUeNUOOxtWl24Y68RAeQH/QYf03zwkCQSjcq8xi2XLqt0eUudQxNpB4B8r7dla8udn94mJ/pDz5+mywBfd64i315OAPFeFaB3hKZLqJJc4Af0Z62zlRJikeuNkku6zHQJQHyfr8BvLC1Ey/c+bdkU1LpWbCD3lo8d95QXksgiQP4ru2bD9MagFha1gfjLLMuNZUlbgqrEq/JNX8H0JjPLsMS7sqw8lpPbF4bu5fwCVAtien+uRTudMf27huQKSNLr9QrCBMTAgMzxtTWORI4MuOn4j8l13Ak13cAxp9apWKa/WADiR/RXCVoyapSNeCz384cMkdlWWDtMpCQOz8gMqP1fl9Z/6owU3oj3FgYAAAAASUVORK5CYII=" },
    { "heading": "Practice", "description": "Feeling Confident ? Take a Quiz", "link": "/practice", "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABR0lEQVR4nO2ZsUrEQBCGF2ysxF6wF0s7H8MX0MI30D6Q/QUfQN/A6vAFbJTzGgtn8gw2dnZi4ywjOe/gkNO7LUwmy3ywJDBD+H82y+QnIVK6ByfNWzIJ1kC2ie8VrIFMYYM2UjW6jUZO1u3vBawQVj3oJljGbc8Fy9kgjESW88tn3Z3XRiPdiJxu23pkeUGjO+aNRJbj2fW1Jj1oa5HS9bRO8laT7i32r3pe1yvMb6on3QKlu6kZkndQupkZ+4ishz+FmjUSZq8SOF0t7JLU9Hm0TGiwBpYIa88KSBJYTtfpNwF+EVY3up/T3zsobSBi+J8oMsk1EVke+9btOE4mnhCtgdIGYvgDT4hdAk+IRoNV5QnRCPCEaAyUNhDhCdFxnEEQ/R+iMVDaQAz/1N8ZcCOF7wj6TojBjRgBftiNgdJ2BJ4Qgwm+AG/x6KMSWeOFAAAAAElFTkSuQmCC" },
    { "heading": "Career Planning", "description": "Figure out what to do with your interests", "link": "/session", "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADfElEQVR4nO2YSWgUQRSGW1BUXMENcbkIevfidjDxJoJL9KgIOQoRLxI8hDFdNSEicUFB4kVPXhMieBLEKJJov+qJBAQhBz24gSTGRNB+5ZPXU50MQ2Z6emba9CT9Q126ql/V1/W2GctKlSrV4pRUmhpj4IsFAqLJanTJFCRhkovuRjI52iyVFgLQFYBTPCSgEqDtrKJNlWxSTcDKiOvKQtjKOyMAJ8ukvR82eC2JBrHzEH/9haD7sooOX8/RKh7C9ZoE6P78HGrpeKeseZIsB8LuNHMTLl4uaQSwndcIhRMZhzbGeeCqQDgmgpuwQiSUHjBrO63EgQDmeJLdKcxQ1vWajYupUpvEWcVlCMhPnsyM0uowkGsvaY3vXoCTiQMRJj4qAckM0dogg1nzIBkC4vpf2fWawgwJxztiAh6s5IFoO+8uur8CQ4/N2qtxHLQmEK7Y7ComiNtLG8ErZs141zBtsCKo26GdQtFBds0o7xUrvCCC1+IXO99t9ABnJ44ZHsad/JvIr/FOWBXKL6ig+4Ni68cjYGtsICyu2FzsSmYQwPEoEES0RIB+Yt79LhUO+UCAOuvSISsuEBZXbC52HMyclvMZDR2OiajuJBVeMLfwLTNC2/1noDtNQb0fxVZkkHqpK0e7pcJp3rSw0RSA5wzIo8SDZJ7RUnYjc+CHBc9XSMBR42qtsYDcfk/LBWCb8eOpstUW8LdQ+EkoHOQ+rQvoAMfD7GbYYWrNh26H1s08B33LvD/K+9UdRLq0Lei3qh/4USp9Iwt4Vij8kw9orznYw898gNqfc2hvNRBlQfjLBBBC4TvOStxPWWXU69Ay6dBW6XrH+PD85YvBhNI3g/V8K7NrsMOqQbIUiFR4MYDIuLS+GuPsVtKh/VLpHqFwTCp83vOKVgbzAvQDAzHE8RMLiAAczk9WXh+iyHa9kwZi2h6hPbXakyVvxLTwYe5ULK4LwqFdoX9kAH41taTNqoNkadeqLi8LwC/GJceE0nek8o4WupNvG3SfiZenhVktUSByjswlFP7yWxIHL0ml75pnE+I17agHRKwgnQ7tMy3Nm6DpLABDCd7pqLbnBaTwWfYtbREKzwule4XS9xgyqt1EgPwPyRSkwi9TW3sTfdjgHS97oEYBkcW1qdFihMW//U238NlqZJA5929k15ILBUQoHIx67lSpUlmNq39ET4NFKeUXSAAAAABJRU5ErkJggg==" },
  ]

  const showLoginDiv = () => {
    // document.getElementById("loginDiv").style.display = "block";
    document.getElementById("loginDiv").style.opacity = "1";

  };
  const hideLoginDiv = () => {
    // document.getElementById("loginDiv").style.display = "none";
    document.getElementById("loginDiv").style.opacity = "0";
  };

  // const gotologin = () =>{
  //   navigate("/login");
  // };
  return (
    <div>

      <div className="home-container">


        <h1 className="home-heading">Hi there {"{ "}<span onMouseOver={showLoginDiv} style={{ color: "cyan", cursor: "pointer" }}>
          {(() => {
            if (loading) {
              return (
                ""
              );
            } else {
              if (userLogged) {
                return (
                  userFullName
                );
              } else {
                return (
                  "User"
                );
              }
            }
          })()
          }
        </span>{" }"} ! <br /> Welcome to <span style={{ color: "cyan", cursor: "pointer" }}>Career Craft</span> !</h1>


        {(() => {
          if (loading) {
            return (
              ""
            );
          } else {
            if (userLogged) {
              return (
                <div id="loginDiv" style={{minHeight:"75px"}} onMouseLeave={hideLoginDiv}>
                  <button id="loginButton" onClick={logout}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 -900 960 960"
                    width="23"
                    style={{ fill: "white", marginRight: "7px" }}
                    
                  >
                    <path d="M 222 -255 q 63 -44 125 -67.5 T 480 -346 q 71 0 133.5 23.5 T 739 -255 q 44 -54 62.5 -109 T 820 -480 q 0 -145 -97.5 -242.5 T 480 -820 q -145 0 -242.5 97.5 T 140 -480 q 0 61 19 116 t 63 109 Z m 257.814 -195 Q 422 -450 382.5 -489.686 q -39.5 -39.686 -39.5 -97.5 t 39.686 -97.314 q 39.686 -39.5 97.5 -39.5 t 97.314 39.686 q 39.5 39.686 39.5 97.5 T 577.314 -489.5 q -39.686 39.5 -97.5 39.5 Z m 0.654 370 Q 398 -80 325 -111.5 q -73 -31.5 -127.5 -86 t -86 -127.266 Q 80 -397.532 80 -480.266 T 111.5 -635.5 q 31.5 -72.5 86 -127 t 127.266 -86 q 72.766 -31.5 155.5 -31.5 T 635.5 -848.5 q 72.5 31.5 127 86 t 86 127.032 q 31.5 72.532 31.5 155 T 848.5 -325 q -31.5 73 -86 127.5 t -127.032 86 q -72.532 31.5 -155 31.5 Z M 480 -140 q 55 0 107.5 -16 T 691 -212 q -51 -36 -104 -55 t -107 -19 q -54 0 -107 19 t -104 55 q 51 40 103.5 56 T 480 -140 Z m 0 -370 q 34 0 55.5 -21.5 T 557 -587 q 0 -34 -21.5 -55.5 T 480 -664 q -34 0 -55.5 21.5 T 403 -587 q 0 34 21.5 55.5 T 480 -510 Z m 0 -77 Z m 0 374 Z" />
                  </svg>Logout</button>

                </div>
              );
            } else {
              return (
                <div id="loginDiv" onMouseLeave={hideLoginDiv}>
                  <Link to="/login"><button id="loginButton" ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 -900 960 960"
                    width="23"
                    style={{ fill: "white", marginRight: "7px" }}
                  >
                    <path d="M 222 -255 q 63 -44 125 -67.5 T 480 -346 q 71 0 133.5 23.5 T 739 -255 q 44 -54 62.5 -109 T 820 -480 q 0 -145 -97.5 -242.5 T 480 -820 q -145 0 -242.5 97.5 T 140 -480 q 0 61 19 116 t 63 109 Z m 257.814 -195 Q 422 -450 382.5 -489.686 q -39.5 -39.686 -39.5 -97.5 t 39.686 -97.314 q 39.686 -39.5 97.5 -39.5 t 97.314 39.686 q 39.5 39.686 39.5 97.5 T 577.314 -489.5 q -39.686 39.5 -97.5 39.5 Z m 0.654 370 Q 398 -80 325 -111.5 q -73 -31.5 -127.5 -86 t -86 -127.266 Q 80 -397.532 80 -480.266 T 111.5 -635.5 q 31.5 -72.5 86 -127 t 127.266 -86 q 72.766 -31.5 155.5 -31.5 T 635.5 -848.5 q 72.5 31.5 127 86 t 86 127.032 q 31.5 72.532 31.5 155 T 848.5 -325 q -31.5 73 -86 127.5 t -127.032 86 q -72.532 31.5 -155 31.5 Z M 480 -140 q 55 0 107.5 -16 T 691 -212 q -51 -36 -104 -55 t -107 -19 q -54 0 -107 19 t -104 55 q 51 40 103.5 56 T 480 -140 Z m 0 -370 q 34 0 55.5 -21.5 T 557 -587 q 0 -34 -21.5 -55.5 T 480 -664 q -34 0 -55.5 21.5 T 403 -587 q 0 34 21.5 55.5 T 480 -510 Z m 0 -77 Z m 0 374 Z" />
                  </svg>Login</button></Link>

                  <Link to="/signup"><button id="loginButton" style={{ paddingLeft: "35px" }}>
                    <img style={{ height: "23px", marginRight: "7px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACtklEQVR4nO2ZO2gUQRjHxzeKMQ+jWKggYqEpRAs7QckRJCiS00IUQaKCKBiMVUBQEFL5KIQYg6jBF1jZWdiIgoeFQdFGfCWWggoWPgL6k498B5/j3t6xe25G3B8M7N7+d+Y/c9/MN3PnXE5OTk5OaAANQBdwRItcN7jQARqB08BX/kQ+OwXMcyECLAGeU51nwGIXEsAc4Iln9DFwRsuI90zuZ7tQAI57obIrQrMb+GZ0x1wIADOBT8bYvhjtAaP7CMzI1m20qXZj6hUwNUY7DXht9BuzdRtt6pAxNFiD/oLRH8zGZbyhPmOovwZ9v9H3ZeMy3tB+Y+haDfobRr83G5fxhtYYQx+AuVUytEzeMquzdRttagrw0pg6F6MdMLoX8q4LAVn3+Z2LQKt5vgC45Gl2uJDwYlsY14w7oteWqy40mEhow1TnsmhdqACbgQfAD2Naru8Dne5fAWgB1mppmWw//w9MHGrWA1uBPcBOYAvQBkx3IQKsA87q2v4zZgLLdvou0APMD8F4AXhEMkblFDeZYXKzgrFxPY3d1iXzlq5AY0Zzz0t0zcB2oFd/BJDrpr9lfjnwxjP9HbgCbAJmxby7AuguHyeBhcBQRKIrD8SgZPF6ml8GvPMaug4sTVCXTOqxGkOtrV6ZVkLDnn0T7Wd05KPMPwRKFTqR7psATnqrSSFFXRI2UbR7R1TL+TTmZZJ9NpUdTllXVMwLG7REIfOsMWmjsjqUeZpmH68rDAk6IBSTNjpcr3MscNSL+Q7NJwX9dprNfYdqyvQmbfQE6elM2IFSPTqwCHifsgPdWte2FCHUlagD2vBK4A7wJWEHhrSepswncb3RDBtF3DI64EJBD/mSnHxKFRLZW7t3CgLdSoxWGG3f/CoXIkCrZFiN76iYHwhu5GO250Xzn1oxmAmbk+PC5hdOoaZW+Wz/xQAAAABJRU5ErkJggg==" />
                    Sign Up</button></Link>
                </div>
              );
            }
          }
        })()
        }




        <div className="box-container">
          <StyledGrid>
            <div className="projects">
              {buttons.map((i) => {
                return (
                  <Link style={{ fontSize: "24px", margin: "0" }} to={i.link} key={i.heading}>
                    <CSSTransition
                      style={{ cursor: "pointer" }}

                      classNames="fadeup"
                      timeout={i >= 2 ? (i - 2) * 3000 : 300}
                      exit={false}>
                      <StyledProject

                        tabIndex="0"
                        style={{
                          transitionDelay: `${i >= 2 ? (i - 2) * 100 : 0}ms`,
                        }}>
                        <StyledProjectInner>
                          <img src={i.img} style={{ width: "60px" }} />
                          <p style={{ color: "white", margin: "10px" }}>{i.heading}</p>
                          <p style={{ color: "white", margin: "0", fontSize: "20px", fontWeight: "100" }}>{i.description}</p>
                        </StyledProjectInner>
                      </StyledProject>
                    </CSSTransition>
                  </Link>
                );
              })}
            </div>
          </StyledGrid>
        </div>
      </div>
    </div>
  );
}

export default Home;
