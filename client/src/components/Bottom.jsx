import React, {useState, useEffect} from 'react'

import firebase from '../config/firebase'

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Bottom() {
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    firebase.firestore().collection('contributors').onSnapshot(query => {
      const members = []
      query.forEach(contributor => {
        members.push({name: contributor.id, photoURL: contributor.data().avatar_url, repos: contributor.data().contribution})
      })
      setContributors(members)
    })
  })

  const renderContributor = (contributor) => (
    <React.Fragment>
      <div style={{
      display: 'flex', alignItems: 'center', width: 'auto', minWidth: 800, height: window.innerHeight * 0.25 -20, justifyContent: 'space-around' 
    }}>
      <img style={{
        borderRadius: '50%' ,
        width: window.innerHeight * 0.25 - 50, 
        height: window.innerHeight * 0.25 - 50
      }} src={contributor.photoURL} />
      <div style={{width: '70%', height: '80%'}}>
        <h1 style={{color: '#93c2db', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", fontSize: '2em', textAlign: 'center', paddingBottom: 5, borderBottom: '1px solid #F0F0F0', fontWeight: '400'}}>{contributor.name}</h1>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '90%', marginTop: 10}}>
        {contributor.repos.slice(0,3).map(repo => (
          <div>
            <h3 style={{fontWeight: '400', color: '#9c4668', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", fontSize: '1.2em'}}>{repo.split('/')[0]}</h3>
            <h4 style={{fontWeight: '400', color: '#93c2db', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", fontSize: '1em'}}>{repo.split('/')[1]}</h4>
          </div>
        ))}
        </div>
      </div>
    </div>
    </React.Fragment>
    
  )

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={2000}
      organicArrows={false}
      style={{height: '100%', borderRadius: 10}}
      bullets={false}
    >
      {contributors.length > 0 ? contributors.map(contributor => (
        <div style={{width: '100%', backgroundColor: '#183d5d',}}>
          {renderContributor(contributor)}
        </div>
      )) : null} 
    </AutoplaySlider>
  )
}

export default Bottom