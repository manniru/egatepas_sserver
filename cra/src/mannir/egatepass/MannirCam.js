/* eslint-disable default-case */
import React from "react";
import Webcam from "react-webcam";
import axios from "axios";
import firebase from "firebase";
import buzz from "buzz";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import CameraAlt from "@material-ui/icons/CameraAlt";
import CameraRear from "@material-ui/icons/CameraRear";
import SpeakerPhone from "@material-ui/icons/SpeakerPhone";
import "console-log-div";

import fb from "../fb";

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

const b1 = { margin: 5 };
const p1 = {
  margin: 5,
  padding: 5,
  width: 400,
  height: 600,
  textAlign: "center"
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class MannirCam extends React.Component {

  state = {
    image: "",
    file: "",
    blob: "",
    webcamEnabled: false,
    alignment: "left",
    formats: [],
    preview: ""
  };

  enableWebcam = () => this.setState({ webcamEnabled: true });

  setRef = webcam => {
    this.webcam = webcam;
  };

  handleClick = (e, id) => {
    e.preventDefault();

    const imageSrc = this.webcam.getScreenshot();

    switch (id) {
      case "camera":
        const config1 = {
          headers: { "content-type": "multipart/form-data" }
        };

        var data = {
          imgBase64: this.state.image
        };

        axios.post("http://localhost:1313/cloudinary1", data, config1);

        break;

      case "capture":
        this.setState({
          image: imageSrc,
          blob: dataURItoBlob(imageSrc),
          file: dataURLtoFile(imageSrc, "picture.jpg")
        });
        break;

      case "save":
        console.log('save click')
        // this.readNfc();
        /*
        // generate file from base64 string
        const file = dataURLtoFile(this.state.image, "picture.jpg");
        // put file into form data
        const data = new FormData();
        data.append("file", file, file.name);

        // now upload
        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios
          .post("http://localhost:1313/uploads", data, config)
          .then(response => {
            console.log(response.data);
          });
          */

        const file = dataURLtoFile(this.state.image, "picture.jpg");
        const data = new FormData();
        data.append("file", file, file.name);

        // storageRef.put(file).then(function(snapshot) {
        //   console.log('Uploaded a blob or file!');
        // });

        // var bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
        // storageRef.put(bytes).then(function(snapshot) {
        //   console.log('Uploaded an array!');
        // });

        // var message = "data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
        // console.log(this.state.image)
        // var uploadTask = storageRef.child('images/mountains.jpg').put(file);

        // storageRef.child('images/').putString(this.state.image, "data_url").then(function(snap) {
        //   console.log("Uploaded a data_url string!");
        //   console.log(snap)
        // });

        const filename = +new Date() + ".jpg";

        var uploadTask = fb
          .storage()
          .ref("/buk/images/2019")
          .child("images/" + filename)
          .put(file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {},
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                fb.database()
                  .ref(`images`)
                  .push({
                    downloadURL: downloadURL,
                    filename: filename,
                    title: filename,
                    author: "Security Officer"
                  })
                  .then(
                    () => {
                      // authStateChanged({ email: values.email });
                      console.log("Firebase Updated!");
                    },
                    e => {
                      //authError(e)
                      console.log(e);
                    }
                  );

                console.log("File available at", downloadURL);
              });
          }
        );

        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios
          .post("http://localhost:1313/firebasestore", data, config)
          .then(response => {
            console.log(response.data);
          });

        console.log("Sent to Server");
        break;

      case "send2":
        /*
        let formData = new FormData();
        // let imagefile = document.querySelector("#file");
        formData.append("img", this.state.image);

        var data = {
          title: this.title,
          tagline: this.tagline,
          slug: this.slug,
          body: this.body
        };

        // formData.append('data', data)


        axios
          .post("http://localhost:1313/cloudinary1", this.state.image)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            alert(error);
          });
          */

        console.log("send2");
        break;

      case "send3":
        axios.post(
          "http://localhost:1313/testFormData",
          { imgBase64: this.state.image },
          { headers: { "content-type": "multipart/form-data" } }
        );
        console.log("send3");
        break;

      case "nfc":
        this.readNfc();
        break;
      default:
        break;
    }
  };

  fileUpload = () => {
    let data = new FormData();
    // canvas.toBlob(function (blob) {
    //     data.append('data', blob);

    // });

    data.append("data", dataURItoBlob(this.state.image));

    axios
      .post(`http://localhost:1313/images`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res);
      });
  };

  cloudinary = () => {
    const file = dataURLtoFile(this.state.image, "picture.jpg");
    const data = new FormData();
    data.append("file", file, file.name);

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    axios
      .post("http://localhost:1313/cloudinary1", data, config)
      .then(response => {
        console.log(response.data);
      });
  };

  beep(e, id) {
    // var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    // snd.play();

    // var context = new AudioContext()
    // var o = context.createOscillator()
    // var  g = context.createGain()
    // o.connect(g)
    // g.connect(context.destination)

    switch (id) {
      case "start":
        // var mySound = new buzz.sound("./buzz.mp3");
        // buzz.all().play();
        var sound = new buzz.sound("./buzz.mp3", {
          formats: ["ogg", "mp3", "aac"]
        });

        this.playSound();
        

        // o.start(0)

        console.log("start");
        break;

      case "stop":
        // g.gain.exponentialRampToValueAtTime(
        //   0.00001, context.currentTime + 0.04
        // )

        console.log("stop");
        break;
    }
  }

  playSound1 = () => {
    var mySound = new buzz.sound(
      "/Users/mannir/GitHub/egatepass/cra/src/mannir/egatepass/buzz.mp3 ",
      { formats: ["ogg", "mp3", "acc"] }
    );
    mySound.play();
  };

  playSound = () => {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator();
    osc.type = "sine"; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 440; // Hz
    osc.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 5);
  }

  handleFormat = (e, formats) => {
    console.log(formats)

    this.setState({ formats })
  }

  handleAlignment = (event, alignment) => this.setState({ alignment });

  readNfc = () => {
    // const { firebaseApp } = this.props;

    if (navigator.nfc) {
      console.log("Waiting tag...");
      this.playSound();
      navigator.nfc.watch(message => {
        for (let record of message.records) {
          // log(false, 'Record type:  ' + record.recordType);
          // log(false, 'MIME type:    ' + record.mediaType);
          // log(false, '=== data ===\n' + record.data);
          // fb.database().ref(`nfc/read/${+ new Date()}`).set(JSON.parse(record.data))
          // fb.database().ref(`nfc/read`).push(JSON.parse(record.data))

          var tm = +new Date();
          fb.database()
            .ref(`access/${tm}`)
            .set({
              // image: this.state.screenshot,
              userId: "1",
              deviceId: "2",
              // tagId: JSON.parse(record.data),
              locationId: "3",
              time: tm
            });

          console.log("13131", record.data);
        }
      });
    } else {
      console.log(
        "It looks like your browser and/or device does not support web NFC."
      );
    }
  };

  render() {
    const { alignment, formats } = this.state;

    const videoConstraints = {
      // facingMode: { exact: "environment" }
      facingMode: "user"
    };

    // let videoConstraints;

    // if (formats.includes('back')) {
    //   videoConstraints = {
    //     facingMode: { exact: "environment" }
    //   };
    // }

    // else {
    //   videoConstraints = {
    //     facingMode: "user"
    //   };
    // }

    return (
      <div style={styles}>
        <h3>EGatePass System</h3>

        {/* <Paper style={p1} elevation={3}>
        <Typography variant="h5" component="h3">
            Console
          </Typography>
        
        </Paper> */}

        <Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h3">
            Camera Preview
          </Typography>

          <div>
            <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
              <ToggleButton value="preview">
                <CameraAlt />
              </ToggleButton>
              <ToggleButton value="back">
                <CameraRear />
              </ToggleButton>
              <ToggleButton value="nfc">
                <SpeakerPhone />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          { formats.includes('preview') ? (
            <Webcam
              audio={false}
              height={250}
              width={250}
              screenshotFormat={"image/jpeg"}
              ref={this.setRef}
              videoConstraints={videoConstraints}
            />
          ) : (
            <h3>Camera is Off</h3>
          )}

          <Button
          disabled={!formats.includes('preview')}
            variant="contained"
            color="primary"
            style={b1}
            onClick={e => this.handleClick(e, "capture")}
          >
            Snap
          </Button>

          <img src={this.state.image} />

          

          <Button
            variant="contained"
            color="primary"
            style={b1}
            onClick={e => this.handleClick(e, "nfc")}
            // onClick={e => this.confirmphoto(e)}
          >
            NFC
          </Button>

          <Button
          variant="contained"
          style={b1}
          //   onClick={e => this.handleClick(e, "camera")}
          // onClick={this.beep}
          onClick={e => this.beep(e, "start")}
        >
          Beep
        </Button>

        </Paper>

        <Button
            variant="contained"
            color="secondary"
            style={b1}
            onClick={e => this.handleClick(e, "save")}
            // onClick={e => this.confirmphoto(e)}
          >
            Save
          </Button>

          <div id="log"></div>


        {/* 
        <Button
          variant="contained"
          color="secondary"
          style={b1}
          // onClick={e => this.handleClick(e, "send3")}
          onClick={e => this.cloudinary(e)}
        >
          Cloudinary
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={b1}
          onClick={e => this.send2blob(e)}
        >
          Blob
        </Button> */}

        {/* <SimpleReactFileUpload /> */}

        {/* <form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form> */}
      </div>
    );
  }
}
