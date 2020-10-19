import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles'

import firebase from '../config/firebase'
import Modal from './Modal'

function Slack({style}) {
  const classes = useStyles()

  const [modalOpen, setModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({name: ''});
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    firebase
      .firestore()
      .collection('slack')
      .doc('info')
      .onSnapshot((snapshot) => {
        setCounter(snapshot.data().count)
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
    <>
      <Modal 
        open={modalOpen}
        newMember={newMember}
        handleClose={() => setModalOpen(false)}
      />
      <div style={style} >
        <h1 style={{margin: 0, textAlign: 'right'}}> <i className="fab fa-slack"/> {counter}</h1>
      </div>
      
    </>
  )
}


export default Slack;


const useStyles = makeStyles(() => ({
  root: {}
}))