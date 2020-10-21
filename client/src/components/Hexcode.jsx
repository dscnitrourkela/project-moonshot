import React, {useEffect, useState} from 'react'
import {Typography} from '@material-ui/core'

import firebase from '../config/firebase'

function Hexcode() {
  const [hexcode, setHexcode] = useState('#000000')

  useEffect(() => {
    firebase.firestore().collection('colors').doc('colors').onSnapshot(color => setHexcode(color.data().color1))
    setInterval(()=>{window.location="/"},30*60*1000);
  }, [])

  function showVertical(hexcode) {
    const hexcodeArray = hexcode.split('')
    return (
      <div style={{width: 40, backgroundColor: '#183d5d', height: 'auto',
        position: 'absolute',
        top: '15%',
        right: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
      }}>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[0]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[1]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[2]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[3]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[4]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[5]}</Typography>
        <Typography style={{color: '#93c2db'}} variant="h5">{hexcodeArray[6]}</Typography>
      </div>
    )
  }
  return showVertical(hexcode)
}

export default Hexcode