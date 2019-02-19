import React from "react";
import Webcam from "react-webcam";

class WebcamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      console.log('imageSrc', imageSrc)
    };
   
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
        // facingMode: { exact: "environment" }

      };
   
      return (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </div>
      );
    }
  }

  export default WebcamCapture;