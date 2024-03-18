/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { BsYoutube, BsGithub, BsReddit, BsWikipedia } from "react-icons/bs";
import { useSearchParams, useLocation } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Brainstorm.css";
import Xarrow from "react-xarrows";
import { TailSpin } from "react-loader-spinner";

export default function BrainStorm(props) {
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [youtubeData, setYoutubeData] = useState([])
    const [githubData, setGithubData] = useState([])
    const [wikipediaData, setWikipediaData] = useState([])
    const [redditData, setRedditData] = useState([])

    const state = useLocation();
    const topic = searchParams.get("query");


    const [wheelDisabled, setWheelDisabled] = useState(false);

    useEffect(() => {
        props.setProgress(20);
        const loadData = async function () {

            const { data } = await axios.get("https://teamdebug.pythonanywhere.com/api/v1/brainstorm?query=" + searchParams.get("query"));
            setYoutubeData(data.data.youtube.items);
            setGithubData(data.data.github.items);
            setWikipediaData(data.data.wikipedia.items);
            setRedditData(data.data.reddit.data.children);

            setLoading(false);
            props.setProgress(100);
        };
        loadData();
    }, [state]);

    const BrainstormLoader = () => {
        return (
            <div className="loaderCenter">
                <TailSpin
                    height="100"
                    width="100"
                    color="cyan"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                />
            </div>
        )

    };

    return (
        <TransformWrapper id="pinPanDiv" limitToBounds={false} minScale={0.3} wheel={{ wheelDisabled: true, }}>

            <TransformComponent>
                <div style={{ width: "170vh", height: "90vh", cursor: "move", scale: "0.8", display: "flex", placeItems: "center", justifyContent: "center" }}>

                    <div id="youtubeDiv" onMouseOver={() => { setWheelDisabled(true) }} onMouseLeave={() => { setWheelDisabled(false) }} className="content-boxes" style={{ top: "140px", left: "30px", height: "330px", width: "330px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsYoutube style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                YouTube
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                {youtubeData.length} Resources
                            </p>
                        </div>

                        <ul style={{ margin: "0", padding: "0" }}>
                            {loading ? (
                                <BrainstormLoader></BrainstormLoader>
                            ) : (youtubeData.map((item, idx) => {
                                return (
                                    <li key={idx} className="youtube-item-li" >
                                        <button className="youtube-item-button"
                                            onClick={() => { window.open(item.id.videoId ? "https://youtube.com/watch?v=" + item.id.videoId : "https://www.youtube.com/playlist?list=" + item.id.playlistId) }}>
                                            <div className="youtube-item-div">
                                                <img src={item.snippet.thumbnails.high.url} className="youtube-item-thumbnail"></img>
                                                <div>
                                                    <h2 className="youtube-item-title">{item.snippet.title.slice(0, 23)}...</h2>
                                                    <h2 className="youtube-item-title">{item.snippet.channelTitle}</h2>
                                                </div>

                                            </div>

                                        </button>
                                    </li>
                                );
                            }))}
                        </ul>
                    </div>


                    <div id="githubDiv" style={{ top: "-50px", left: "475px", height: "256px", width: "280px" }}  onMouseOver={() => { setWheelDisabled(true) }} onMouseLeave={() => { setWheelDisabled(false) }} className="content-boxes">
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsGithub style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                GitHub
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                {githubData.length} Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>
                            {loading ? (
                                <BrainstormLoader></BrainstormLoader>
                            ) : (githubData.map((item, idx) => {
                                return (
                                    <li key={idx} className="youtube-item-li" >
                                        <button className="youtube-item-button"
                                            onClick={() => { window.open("https://github.com/topics/" + item.name) }} style={{ paddingLeft: "20px" }}>
                                            <div style={{ paddingRight: "10px" }}>
                                                {/* <img src={item.snippet.thumbnails.high.url} className="youtube-item-thumbnail"></img> */}
                                                <div style={{ display: "flex", fontSize: "26px" }}>
                                                    <BsGithub style={{ marginRight: "2px", marginBottom: "-10px", marginTop: "-5px" }} />
                                                    <h2 className="youtube-item-title" style={{ color: "cyan" }}> / {item.name}</h2>

                                                </div>
                                                <h2 style={{ marginTop: "10px" }} className="youtube-item-title">{item.short_description}</h2>
                                            </div>

                                        </button>
                                    </li>
                                );
                            }))}
                        </ul>
                    </div>

                    <div id="redditDiv" className="content-boxes" style={{ top: "200px", left: "880px", minHeight: "255px", minWidth: "300px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsReddit style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                Reddit
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                {redditData.length} Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>
                            {loading ? (
                                <BrainstormLoader></BrainstormLoader>
                            ) : (redditData.map((item, idx) => {
                                return (
                                    <li key={idx} className="youtube-item-li" >
                                        <button className="youtube-item-button"
                                            onClick={() => { window.open(item.data.url) }} style={{ paddingLeft: "20px" }}>
                                            <div style={{ paddingRight: "10px" }}>

                                                <div style={{ display: "flex", fontSize: "26px" }}>
                                                    <BsReddit style={{ marginRight: "0px", marginBottom: "-3px", marginTop: "-5px" }} />
                                                    <h2 className="youtube-item-title">/ {item.data.title.slice(0, 23)}...</h2>

                                                </div>
                                                
                                            </div>

                                        </button>

                                    </li>
                                );
                            }))}
                        </ul>
                    </div>

                    <div id="wikipediaDiv" className="content-boxes" style={{ top: "450px", left: "465px", height: "255px", width: "300px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsWikipedia style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                Wikipedia
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                {wikipediaData.length} Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>
                            {loading ? (
                                <BrainstormLoader></BrainstormLoader>
                            ) : (wikipediaData.map((item, idx) => {
                                return (
                                    <li key={idx} className="youtube-item-li" >
                                        <button className="youtube-item-button"
                                            onClick={() => { window.open(item.link) }} style={{ paddingLeft: "20px" }}>
                                            <div style={{ paddingRight: "10px" }}>

                                                <div style={{ display: "flex", fontSize: "26px" }}>
                                                    <BsWikipedia style={{ marginRight: "2px", marginBottom: "-10px", marginTop: "-5px" }} />
                                                    <h2 className="youtube-item-title"> / {item.title}</h2>

                                                </div>
                                                {/* <h2 style={{ marginTop: "10px" }} className="youtube-item-title">{item.short_description}</h2> */}
                                            </div>

                                        </button>
                                    </li>
                                );
                            }))}
                        </ul>
                    </div>

                    {/* <div id="githubDiv2" className="content-boxes" style={{ top: "-200px", left: "70px", minHeight: "255px", minWidth: "250px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsGithub style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                GitHub
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>

                        </ul>
                    </div> */}

                    {/* <div id="githubDiv3" className="content-boxes" style={{ top: "-140px", left: "880px", minHeight: "255px", minWidth: "250px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsGithub style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                GitHub
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>

                        </ul>
                    </div> */}

                    {/* <div id="githubDiv4" className="content-boxes" style={{ top: "-200px", left: "100px", minHeight: "255px", minWidth: "250px" }}>
                        <div style={{ display: "flex", marginLeft: "0px", marginTop: "10px", padding: "10px" }}>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "left", fontWeight: "700", fontSize: "20px" }}>
                                <BsGithub style={{ marginRight: "10px", marginBottom: "-3px" }} />
                                GitHub
                            </p>
                            <p style={{ margin: "0", padding: "0", width: "50%", textAlign: "right", fontWeight: "700", fontSize: "20px", color: "cyan", opacity: "0.7" }}>
                                Resources
                            </p>
                        </div>
                        <ul style={{ margin: "0", padding: "0" }}>

                        </ul>
                    </div> */}


                    <input id="queryMainHeading" className="brainstormHeading" value={topic} disabled readOnly></input>



                </div>



                <Xarrow zIndex={-1} start="queryMainHeading" end="youtubeDiv" strokeWidth={2} />
                <Xarrow zIndex={-1} start="queryMainHeading" end="githubDiv" strokeWidth={2} />

                <Xarrow zIndex={-1} start="queryMainHeading" end="redditDiv" strokeWidth={2} />
                <Xarrow zIndex={-1} start="queryMainHeading" end="wikipediaDiv" strokeWidth={2} />

                {/* <Xarrow zIndex={-1} start="queryMainHeading" end="githubDiv2" strokeWidth={2} />
                <Xarrow zIndex={-1} start="queryMainHeading" end="githubDiv3" strokeWidth={2} curveness={0.8} /> */}

            </TransformComponent>
        </TransformWrapper>


    )

}
