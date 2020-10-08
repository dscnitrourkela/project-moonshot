import React from 'react';
import Hello from './Hello';

import { Grid, AppBar, Paper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant='h3'>DSC NIT Rourkela</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}></div>
      <Grid container spacing={3} className={classes.container}>
        <Grid item lg={12}>
          <Paper elevation={2} className={classes.box1}>
            <h1>Box1</h1>
          </Paper>
        </Grid>
        <Grid item lg={7}>
          <Paper elevation={2} className={classes.box2}>
            <h1>Box2</h1>
          </Paper>
        </Grid>
        <Grid item lg={5}>
          <Paper elevation={2} className={classes.box3}>
            <h1>Box3</h1>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F5F5F5',
  },
  toolbar: theme.mixins.toolbar,
  box1: {
    height: '17vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    height: '68vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    height: '68vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
