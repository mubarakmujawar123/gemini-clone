import React, { useContext, useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const {prevPrompts, newChat, setChatData, setIsFromPrevPrompts} = useContext(Context);

  const loadPrompt = async (chatId)=>{
    const loadChatData = prevPrompts?.find(item => item.chatId === chatId);
    setChatData(loadChatData);
    setIsFromPrevPrompts(true);
  }

  console.log("prevPrompts",prevPrompts)
  return (
    <div className='sidebar'>
      <div className="top">
        <img className='menu' onClick={()=>{setExtended(!extended)}} src={assets.menu_icon} alt=''/>
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt=''/>
          {extended ? <p>New Chat</p>: null}
        </div>
        {extended ? <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map((item, index) => {
            return (<div key={index} onClick={()=>loadPrompt(item.chatId)} className="recent-entry">
                <img src={assets.message_icon} alt=''/>
                <p>{item?.chat[0]?.text.slice(0, 18)} ...</p>
              </div>)
          })}
          
        </div> : null}
      </div>
      <div className="bottom">
      <div className="bottom-item recent-entry">
        <img src={assets.question_icon} alt=''/>
        {extended ? <p>Help</p>:null}
      </div>
      <div className="bottom-item recent-entry">
        <img src={assets.history_icon} alt=''/>
        {extended ? <p>Activity</p>:null}
      </div>
      <div className="bottom-item recent-entry">
        <img src={assets.setting_icon} alt=''/>
        {extended ? <p>Setting</p>: null}
      </div>

      </div>
    </div>
  )
}

export default Sidebar
