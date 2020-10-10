import React, {useState, useEffect} from 'react'
import firebase from '../config/firebase'


function Counter() {
  const [slackCounter, setSlackCounter] = useState(0);
  useEffect(() => {
    firebase
      .firestore()
      .collection('slack')
      .doc('info')
      .onSnapshot((snapshot) => {
        setSlackCounter(snapshot.data().count);
      });
  }, [])

  return (
    <div>
      Slack Counter is {slackCounter}
    </div>
  )
}

export default Counter