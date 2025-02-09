import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const savedSentences = JSON.parse(localStorage.getItem("sentences")) || [];
    setSentences(savedSentences);
  }, []);

  useEffect(() => {
    localStorage.setItem("sentences", JSON.stringify(sentences));
  }, [sentences]);

  const handleSave = () => {
    if (input.trim() === "") return;
    const newSentence = {
      text: input,
      date: new Date().toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setSentences([...sentences, newSentence]);
    setInput("");
  };

  const handleUndo = () => {
    setSentences(sentences.slice(0, -1));
  };

  return (
    <div className="container">
      <h1>Memento</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب ذكرياتك هنا..."
        />
        <button className="save-btn" onClick={handleSave}>
          حفظ
        </button>
        <button className="undo-btn" onClick={handleUndo}>
          تراجع
        </button>
      </div>
      <div className="sentences">
        {sentences.map((sentence, index) => (
          <div key={index} className="sentence-item">
            <p className="sentence-text">{sentence.text}</p>
            <span className="date">{sentence.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
