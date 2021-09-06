import React from "react";
import { app } from "./firebase";
import "./App.css";

function App() {
  const [openWebchat, setOpenWebchat] = React.useState(false);
  const [text, setText] = React.useState("");
  const [chatList, setChatList] = React.useState([]);
  const [chatId, setChatId] = React.useState(
    localStorage.getItem("chatId") || null
  );

  console.log(chatList);

  React.useEffect(() => {
    if (chatId) {
      app
        .database()
        .ref(`/messages/${chatId}`)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const mapping = Object.keys(data).map((keys) => ({
              ...data[keys],
            }));
            mapping.sort((x, y) => x.timestamp - y.timestamp);
            setChatList(mapping);
          }
        });
    }
  }, [chatId]);

  const setSender = (val) => {
    if (val || val !== "") {
      const payload = {
        message: val,
        timestamp: new Date().getTime(),
        type: "sender",
      };

      setText("");
      setChatList(chatList.concat(payload));
      pushDb(payload);
    }
  };

  const pushDb = (val) => {
    if (!chatId) {
      const ref = app.database().ref(`/messages`).push();
      ref.set({ intro: val }).then(() => {
        localStorage.setItem("chatId", ref.key);
        setChatId(ref.key);
      });
    } else {
      const ref = app.database().ref(`/messages/${chatId}`).push();
      ref.set(val);
    }
  };

  return (
    <div className="webchat-app">
      {/*  Chat Layout */}
      {openWebchat && (
        <div className="card webchat-card">
          {/* Chat header */}
          <div className="webchat-head">
            <div className="webchat-head-text">
              <h5 className="card-title webchat-title">Hubungi Kami</h5>
              <p className="card-title webchat-sub-title">
                Halo bro kalo kamu ada kesusahan boleh tanya langsung ke kami.
              </p>
            </div>
            <span
              className="close-toggle"
              onClick={() => setOpenWebchat(false)}
            >
              x
            </span>
          </div>
          {/* Chat body */}
          <div className="webchat-body">
            <div className="webchat-body-text">
              {/* introduction */}
              {chatList?.length === 0 && (
                <>
                  <p className="text-center">How may we assist you?</p>
                  {[
                    "I have a pricing question",
                    "I have a question about Enterprise",
                    "I have a question about Subscription"
                  ].map((val, key) => (
                    <div
                      className="d-flex justify-content-center m-1"
                      key={key}
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setSender(val)}
                      >
                        {val}
                      </button>
                    </div>
                  ))}
                </>
              )}

              {/* already interaction */}
              {chatList?.length >= 1 &&
                chatList?.map((val, key) => (
                  <div
                    className={
                      (val?.type === "sender"
                        ? "justify-content-end"
                        : "justify-content-start") + " d-flex m-1"
                    }
                    key={key}
                  >
                    <button
                      type="button"
                      className={
                        (val?.type === "sender" ? "btn-primary" : "btn-light") +
                        " btn"
                      }
                    >
                      {val?.message}
                    </button>
                  </div>
                ))}
            </div>
            <input
              className="webchat-input"
              placeholder="Ask a question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSender(text);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Button Toggle */}
      {!openWebchat && (
        <button
          type="button"
          className="btn btn-primary btn-togle"
          onClick={() => setOpenWebchat(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
