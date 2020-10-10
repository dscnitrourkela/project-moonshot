import React, {useState, useEffect} from 'react'
import firebase from '../config/firebase'
import Modal from './Modal'
import Counter from './Counter'

function Bottom() {
  const [modalOpen, setModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({name: ''});

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('slack')
      .doc('info')
      .onSnapshot((snapshot) => {
        setNewMember({
          name: snapshot.data().newMember.name,
        });
        setModalOpen(true);
        setTimeout(function () {
          setModalOpen(false);
        }, 3000);
      });
  }, []);

  return (
    <div style={{color: '#fff'}}>
      <Counter />
      {newMember.name !== '' && (
        <Modal
          open={modalOpen}
          handleClose={handleClose}
          newMember={newMember}
        />
      )}
    </div>
  )
}

export default Bottom