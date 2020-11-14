import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#252429',
    color: '#93c2db',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transform: `translate(-50%, -50%)`,
    top: '50%',
    left: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
}));

export default function SimpleModal({ open, handleClose, newMember }) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <div>
        <h2 id='simple-modal-title'>New member joined!</h2>
        <h1 id='simple-modal-description'>
          {newMember.name}
        </h1>
      </div>

      <i className="fab fa-5x fa-slack"/> 
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
