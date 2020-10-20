import React, {useEffect} from 'react'
import Sketch from 'react-p5'
import drawing from '../helpers/coordinates'
import Complex, {dft} from '../helpers/complex'
import firebase from '../config/firebase'


function P5({width, height}) {
  let x = [];
  let fourierX = [];
  let time = 0;
  let path = []; 
  let skip = 6;
  let skipper=10;


  const APIcall = async() =>{
    firebase.firestore().collection('p5js').get().then(query => {
      query.forEach(doc => {
        skipper=doc.data().count
      })
  })
}

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    for (let i = 0; i < drawing.length; i += skip) {
      const c = new Complex(drawing[i][0]-200, drawing[i][1]-200);
      x.push(c);
    }
    fourierX = dft(x);
    fourierX.sort((a, b) => b.amp - a.amp);
    setInterval(()=>{
     APIcall()
    },6000)
  };
  const draw = (p5) => {
    function epicycles(x, y, rotation, fourier) {
      console.log(fourier.length)
      for (let i = 0; i < p5.min(fourier.length,skipper); i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * p5.cos(freq * time + phase + rotation);
        y += radius * p5.sin(freq * time + phase + rotation);
        p5.stroke(255, 50);
        p5.noFill();
        p5.ellipse(prevx, prevy, radius * 2);
        p5.stroke(255,50);
        p5.line(prevx, prevy, x, y);
      }
      return p5.createVector(x, y);
    }
      p5.background(24,61,93);
      let v = epicycles(p5.width/2, p5.height/2 , 0, fourierX);
      path.unshift(v);

      p5.beginShape();
      for (let i = 0; i < path.length; i++) {
        p5.vertex(path[i].x, path[i].y);
        p5.stroke(255,138,226)
        p5.strokeWeight(2)
        p5.fill(156,70,104,200)
        //if(i%10===0){
        //  p5.endShape()
        //  p5.beginShape()
       // }
      }
      p5.endShape();
    
      const dt = p5.TWO_PI / fourierX.length;
      time += dt;
    
      if(path.length>834){
        path.pop()
      }
      if (time > p5.TWO_PI) {
        time = 0;
      }
  };

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default P5