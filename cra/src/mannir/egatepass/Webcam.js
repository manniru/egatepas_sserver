import React, { Component } from 'react'
import ReactWebcam from 'react-webcam'

import './styles.css'

export default class Webcam extends Component {
  state = { photos: [] }

  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    // Every time a "capture" is taken, show the captured photo overlayed
    // on the video.
    const imageSrc = this.webcam.getScreenshot()
    this.setState({ photos: this.state.photos.concat(imageSrc) })
  }

  save = () => {
    // Get the "canvas" element and set its size to the
    // same size as the webcam video and snapped photos.
    const canvas = document.getElementById('canvas')
    var canvasWidth = this.webcam.video.clientWidth
    var canvasHeight = this.webcam.video.clientHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const ctx = canvas.getContext('2d')
    // Set this property to enable the "overlay" effect.
    ctx.globalCompositeOperation = 'darken'

    // Select all elements with class "photo", and convert it to an array
    // so that it can be mapped over.
    const photos = [].slice.call(document.querySelectorAll('.photo'))
    // Map over the photos array, inserting each photo element into the canvas
    photos.map(p => ctx.drawImage(p, 0, 0, canvas.width, canvas.height))

    const img = canvas.toDataURL()
    // "img" is now all of the photos overlayed, in base64
    // it should be converted to a binary and sent to the server
    console.log(img)
  }

  render() {
    return (
      <div>
        <button onClick={this.capture}>Capture photo</button>
        <button onClick={this.save}>Save photo</button>
        {/* 
           The cool blending effects come from the styles on these 
           "video", "photos", and "photo" classes in in "styles.css"
        */}
        <ReactWebcam className="video" ref={this.setRef} />
        <div className="photos">
          {this.state.photos.map(p => (
            <img key={p} src={p} className="photo" />
          ))}
        </div>
      </div>
    )
  }
}
