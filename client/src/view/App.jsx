import React from 'react';

import { Grid, AppBar, Paper, Toolbar, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Background from '../components/Background'
import P5 from '../components/P5'
import Repos from '../components/Repos'
import Bottom from '../components/Bottom'
import Slack from '../components/Slack'

function App() {
  const classes = useStyles();
  const [rect, ref] = useClientRect();

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
    <Background>
      {/* <AppBar className={classes.appbar}>
        <Container>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <Typography variant='h3' className={classes.typography}>DSC NIT Rourkela</Typography>
          <Slack />
        </Toolbar>
        </Container>
      </AppBar> */}

      <div className={classes.toolbar}></div>
      {/* <h2 style={{textAlign:'center'}}>Check the Description</h2> */}
      <Container style={{marginTop:'20px'}}>
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
              <Repos />
            </Paper>
          </Grid>

          <Grid item sm={12} md={12} lg={12} style={{height: '25%', marginBottom: 0}}>
            <Paper elevation={2} className={classes.box1}>
              <Bottom />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Background>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    height: window.innerHeight - 80,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '2em',
    color: '#072540'
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
    backgroundColor: '#183d5d',
    overflow: 'hidden'
  },
  box2: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#183d5d',
    overflow: 'hidden'
  },
  box3: {
    height: '100%',
    backgroundColor: '#183d5d',
  },
}));
