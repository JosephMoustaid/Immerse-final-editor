import React, { useState } from 'react';
import LabScene from "./LabScene.jsx";
import { useLocation } from "react-router-dom";
//import pdfUrl from "../../assets/PDFs/rapport.pdf";

function Lab({ video, pdf, assets = [], user , cameraRef}) {
    /*
    const [chat, setChat] = useState([
        { msg: "Oh yeah, Forgot you could do that. Im so dumb @streamer.", sender: { id: "chefFrank", firstname: "chef", lastname: "Frank" }, msgTime: "", msgDate: "" },
        { msg: "Uh... wrong franchise, yo. I mean there are leaves @streamer", sender: { id: "serioussloth", firstname: "serious", lastname: "sloth" }, msgTime: "", msgDate: "" },
        { msg: "Accurate name is accurate. hahahahahah @streamer", sender: { id: "CoolCat", firstname: "Cool", lastname: "Cat" }, msgTime: "", msgDate: "" },
        { msg: "Jumpmaster woes @streamer. Its a lot of responsibility.", sender: { id: "biblethump", firstname: "bible", lastname: "thump" }, msgTime: "", msgDate: "" }
    ]);

    const getUserColorClass = (index) => {
        const colors = ['green', 'blue', 'purple', 'yellow', 'red'];
        return colors[index % colors.length];
    };
    */

    const location = useLocation();
    const annotations = location.state?.annotations || []; // Access annotations from state
    return (
        <>
            <LabScene video={video} pdf={pdf} assets={assets} annotations={annotations} cameraRef={cameraRef}  />
            {/*
            <div className='rounded assets'>
                <ol>
                    <li><strong>Document </strong>: {pdf && pdf.url ? <a href={pdfUrl} target="_blank">Download PDF</a> : "No PDF available"}</li>
                    <li><strong>Assets</strong>:
                        <ul>
                            {assets && assets.length > 0 ? assets.map((asset, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {asset.name || "Unnamed Asset"}
                                    <br />
                                </li>
                            )) : <li>No assets available</li>}
                        </ul>
                    </li>
                    <li><strong>More Information</strong>:</li>
                </ol>
            </div>

            <div className="rounded leave-link">
                <a href="#" className='link-light'><i className="bi bi-box-arrow-left"></i> <span className='ps-1'>Leave</span></a>
            </div>

            <div className="chat rounded">
                <div className="chat-messages">
                    {chat.map((chatObj, index) => (
                        <div key={index} className={`chat-message ${chatObj.sender.id === user.id ? 'chat-message-self' : 'chat-message-other'}`}>
                            <div className={`chat-message-header ${getUserColorClass(index)}`}>
                                <strong>{chatObj.sender.id}</strong>
                            </div>
                            <div className="chat-message-body">{chatObj.msg}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Type a message..." />
                    <button>Send</button>
                </div>
            </div>
            */}
        </>
    );
}

export default Lab;
