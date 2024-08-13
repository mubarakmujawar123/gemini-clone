import { createContext, useEffect, useState } from "react";
import run from "../config/apiConfig";

export const Context = createContext();

const ContextProvider =(props)=>{

    const [input, setInput] = useState('');
    // const [recentPrompt, setRecentPrompt]= useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [isFromPrevPrompts, setIsFromPrevPrompts] = useState(false);
    const [showResult, setShowResult]=useState(false);
    const [loading, setLoading]= useState(false);
    const [lastPromptResultData, setLastPromptResultData]=useState('');
    const [chatData, setChatData]=useState([]);
    const [isNewChat, setIsNewChat]=useState(true);


    const delay =(index, nextWord)=>{
        setTimeout(()=>{
            setLastPromptResultData(prev => prev + nextWord)
        }, 75*index)
    }

    const newChat =()=>{
        setLoading(false);
        setShowResult(false);
        setIsNewChat(true);
        setIsFromPrevPrompts(false)
    }


    const onSent = async (prompt, isRecentPromptAvailable = false)=>{
        if(!prompt){
            return alert("Enter prompt");
        }
        setLastPromptResultData('');
        setLoading(true);
        setShowResult(true);
        // setRecentPrompt(prompt)
        if(!isRecentPromptAvailable && prompt){
             
             if(isNewChat)
                { 
                    const data = {chatId:Math.random(), chat:[{text:prompt, isFromBot:false}]}
                    setChatData(data);
                    setPrevPrompts(prev => [...prev, data]);
                }
            else{
                    setChatData(prev => ({chatId:prev?.chatId, chat:[...prev?.chat, {text:prompt, isFromBot:false}]}));
                    // setPrevPrompts(prev => [...prev, data]);
            }
        }
        const response = await run(prompt);
        let responseArr = response.split('**');
        let newResponseArr = '';
        for(let i=0; i< responseArr.length ;i++){
            if(i === 0 || i%2 !== 1 ){
                newResponseArr += responseArr[i]
            }
            else{
                newResponseArr += "<b>" + responseArr[i] + "</b>";
            }
        }
        newResponseArr = newResponseArr.split('*').join('<br/>');
        newResponseArr.split(' ').forEach((item, index)=>{
            delay(index, item +' ');
        })
        //let newResponseArr2 = newResponseArr.split(' ')
        // for(let i = 0; i<newResponseArr2.length; i++){
        //     delay(i, newResponseArr2[i]+' ')
        // }
        const data = 
        setChatData(prev => ({chatId:prev?.chatId, chat:[...prev?.chat, {text:newResponseArr, isFromBot:true}]}));
        // setPrevPrompts(prev => [...prev, data]);
        //setLastPromptResultData(newResponseArr);
        setLoading(false);
        setInput('');
        setIsNewChat(false);
        setIsFromPrevPrompts(false)
    }

    useEffect(()=>{
        if(chatData?.chatId){
            const newdata = prevPrompts.map(item => {
                if(item.chatId === chatData.chatId){
                    item.chat = chatData.chat
                }
                return item
            })
            setPrevPrompts(newdata);
            
            // setTimeout(()=>{
            //     const lastPromptResult = chatData?.chat[chatData?.chat.length -1]
            //     lastPromptResult.text.split(' ').forEach((item, index)=>{
            // delay(index, item +' ');
            // }, 100)
                    
            //  })
            
        }
           
    },[chatData])

    const contextValue = {
        onSent, input, setInput, prevPrompts, setPrevPrompts,
        showResult,setShowResult, loading, lastPromptResultData, newChat, chatData, setChatData, isFromPrevPrompts, setIsFromPrevPrompts, delay
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;