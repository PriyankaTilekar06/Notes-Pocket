import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import styles from './CreatePopup.module.css'

function CreatePopup({ setDisplayMessage }) {
    const [message, setMessage] = useState("");
    const [selectedColor, setSelectedColor] = useState("FF5733");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleCreate = () => {

        if (message.trim() && selectedColor) {
            setDisplayMessage({ message, color: selectedColor });
            setMessage('');
            setSelectedColor('');
            handleClose();  
    } else {
      setDisplayMessage('Please enter a group name.');
    }
  };
  
  return (
    <div className={isOpen ? styles.blur : ''}>
            <Popup trigger={<button className={styles.plus} onClick={handleOpen}>+</button>}
           modal
           open={isOpen}
           onClose={handleClose}
           contentStyle={{ background: 'none', border: 'none' }}
           overlayStyle={{ background: 'rgba(0, 0, 0, 0.6)' }}>
                {
                    close => (
                        <div className={styles.container}>
                            <div className='content'>
                                <h4 className={styles.heading}>Create New Group</h4>
                                <label className={styles.name}>Group Name</label>
                                <input 
                                placeholder='Enter group name' 
                                className={styles.input}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className={styles.colorSection}>
                                    <h4 className={styles.color}>Choose Color</h4>
                                        <div className={styles.colorOptions}>
                                            {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map(color => (
                                            <div
                                                key={color}
                                                className={styles.colorOption}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                {selectedColor === color && <span className={styles.checkmark}>✓</span>}
                                            </div>
                                            ))}
                                        </div>
                                </div>
            </div>
            <div>
              <button
                className={styles.create}
                onClick={() => {
                  handleCreate();
                  close();
                }}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default CreatePopup
