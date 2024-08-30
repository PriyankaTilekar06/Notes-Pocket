import React, { useEffect, useState } from 'react'
import styles from './NotesSection.module.css'
import sendImage from '../../assets/send.png'
import formatDateTime from '../../utils/formatDateAndTime';

function NotesSection({ selectedMessage }) {
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState([]);
  
    // Ensure selectedMessage is valid and storageKey is correct
    const storageKey = selectedMessage ? `notes_${selectedMessage.id}` : '';
  
    useEffect(() => {
      if (storageKey) {
        try {
          const savedNotes = JSON.parse(localStorage.getItem(storageKey)) || [];
          console.log('Loaded notes from localStorage:', savedNotes);
          setNotes(savedNotes);
        } catch (error) {
          console.error('Error loading notes from localStorage:', error);
        }
      } else {
        console.warn('No valid storageKey');
      }
    }, [storageKey]);
  
    useEffect(() => {
      if (storageKey) {
        try {
          console.log('Saving notes to localStorage:', notes);
          localStorage.setItem(storageKey, JSON.stringify(notes));
        } catch (error) {
          console.error('Error saving notes to localStorage:', error);
        }
      }
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
           <h6 className={styles.dateTime}>
             <span>{note.date}</span> <span>{note.time}</span>
           </h6>
         </div>
          ))}
        </section>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input 
              placeholder='Enter your text here.......'
              value={noteText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <img 
              src={sendImage} 
              className={styles.sendImg} 
              alt='send' 
              onClick={handleSendClick} 
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default NotesSection;