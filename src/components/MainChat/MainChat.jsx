import React, { useContext, useEffect, useRef } from 'react'
import './mainchat.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const MainChat = () => {
    const {onSent, input, setInput, setPrevPrompts,
        showResult, loading, lastPromptResultData, chatData, isFromPrevPrompts, delay} = useContext(Context)

        console.log("chatData",chatData)
  
        const onSubmit = (e)=>{
            if(e.key === 'Enter'){
                onSent(input);
            }
        }
        const msgEndRef = useRef(null);

        useEffect(()=>{
            msgEndRef?.current?.scrollIntoView();
        },[lastPromptResultData]);



 return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt=''/>
        </div>
        <div className="main-container">
            {!showResult ? <><div className="greet">
                <p>
                    <span>Hello, Dev</span>
                    <p>How can I help you today?</p>
                </p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planing</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstrom team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className="result">
                {chatData && chatData?.chat.map((item, index)=> <>
                    {!item?.isFromBot ? <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{item.text}</p>
                    </div>
                    :
                    <><div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {index === (chatData?.chat.length - 1) && !isFromPrevPrompts 
                        ? <p dangerouslySetInnerHTML={{__html:lastPromptResultData}}></p>
                        : <p dangerouslySetInnerHTML={{__html:item.text}}></p>}
                    </div>
                    <div className='msgEnd' ref={msgEndRef}></div></>
                    }
                   
                </>
            )}
            {loading ? <div className='loader'>
                                <hr />
                                <hr />
                                <hr />

                        </div> : null
                    }

            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input value={input} onChange={(e)=> setInput(e.target.value)} onKeyUp={(e)=>onSubmit(e)}  type="text" placeholder='Enter a promt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" onClick={()=> onSent(input)}/>
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, So double check its response.
                </p>
            </div>
        </div>
    </div>
  )
}

export default MainChat
