import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Container, Toolbar, Typography} from '@material-ui/core'
import convert from 'color-convert'

import Slack from './Slack'
import firebase from '../config/firebase'

function Background({children}) {
  const [color, setColor] = useState('#072540')
  const [secondaryColor, setSecondaryColor] = useState('#93c2db')
  const classes = useStyles()

  useEffect(() => {
    firebase
      .firestore()
      .collection('colors')
      .doc('colors')
      .onSnapshot(colorSnap => {
        const color = colorSnap.data().color1
        setColor(color)
        color.split('').splice(0, 1)
        const colorNoHash = color.toString()
        const color2 = [convert.hex.hsl(colorNoHash)[0], convert.hex.hsl(colorNoHash)[1] / 1.2, convert.hex.hsl(colorNoHash)[2] * 1.1]
        setSecondaryColor(`#${convert.hsl.hex(color2[0], color2[1], color2[2])}`)
        
      })
  }, [])
  
  return (
    <div style={{flex: 1, height: '100vh', backgroundColor: color, padding: 0}}>
      <AppBar className={classes.appbar} style={{backgroundColor: secondaryColor}}>
        <Container>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          {/* <Typography variant='h4' className={classes.typography}>DSC NIT Rourkela</Typography> */}
          <img style={{width: 450, height: 100, marginTop: 8}} src={'/logo.png'} alt="DSC NIT Rourkela"/>
          <Slack />
        </Toolbar>
        </Container>
      </AppBar>
      {children}
    </div>
  )
}

export default Background

const useStyles = makeStyles(() => ({
  appbar: {
    height: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))