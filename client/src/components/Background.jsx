import React, {useState, useEffect} from 'react'

import firebase from '../config/firebase'

function Background({children}) {
  const [color, setColor] = useState('#000')

  useEffect(() => {
    firebase.firestore().collection('colors').doc('colors').onSnapshot(color => setColor(color.data().color1))
  }, [])
  
  return (
    <div style={{flex: 1, height: '100vh', backgroundColor: color, padding: 0}}>
      {children}
    </div>
  )
}

export default Background