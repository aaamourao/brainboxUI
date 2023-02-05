import { Container, Form, ListGroup } from "react-bootstrap";
import React, { Component } from "react";


class ImageSideBar extends Component {

  state = {
    images: [],
    imageURLs: [],
    selected: null,
  }

  onFileChange = null;

  constructor(props) {
    super(props);
    this.onFileChange = props.onFileChange;
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(event) {
    const newImages = [...event.target.files];
    if (newImages.length < 1) return;
    const newImageURLs = [];
    newImages.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    this.onFileChange(newImageURLs[0]);
    this.setState({images: newImages,imageURLs: newImageURLs, selected: 0});
  }

  render() {

    return (
      <div className="App">
        <Container>
          <Form.Group controlId="imgInput" className="mb-3">
            <Form.Label>Select dataset</Form.Label>
            <Form.Control type="file" multiple accept="image/*" onChange={this.onImageChange} />
          </Form.Group>
          <ListGroup>
            {this.state.images.map((item, index) => (
              <ListGroup.Item key={item.name} variant={(this.state.selected === index) ? 'warning' : ''}>
                {JSON.stringify(item.name)}
              </ListGroup.Item>
            ))}
      </ListGroup>
        </Container>
      </div>
    );
  }
}

export default ImageSideBar;