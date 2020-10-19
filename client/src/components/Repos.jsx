import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import GitHubIcon from '@material-ui/icons/GitHub';
import firebase from '../config/firebase'

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import axios from 'axios'
const URL = 'https://api.github.com/repos/'

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Repos() {
  const classes = useStyles()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    let tempRepo = []
    firebase.firestore().collection('repos').get().then(query => {
      query.forEach(repo => {
        tempRepo.push({ id: repo.id, ...repo.data() })
      })

      setRepos(tempRepo)
    })
  }, [])

  useEffect(() => {
    if (repos.length > 0) {
      const callApi = () => {
        repos.forEach(async repo => {
          const {owner, name} = repo
          const {data} = await axios.get(`${URL}/${owner}/${name}/issues`)

          const repoList = repos.map(repoTemp => repoTemp.name === name ? {issues: data, ...repoTemp} : repoTemp)
          setRepos(repoList)
        })
      }

      // setInterval(callApi, 10 * 1000)
    }
  }, [repos])

  console.log(repos)
  const renderRepos = repos.map((repo) => (
    <div className={classes.container} key={repo.id}>
      <div className={classes.heading}>
        <h4 className={classes.organization}>{repo.owner}</h4>
        <h3 className={classes.repoName}>{repo.name}</h3>
        <div style={{}}>
          <h5 className={classes.description}>{repo.description}</h5>
        </div>
      </div>

      <div className={classes.tags}>
        {repo.tags.map((tag, index) => (
          <h4 className={classes.tag} key={`${index}-tag`}>{tag}</h4>
        ))}
      </div>

      <div className={classes.issues}>

      </div>
    </div>
  ))

  return (
    <>
      <div className={classes.title}>
        <h2 className={classes.titleH2}>Our Repositories</h2>
        <GitHubIcon style={{ marginRight: '1em', color: '#93c2db', fontSize: 30 }} />
      </div>
      {/* <div> */}
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={2000}
        organicArrows={false}
        style={{ height: '85%', borderRadius: 10 }}
        bullets={false}
      >
        {renderRepos}
      </AutoplaySlider>
      {/* </div> */}
    </>
  )
}

export default Repos

const useStyles = makeStyles(() => ({
  title: {
    height: '12%',
    borderBottom: '1px solid #93c2db',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleH2: {
    color: '#93c2db',
    marginLeft: '1em',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.5em',
    fontWeight: '400'
  },
  container: {
    height: '100%',
    width: '100%',
    color: '#93c2db',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400',
    backgroundColor: '#183d5d',
    padding: '0.9em'
  },
  heading: {
    margin: 0,
    padding: 0
  },
  organization: {
    margin: 0,
    padding: 0,
    marginTop: 10,
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400',
    fontSize: '0.9em',
    color: '#9c4668'
  },
  repoName: {
    margin: 0,
    padding: 0,
    marginBottom: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.8em',
    color: '#9c4668'
    // lineHeight: 1
  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400',
    fontSize: '0.7em',
    textAlign: 'right',
    marginTop: '0.8em',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tag: {
    display: 'block',
    width: 'auto',
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#9c4668',
    borderRadius: 20,
    fontWeight: '400',
    fontSize: '0.7em',
    fontFamily: "'Inter', sans-serif",
  },
  issues: {},

}))