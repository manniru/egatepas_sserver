import React from "react";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Console from "../console/Console";
import fb from "../fb";

const b1 = { margin: 5, width: 200 };
const p1 = { margin: 5, padding: 5, width: 300, height: 300, textAlign: 'center' };

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    };
  }
  handleCapture = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  };

  readNfc = () => {
    // const { firebaseApp } = this.props;

    if (navigator.nfc) {
      console.log("Waiting tag...");
      navigator.nfc.watch(message => {
        for (let record of message.records) {
          // log(false, 'Record type:  ' + record.recordType);
          // log(false, 'MIME type:    ' + record.mediaType);
          // log(false, '=== data ===\n' + record.data);
          // fb.database().ref(`nfc/read/${+ new Date()}`).set(JSON.parse(record.data))
          // fb.database().ref(`nfc/read`).push(JSON.parse(record.data))

          var tm = +new Date();
          fb.database()
            .ref(`/tests/vehicles/${tm}`)
            .set({
              image: this.state.screenshot,
              userId: "1",
              deviceId: "1",
              tagId: JSON.parse(record.data),
              locationId: "2",
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
    // navigator.mediaDevices.enumerateDevices().then(devices => console.log(devices))

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: { exact: "environment" }
    };
    // const videoConstraints = {facingMode: camera, width: 1920, height: 1080 }
    //style={{width: "200", height: "300", backgroundColor: 'green'}}
    return (
      <div>
        <h1>eGatePass System Security Realtime Vehicle Counting & Identification System</h1>

      
<Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h5">
            Camera Preview
          </Typography>
          <Webcam
          audio={false}
          ref={node => (this.webcam = node)}
          videoConstraints={videoConstraints}
          height={300}
          // width={300}
        />

        </Paper>

        <div>
          <h2>Camera Preview</h2>
          {/* <div className="webcams" >
            <Webcam
              audio={false}
              width="200"
              height="300"
              videoConstraints={videoConstraints}
              
            />
          </div> */}
        </div>
        <div>
          <h2>Screenshots</h2>
          <div className="screenshots">
            <div className="controls">
              {/* <Button
                variant="contained"
                color="default"
                style={b1}
                onClick={this.handleClick}
              >
                Capture
              </Button> */}

              <Button
                variant="contained"
                color="primary"
                style={b1}
                onClick={this.handleCapture}
              >
                Capture
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={b1}
                onClick={e => this.readNfc(e)}
              >
                Save to Firebase
              </Button>
            </div>
            {this.state.screenshot ? (
              <img src={this.state.screenshot} height={500} width={300} />
            ) : null}
          </div>
        </div>

        <div id="console-log-div" />

      </div>
    );
  }
}
