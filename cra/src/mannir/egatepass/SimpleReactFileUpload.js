import React from 'react'
import axios, { post } from 'axios';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    /*
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
    */

    const file = this.state.file
        // put file into form data
        const data = new FormData();
        data.append("img", file, file.name);

        // now upload
        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios.post("http://localhost:1313/cloudinary1", data, config).then(response => {
          console.log(response.data);
        });

  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:1313/cloudinary1';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }


  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" id="img" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default SimpleReactFileUpload