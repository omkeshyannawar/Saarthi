import React, { useState, useEffect } from "react";
import "../styles/JournalPage.css";
import BackFeature from '../components/BackFeature'

const JournalPage = () => {
  const [mood, setMood] = useState("");
  const [journalText, setJournalText] = useState("");
  const [productivity, setProductivity] = useState(0);
 
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [entries, setEntries] = useState(() => {
  const savedEntries =
    localStorage.getItem("journalEntries");

  return savedEntries
    ? JSON.parse(savedEntries)
    : [];

});

 

  const today = new Date().toLocaleDateString();
  useEffect(() => {

  localStorage.setItem(
    "journalEntries",
    JSON.stringify(entries)
  );

}, [entries]);

  function addEntry() {
    if (
      mood === "" ||
      productivity === 0 ||
      journalText.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      date: today,
      mood: mood,
      productivity: productivity,
      journal: journalText,
    };

    setEntries([...entries, newEntry]);

    setMood("");
    setProductivity(0);
    setJournalText("");
  }
  function startEdit() {
  setEditMode(true);
  setEditText(selectedEntry.journal);
}

function saveChanges() {
  const updatedEntries = entries.map((entry, index) => {
    if (index === selectedEntry.index) {
      return {
        ...entry,
        journal: editText,
      };
    }

    return entry;
  });

  setEntries(updatedEntries);

  setSelectedEntry({
    ...selectedEntry,
    journal: editText,
  });

  setEditMode(false);
}

function deleteEntry() {
  const updatedEntries = entries.filter(
    (_, index) => index !== selectedEntry.index
  );

  setEntries(updatedEntries);

  setSelectedEntry(null);

  setEditMode(false);
}

  return (
    <div className="journalPage">
      <div className="backContainer">
    <BackFeature />
  </div>
      <h1 className="journalTitle">
        Daily Journal
      </h1>

      <div className="journalTopSection">

        {/* LEFT CARD */}

        <div className="infoCard glass">

          <div className="currentDate">
            📅 {today}
          </div>

          <div>
            <h3>Mood</h3>

            <div className="moodContainer">

              <button
                className={mood === "😊" ? "selectedMood" : ""}
                onClick={() => setMood("😊")}
              >
                😊
              </button>

              <button
                className={mood === "😌" ? "selectedMood" : ""}
                onClick={() => setMood("😌")}
              >
                😌
              </button>

              <button
                className={mood === "😐" ? "selectedMood" : ""}
                onClick={() => setMood("😐")}
              >
                😐
              </button>

              <button
                className={mood === "😔" ? "selectedMood" : ""}
                onClick={() => setMood("😔")}
              >
                😔
              </button>

              <button
                className={mood === "😡" ? "selectedMood" : ""}
                onClick={() => setMood("😡")}
              >
                😡
              </button>

            </div>
          </div>

          <div>

            <h3>Productivity</h3>

            <div className="starsContainer">

              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  onClick={() => setProductivity(star)}
                >
                  {star <= productivity ? "⭐" : "☆"}
                </span>

              ))}

            </div>

          </div>

          <button
            className="saveBtn"
            onClick={addEntry}
          >
            Save Entry
          </button>

        </div>

        {/* RIGHT PANEL */}

        <div className="rightPanel">

          {/* JOURNAL CARD */}

          <div className="journalCard glass">

            <h3>
              How was your day?
            </h3>

            <textarea
              placeholder="Write your thoughts here..."
              value={journalText}
              onChange={(e) =>
                setJournalText(e.target.value)
              }
            />

          </div>

          {/* HISTORY */}

          <div className="historySection">

            <h2>
              Entries History
            </h2>

            <div className="entriesGrid">

              {entries.map((entry, index) => (

                <div
                  className="entryCard glass"
                  key={index}
                  onClick={() =>
  setSelectedEntry({
    ...entry,
    index,
  })
}
                >

                  <h4>
                     {entry.date}
                  </h4>

                  <div className="entryMood">
                    {entry.mood}
                  </div>

                  <div className="entryStars">
                    {"⭐".repeat(entry.productivity)}
                  </div>

                  <div className="entryPreview">
                    {entry.journal.slice(0, 40)}
                    {entry.journal.length > 40
                      ? "..."
                      : ""}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}

      {selectedEntry && (

        <div
          className="modalOverlay"
          onClick={() =>
            setSelectedEntry(null)
          }
        >

          <div
            className="modalContent glass"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="closeBtn"
              onClick={() =>
                setSelectedEntry(null)
              }
            >
              ✕
            </button>

            <h2>
              Journal Entry
            </h2>

            <h4>
               {selectedEntry.date}
            </h4>

            <div className="modalMood">
              {selectedEntry.mood}
            </div>

            <div className="modalStars">
              {"⭐".repeat(
                selectedEntry.productivity
              )}
            </div>

           {
  editMode ? (
    <textarea
      className="editTextarea"
      value={editText}
      onChange={(e) =>
        setEditText(e.target.value)
      }
    />
  ) : (
    <p className="modalJournal">
      {selectedEntry.journal}
    </p>
  )
}
<div className="modalActions">

  {
    editMode ? (
      <button
        className="saveEditBtn"
        onClick={saveChanges}
      >
        Save Changes
      </button>
    ) : (
      <button
        className="editBtn"
        onClick={startEdit}
      >
        Edit
      </button>
    )
  }

  <button
    className="deleteBtn"
    onClick={deleteEntry}
  >
    Delete
  </button>

</div>

          </div>

        </div>

      )}

    </div>
  );
};

export default JournalPage;