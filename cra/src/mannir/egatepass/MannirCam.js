import React from "react";
import Webcam from "react-webcam";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Toggle1 from './Toggle1'
import SimpleReactFileUpload from "./SimpleReactFileUpload";
// import FileUpload from './FileUpload'

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
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
  width: 300,
  height: 300,
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
    webcamEnabled: false
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

      case "send":
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

  confirmphoto(e) {
    e.preventDefault();

    console.log("confirmphoto");
    console.log("blob contents:", this.state.blob);
    axios
      .post("http://localhost:1313/uploads1", this.state.blob)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      }); //end axios call
  }

  send2server = e => {
    e.preventDefault();

    // var myBlob = new Blob(["This is my blob content"], {type : "text/plain"});
    // console.log(myBlob);
    localStorage.myfile = this.state.blob;
    var fd = new FormData();
    fd.append("upl", localStorage.myfile, "blobby.txt");
    // fetch('http://localhost:1313/blob1',
    // {
    //     method: 'post',
    //     body: fd
    // });

    axios.post("http://localhost:1313/blob1", fd, {
      headers: { "content-type": "multipart/form-data" }
    });

    console.log("send2server");
  };

  send2blob = e => {
    e.preventDefault();

    let uploadObj = () => {
      let obj =
        "o" +
        "\nv -0.500000 -0.500000 0.500000" +
        "\nv 0.500000 -0.500000 0.500000" +
        "\nv -0.500000 0.500000 0.500000" +
        "\nvt 0.000000 0.000000" +
        "\nvt 1.000000 0.000000" +
        "\nvt 0.000000 1.000000" +
        "\nvn 0.000000 0.000000 1.000000" +
        "\nf 1/1/1 2/2/1 3/3/1";

      let form = new FormData();
      form.append("triangle.obj", new Blob([obj]));

      axios.post("http://localhost:1313/multer1", form, {
        headers: { "content-type": "multipart/form-data" }
      });

      fetch("http://localhost:1313/blob1", {
        method: "POST",
        body: form
      }).then(response => {
        return response.blob();
      });
    };
    console.log("send2blob");
  };

  cloudinary = () => {
    const file = dataURLtoFile(this.state.image, "picture.jpg");
    const data = new FormData();
    data.append("file", file, file.name);

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    axios.post("http://localhost:1313/cloudinary1", data, config).then(response => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <div style={styles}>
        <h2>Mannir Cam {"\u2728"}</h2>

        <Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h3">
            Camera Preview
          </Typography>

          <Webcam
            audio={false}
            height={250}
            width={250}
            screenshotFormat={"image/jpeg"}
            ref={this.setRef}
          />
        </Paper>

        <Paper style={p1} elevation={3}>
          <Typography variant="h5" component="h3">
            Camera Captured
          </Typography>
          <img src={this.state.image} />
        </Paper>

        {/* <Toggle1 /> */}

        <Button
          variant="contained"
          style={b1}
          //   onClick={e => this.handleClick(e, "camera")}
          onClick={this.enableWebcam}
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
          // onClick={e => this.confirmphoto(e)}
        >
          Send
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={b1}
          onClick={e => this.handleClick(e, "send2")}
        >
          Firebase
        </Button>

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
        </Button>

        {/* <SimpleReactFileUpload /> */}

        {/* <form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form> */}
      </div>
    );
  }
}
