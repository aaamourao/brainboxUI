import { Container, Form } from "react-bootstrap";
import React, { Component } from "react";


class ImageSideBar extends Component {

  state = {
    images: [],
    imageURLs: [],
  }

  onFileChange = null;

  constructor(props) {
    super(props);
    this.onFileChange = props.onFileChange;
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(event) {
    const newImages = [...event.target.files];
    this.setState({images: newImages})
    if (newImages.length < 1) return;
    const newImageURLs = [];
    newImages.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    this.setState({imageUrls: newImageURLs})
    this.onFileChange(newImageURLs[0]);
  }

  render() {

    return (
      <div className="App">
        <Container>
          <Form.Group controlId="imgInput" className="mb-3">
            <Form.Label>Select dataset</Form.Label>
            <Form.Control type="file" multiple accept="image/*" onChange={this.onImageChange} />
          </Form.Group>
        </Container>
      </div>
    );
  }
}

export default ImageSideBar;