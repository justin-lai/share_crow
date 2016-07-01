import React, { Component, PropTypes } from 'react';
import { bindAll } from 'lodash';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

require('../assets/styles/app/_image-upload.scss');

class ImageUploader extends Component {
  constructor(props) {
    super();
    this.state = {
      data_uri: null,
      processing: false,
    };
    this.handleUpload = props.handleUpload;
    bindAll(this, 'handleFile', 'handleSubmit');
  }


  handleSubmit() {
    this.setState({
      processing: true,
    });
    fetch('/main/imageUpload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBinary: this.state.data_uri,
      }),
    })
      .then(response => response.json())
        .then(responseData => this.handleUpload(responseData.image, responseData.id));
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      $('.image-upload-wrap').hide();
      $('.file-upload-image').attr('src', upload.target.result);
      $('.file-upload-content').show();

      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
      });
      this.handleSubmit();
    };
    //eslint-disable-next-line
    console.log('https://s3-us-west-2.amazonaws.com/sharecrow/' + file.name);
    reader.readAsDataURL(file);
  }

  removeImage() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('.image-upload-wrap').bind('dragover', () => {
      $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', () => {
      $('.image-upload-wrap').removeClass('image-dropping');
    });
  }

  render() {
    let processing;
    let uploaded;
    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className="file-upload-image" src={this.state.data_uri} role="presentation" />
          <pre className="image-link-box">{this.state.uploaded_uri}</pre>
        </div>
      );
      this.state.uploaded_uri = false;
      this.removeImage();
    }

    if (this.state.processing) {
      processing = 'Image Uploaded';
    }

    return (
      <div>
        <div>
          <div className="image-upload-wrap">
            <input
              className="file-upload-input"
              type="file"
              onChange={this.handleFile} accept="image/*" encType="multipart/form-data"
            />
            <div className="drag-text">
              <h3>Click to upload an image or drag image here</h3>
            </div>
          </div>
          <div className="file-upload-content">
            <img
              className="file-upload-image" src="#"
              role="presentation"
            />
            {processing}
          </div>
           {uploaded}
        </div>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default ImageUploader;
