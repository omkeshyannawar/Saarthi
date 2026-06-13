import React, {
  useState,
  useEffect,
} from "react";
import BackFeature from '../components/BackFeature';''

import Markdown from "react-markdown";

import "../styles/MindMate.css";

import {
  GEMINI_URL,
} from "../components/Constants";

const MindMate = () => {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // Load chat history

  useEffect(() => {
    const savedChat =
      localStorage.getItem(
        "mindmate_chat"
      );

    if (savedChat) {
      setMessages(
        JSON.parse(savedChat)
      );
    }
  }, []);

  // Save chat history

  useEffect(() => {
    localStorage.setItem(
      "mindmate_chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  async function askMindMate(
    prompt
  ) {
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end my life",
      "self harm",
      "want to die",
      "don't want to live",
    ];

    const isCrisis =
      crisisKeywords.some(
        (word) =>
          prompt
            .toLowerCase()
            .includes(word)
      );

    if (isCrisis) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text:
            "I'm glad you reached out. Please contact a trusted person, emergency service, or mental health support service immediately. You don't have to face this alone.",
        },
      ]);

      return;
    }

    setLoading(true);

    try {
      const systemPrompt = `
You are MindMate.

You are a supportive AI companion.

Your purpose is:

- emotional support
- reflection
- mindfulness
- productivity
- motivation

You are warm,
friendly,
calm,
and non-judgmental.

You are NOT a therapist.

If the user asks a general knowledge question:

1. Answer briefly.
2. Then remind them that you are primarily a wellness companion.
3. Suggest that they can use Omkesh's Gemini Clone for detailed general-purpose conversations.

User message:

${prompt}
`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text:
                  systemPrompt,
              },
            ],
          },
        ],

        tools: [
          {
            google_search: {},
          },
        ],
      };

      const response =
        await fetch(
          GEMINI_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      const data =
        await response.json();

      const aiText =
        data?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text:
            aiText ||
            "I'm unable to generate a response right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text:
            "Something went wrong while connecting to MindMate.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!question.trim())
      return;

    const currentQuestion =
      question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text:
          currentQuestion,
      },
    ]);

    setQuestion("");

    await askMindMate(
      currentQuestion
    );
  }

  async function handleQuickPrompt(
    prompt
  ) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
    ]);

    await askMindMate(prompt);
  }

  function clearChat() {
    setMessages([]);

    localStorage.removeItem(
      "mindmate_chat"
    );
  }

  return (
    <div className="mindmatePage">
         <div className="backContainer">
    <BackFeature />
  </div>
      <div className="mindmateContainer">
        <div className="headerSection">
          <h1>
            MindMate 🌱
          </h1>

          <p>
            Your AI Companion
            for support,
            reflection,
            mindfulness and
            motivation.
          </p>

          <button
            className="clearBtn"
            onClick={
              clearChat
            }
          >
            Clear Chat
          </button>
        </div>

        {messages.length ===
          0 && (
          <div className="welcomeSection">
            <h2>
              How are you
              feeling today?
            </h2>

            <div className="quickActions">
              <button
                onClick={() =>
                  handleQuickPrompt(
                    "I am feeling low today."
                  )
                }
              >
                😔 Feeling
                Low
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "I am feeling stressed."
                  )
                }
              >
                😣 Feeling
                Stressed
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "I need someone to talk to."
                  )
                }
              >
                💬 Need To
                Talk
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "Help me focus."
                  )
                }
              >
                🎯 Help Me
                Focus
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "I cannot sleep."
                  )
                }
              >
                😴 Can't
                Sleep
              </button>
            </div>
          </div>
        )}

        <div className="chatContainer">
          {messages.map(
            (
              msg,
              index
            ) => (
              <div
                key={index}
                className={`message ${msg.role}`}
              >
                <div className="avatar">
                  {msg.role ===
                  "user"
                    ? "👤"
                    : "🌱"}
                </div>

                <div className="messageContent">
                  <Markdown>
                    {
                      msg.text
                    }
                  </Markdown>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="message model">
              <div className="avatar">
                🌱
              </div>

              <div className="messageContent">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="inputContainer">
          <input
            type="text"
            value={question}
            placeholder="Talk to MindMate..."
            onChange={(
              e
            ) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(
              e
            ) =>
              e.key ===
                "Enter" &&
              sendMessage()
            }
          />

          <button
            onClick={
              sendMessage
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindMate;