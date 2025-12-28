import { createContext, useState, useEffect } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    
    const [prevPrompts, setPrevPrompts] = useState(() => {
        const savedHistory = localStorage.getItem("gemini_history");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    useEffect(() => {
        localStorage.setItem("gemini_history", JSON.stringify(prevPrompts));
    }, [prevPrompts]);

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    // --- NEW: Delete Function ---
    const deletePrompt = (indexToDelete) => {
        setPrevPrompts((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        deletePrompt // Exported to be used in Sidebar
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

/*  
  import { createContext, useState, useEffect } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    
    // 1. Load initial history from LocalStorage
    const [prevPrompts, setPrevPrompts] = useState(() => {
        const savedHistory = localStorage.getItem("gemini_history");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // 2. Automatically save history whenever it changes
    useEffect(() => {
        localStorage.setItem("gemini_history", JSON.stringify(prevPrompts));
    }, [prevPrompts]);

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            // Only add to history if it's a new prompt from the input box
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;    */

