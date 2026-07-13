import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import Message from "./Message";

function ChatBox() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);

    const clearChat = () => {

        setMessages([]);

    };

    const askQuestion = async (text) => {

        if (!text.trim()) return;

        setMessages(prev => [

            ...prev,

            {
                sender: "user",
                text
            }

        ]);

        setQuestion("");

        try {

            setLoading(true);

            const response = await api.post("/chat", {

                question: text

            });

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: response.data.answer

                }

            ]);

        }

        catch (error) {

            console.log(error);

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: "❌ Unable to get response."

                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg">

            {/* Header */}

            <div className="flex justify-between items-center border-b p-5">

                <div>

                    <h2 className="text-xl font-bold">

                        💬 AI Resume Assistant

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Ask anything about your resume

                    </p>

                </div>

                <button

                    onClick={clearChat}

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                >

                    Clear

                </button>

            </div>

            {/* Messages */}

            <div className="h-[500px] overflow-y-auto p-5 bg-slate-100">

                {

                    messages.length === 0 && (

                        <div className="text-center mt-24">

                            <div className="text-6xl">

                                🤖

                            </div>

                            <h3 className="mt-5 text-xl font-bold">

                                Welcome!

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Upload a resume and start chatting with AI.

                            </p>

                        </div>

                    )

                }

                {

                    messages.map((message, index) => (

                        <Message

                            key={index}

                            sender={message.sender}

                            text={message.text}

                        />

                    ))

                }

                {

                    loading && (

                        <div className="bg-white p-4 rounded-xl shadow inline-block">

                            🤖 AI is thinking...

                        </div>

                    )

                }

                <div ref={bottomRef}></div>

            </div>

            {/* Input */}

            <div className="border-t p-5 flex gap-3">

                <input

                    type="text"

                    placeholder="Ask anything..."

                    className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    value={question}

                    onChange={(e) => setQuestion(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            askQuestion(question);

                        }

                    }}

                />

                <button

                    onClick={() => askQuestion(question)}

                    disabled={loading}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"

                >

                    {

                        loading

                            ? "..."

                            : "Send"

                    }

                </button>

            </div>

        </div>

    );

}

export default ChatBox;