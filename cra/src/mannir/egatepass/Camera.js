import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import firebase from 'firebase';
import faker from 'faker';

const b1 = { margin: 5 };
const p1 = { margin: 5, padding: 5, width: 300, height: 300, textAlign: 'center' };

var video = document.querySelector('video'), canvas;

/*
if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({video: true})
    // navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } } )
    // permission granted:
      .then(function(stream) {
        video.srcObject = stream
        video.addEventListener('click', takeSnapshot);
      })
      .catch(function(error) {
        document.body.textContent = 'Could not access the camera. Error: ' + error.name;
      });
  }
  */

function takeSnapshot() {
    var img = document.querySelector('img') || document.createElement('img');
    var context;
    var width = video.offsetWidth
      , height = video.offsetHeight;

    canvas = canvas || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    // context.drawImage(video, 0, 0, width, height);
    context.drawImage(video, 0, 0, 640, 480);

    img.src = canvas.toDataURL('image/png');
    document.body.appendChild(img);
    
    // send to firebase
    var access = {
      time: +new Date()
    }
    
    // writeUserData(+new Date(), '222', '333', '444', canvas.toDataURL('image/png'))
    var time = +new Date();
    /*
    firebase.database().ref('access/' + time).set({
    time: time,
    deviceId: '222',
    userId: '333',
    tagId: '444',
    photo: canvas.toDataURL('image/png')
  });
    */
    
    const deviceId = faker.random.number({min:100000, max:999999})
    const userId = faker.random.number({min:10000, max:99999})
    const tagId = faker.random.arrayElement(["aaaaa","bbbbb","ccccc"])
    
    var access = firebase.database().ref(`access/${time}`);
    access.set({
    time,
    deviceId,
    userId,
    tagId,
    photo: canvas.toDataURL('image/png')
  })
    .then(function() {
      console.log('Synchronization succeeded: ', + new Date());
    })
    .catch(function(error) {
      console.log('Synchronization failed');
    });


    
    console.log('Saved!: ', + new Date())
  }




export default class Camera extends React.Component {

    state = {

    }

    componentDidMount = () => {
        console.log('componentDidMount')
    }

  handleClick = (e, id) => {


    switch (id) {
        case 'camera':

        
            
            break;
    
        default:
            break;
    }
  };

  render() {
    return (
      <div>
        <Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h3">
            Camera Preview
          </Typography>
          
          <video autoplay></video>

        </Paper>

        <Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h3">
            Camera Captured
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your
            application.
          </Typography>
        </Paper>

        <Button
          variant="contained"
          style={b1}
          onClick={e => this.handleClick(e, "camera")}
        >
          Camera
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={b1}
          onClick={e => this.handleClick(e, "capture")}
        >
          Capture
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={b1}
          onClick={e => this.handleClick(e, "send")}
        >
          Send
        </Button>
      </div>
    );
  }
}
