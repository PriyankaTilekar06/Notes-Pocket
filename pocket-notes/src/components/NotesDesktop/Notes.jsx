import React, { useEffect, useState } from 'react'
import styles from './Notes.module.css'
import pocketNotesImage from '../../assets/image.png'
import CreatePopup from '../CreatePopupDesktop/CreatePopup';
import NotesSection from '../NotesSectionDesktop/NotesSection';

function Notes() {
    // Initialize state directly from localStorage
    const [displayMessages, setDisplayMessages] = useState(() => {
      const savedMessages = localStorage.getItem('displayMessages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [selectedMessage, setSelectedMessage] = useState(null);
  
    useEffect(() => {
      // Save displayMessages to localStorage only if they change after initial load
      localStorage.setItem('displayMessages', JSON.stringify(displayMessages));
    }, [displayMessages]);
  
    const addMessage = (message) => {
      setDisplayMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          message: message.message,
          color: message.color,
          initials: getInitials(message.message),
        },
      ]);
    };
  
    const getInitials = (message) => {
      if (typeof message !== 'string' || !message.trim()) {
        return '';
      }
      const words = message.split(' ');
      return words.map((word) => word[0]).join('').toUpperCase();
    };
  
    const handleClickMessage = (msgObj) => {
      setSelectedMessage({
        ...msgObj,
        initials: getInitials(msgObj.message),
      });
    };
  
    const deleteMessage = (id) => {
      const updatedMessages = displayMessages.filter((msg) => msg.id !== id);
      setDisplayMessages(updatedMessages);
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.text}>PocketNotes</h1>
          {displayMessages.map((msgObj, index) => (
            <div
              key={index}
              className={styles.messageWrapper}
              style={{
                top: `${index * 10 + 10}px`,
                color: msgObj.color,
              }}
              onClick={() => handleClickMessage(msgObj)}
            >
              <div
                className={styles.circle}
                style={{
                  backgroundColor: msgObj.color,
                }}
              >
                {getInitials(msgObj.message)}
              </div>
              <p className={styles.messageText}>{msgObj.message}</p>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); 
                  deleteMessage(msgObj.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <CreatePopup setDisplayMessage={addMessage} />
        </div>
  
        {selectedMessage ? (
          <NotesSection selectedMessage={selectedMessage} />
        ) : (
          <div className={styles.right}>
            <img src={pocketNotesImage} alt="Pocket Notes Logo" className={styles.img} />
            <h1 className={styles.text1}>Pocket Notes</h1>
            <p className={styles.para}>
              Send and receive messages without keeping your phone online. Use Pocket Notes on up to
              4 linked devices and 1 mobile phone.
            </p>
          </div>
        )}
      </div>
    );
  }
  
  export default Notes;