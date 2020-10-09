import React, { useState, useEffect } from 'react';

import { Grid, AppBar, Paper, Toolbar, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '../components/Modal';
import firebase from '../config/firebase';
import P5 from '../components/P5'

function App() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [slackCounter, setSlackCounter] = useState(0);
  const [newMember, setNewMember] = useState({
    name: '',
  });
  const [rect, ref] = useClientRect();

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('slack')
      .doc('info')
      .onSnapshot((snapshot) => {
        setSlackCounter(snapshot.data().count);
        setNewMember({
          name: snapshot.data().newMember.name,
        });
        setModalOpen(true);
        setTimeout(function () {
          setModalOpen(false);
        }, 3000);
      });
  }, []);

  function useClientRect() {
    const [rect, setRect] = React.useState(null);
    const ref = React.useCallback(node => {
      if (node !== null) {
        setRect(node.getBoundingClientRect());
      }
    }, []);
    return [rect, ref];
  }

  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant='h3'>DSC NIT Rourkela</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbar}></div>

      <Container>
        <Grid container spacing={3} className={classes.container}>
          <Grid item sm={12} md={8} lg={8} style={{height: '75%'}}>
            <Paper elevation={2} className={classes.box2}>
              {rect && (
                <P5 width={Math.round(rect.width) * 2} height={Math.round(rect.height)} />
              )}
            </Paper>
          </Grid>

          <Grid item sm={12} md={4} lg={4} style={{height: '75%', marginBottom: 0}}>
            <Paper elevation={2} className={classes.box3} ref={ref}>
              <h1>Box3</h1>
            </Paper>
          </Grid>

          <Grid item sm={12} md={12} lg={12} style={{height: '25%', marginBottom: 0}}>
            <Paper elevation={2} className={classes.box1}>
              <h1>{slackCounter}</h1>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setTimeout(function () {
                    setModalOpen(false);
                  }, 5000);
                }}
                style={{ marginLeft: 20 }}
              >
                open
              </button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {newMember.name !== '' && (
        <Modal
          open={modalOpen}
          handleClose={handleClose}
          newMember={newMember}
        />
      )}
    </>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    height: window.innerHeight - 80,
    backgroundColor: ''
  },
  appbar: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(156, 70, 104, 0.3)'
  },
  toolbar: {
    ...theme.mixins.toolbar, 
    height: 80
  },
  box1: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#072540',

  },
  box2: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#072540',
    overflow: 'hidden'
  },
  box3: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#072540',
  },
}));
