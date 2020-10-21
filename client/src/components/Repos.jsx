import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import GitHubIcon from '@material-ui/icons/GitHub';
import firebase from '../config/firebase'

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import dotenv from 'dotenv';

import axios from 'axios'
const URL = 'https://api.github.com/repos/'

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Repos() {
  const classes = useStyles()
  const [repos, setRepos] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {    
    let tempRepo = []
    firebase.firestore().collection('repos').get().then(query => {
      query.forEach(repo => {
        tempRepo.push({ id: repo.id, ...repo.data() })
      })
      setRepos(tempRepo);
      setLoading(false);
    })
  }, [])


  const callApi = async () => {
    let repoList;
    Promise.all(repos.map(async (repo)=>{
      const {owner, name} = repo
      const headersConfig= { headers: { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` } }      
      const {data} = await axios.get(`${URL}${owner}/${name}/issues`)
      return {issues: data, ...repo}
    })).then((values)=>{
      setRepos(values);
      setTimeout(callApi, 300000);    
    })    
  }

  useEffect(() => {
    dotenv.config();         
    if(repos.length>0)
      setTimeout(callApi, 300000); 
  },[repos])

  const renderRepos = repos.map((repo, index) => (
    <div className={classes.container} key={`repo-${index}`}>
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
      {repo.issues?repo.issues.map((issue, index) => (
          <div key={`${index}-tag`}> <h4 className={classes.issuetag}>{"#"+issue.number} </h4> <h4 style={{display:'inline'}} className={classes.issuedescription}>{issue.title}</h4> </div>
        )):""}
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
      {isLoading?"":(<AutoplaySlider
        play={true}
        startup={true}
        infinite={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={10000}
        organicArrows={false}
        style={{ height: '85%', borderRadius: 10 }}
        bullets={false}
      >
        {renderRepos}
      </AutoplaySlider>)}
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
    color: '#9c4668',
    fontWeight: '400' 
    // lineHeight: 1

  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
    fontSize: '0.8em',
    textAlign: 'left',
    marginTop: '0.8em',
    color:'#fff'
  },
  issuedescription: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400',
    fontSize: '0.7em',
    textAlign: 'left',
    marginTop: '0.8em',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 0
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
    borderRadius: 4,
    fontWeight: '600',
    fontSize: '0.7em',
    fontFamily: "'Inter', sans-serif",
  },
  issuetag: {
    display: 'inline',
    width: 'auto',
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#152347',
    borderRadius: 4,
    fontWeight: '400',
    fontSize: '0.7em',
    fontFamily: "'Inter', sans-serif",
  },
  issues: {},

}))