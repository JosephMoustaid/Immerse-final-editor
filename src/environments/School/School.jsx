import React, {useState} from 'react';
import SchoolScene from "./SchoolScene.jsx"
function School({assets ,user,  annotations, setAnnotations}) {

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
    return (
        <>
            <SchoolScene />
            {/*
            <div className='rounded assets' >
                <ol>
                    <li><strong>Document </strong>:</li>
                    <li><strong>Assets</strong> : 
                        <ul>
                            <li>Name : Arduino Card</li>
                        </ul>
                    </li>
                    <li><strong>More Information</strong> :</li>
                </ol>
            </div>

            <div className="rounded leave-link" >
                <a href="" className='link-light'><i className="bi bi-box-arrow-left"></i> <span className='ps-1'>Leave</span></a>
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

export default School;


