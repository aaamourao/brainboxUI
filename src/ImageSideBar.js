import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import React, { Component } from "react";
import { BoundingBox } from 'react-bootstrap-icons';



class ImageSideBar extends Component {

  state = {
    images: [],
    imageURLs: [],
    selected: null,
  };

  onFileChange = null;
  hiddenFileInput = null;

  constructor(props) {
    super(props);
    this.onFileChange = props.onFileChange;
    this.hiddenFileInput = React.createRef();
    this.onImageChange = this.onImageChange.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onImageChange(event) {
    const newImages = [...event.target.files];
    if (newImages.length < 1) return;
    const newImageURLs = [];
    newImages.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    this.onFileChange(newImageURLs[0]);
    this.setState({images: newImages,imageURLs: newImageURLs, selected: 0});
  }

  onImageSelect(index) {
    this.onFileChange(this.state.imageURLs[index]);
    this.setState({selected: index});
  }

  handleClick() {
    this.hiddenFileInput.current.click();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <Button onClick={this.handleClick}>+</Button>
              <input type="file" multiple accept="image/*" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}} />
            </Col>
            <Col>
              <Button>-</Button>
            </Col>
            <Col>
              <Button><BoundingBox /></Button>
            </Col>
            <Col>
              <Button>export</Button>
            </Col>
          </Row>
          <Row>
            <ListGroup>
              {this.state.images.map((item, index) => (
                <ListGroup.Item action onClick={() => this.onImageSelect(index)} variant={(this.state.selected === index) ? 'warning' : ''}
                key={item.name}>
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ImageSideBar;