import { motion } from "framer-motion";
import {
  Bot,
  User,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";

function Message({ sender, text }) {

  const isUser = sender === "user";

  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {

    try {

      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 1500);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: .3
      }}

      className={`flex mb-6 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}

    >

      <div
        className={`
        flex
        gap-3
        max-w-[85%]
        ${isUser ? "flex-row-reverse" : ""}
        `}
      >

        {/* Avatar */}

        <div
          className={`
          w-11
          h-11
          rounded-full
          flex
          items-center
          justify-center
          shadow-md

          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
          }
          `}
        >

          {

            isUser

            ?

            <User size={20}/>

            :

            <Bot size={20}/>

          }

        </div>

        {/* Bubble */}

        <div
          className={`
          rounded-3xl
          px-5
          py-4
          shadow-lg

          ${
            isUser

            ?

            "bg-blue-600 text-white"

            :

            "bg-white border border-slate-200"
          }
          `}
        >

          {/* Name */}

          <div
            className={`
            text-xs
            font-bold
            mb-2

            ${
              isUser
                ? "text-blue-100"
                : "text-slate-500"
            }
            `}
          >

            {

              isUser

              ?

              "You"

              :

              "AI Resume Assistant"

            }

          </div>

          {/* Message */}

          <p
            className={`
            whitespace-pre-wrap
            leading-7

            ${
              isUser
                ? "text-white"
                : "text-slate-700"
            }
            `}
          >

            {text}

          </p>

          {/* Footer */}

          <div className="flex justify-between items-center mt-4">

            <span
              className={`
              text-xs

              ${
                isUser
                  ? "text-blue-100"
                  : "text-slate-400"
              }
              `}
            >

              Just now

            </span>

            {

              !isUser && (

                <button

                  onClick={copyMessage}

                  className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-blue-600
                  hover:text-blue-800
                  "

                >

                  {

                    copied

                    ?

                    <>

                      <Check size={15}/>

                      Copied

                    </>

                    :

                    <>

                      <Copy size={15}/>

                      Copy

                    </>

                  }

                </button>

              )

            }

          </div>

        </div>

      </div>

    </motion.div>

  );

}

export default Message;