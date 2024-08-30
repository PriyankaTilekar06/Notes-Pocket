import React, { useEffect, useState } from 'react';
import styles from './NotesSection.module.css';
import sendImage from '../../assets/send.png'
import formatDateTime from '../../utils/formatDateAndTime';

function NotesSection({ selectedMessage }) {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const storageKey = `notes_${selectedMessage.id}`;

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(storageKey)) || [];
    setNotes(savedNotes);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  const handleInputChange = (e) => {
    setNoteText(e.target.value);
  };

  const addNote = () => {
    if (noteText.trim()) {
      const now = new Date();
      const { date, time } = formatDateTime(now);
      const newNote = {
        text: noteText,
        date: date,
        time: time
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNote();
      e.preventDefault();
    }
  };

  const handleSendClick = () => {
    addNote();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.circle} style={{ backgroundColor: selectedMessage.color }}>
          {selectedMessage.initials}
        </div>
        <h2 className={styles.header}>{selectedMessage.message}</h2>
      </div>
      <section className={styles.notes}>
        {notes.map((note, index) => (
          <div key={index} className={styles.note}>
            <p>{note.text}</p>
            <div className={styles.dateTime}>
              <span>{note.date}</span> <span>{note.time}</span>
            </div>
          </div>
        ))}
      </section>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input 
            placeholder='Enter your text here...'
            value={noteText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <img 
            src={sendImage} 
            className={styles.sendImg} 
            alt='Send message' 
            onClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
}

export default NotesSection;
