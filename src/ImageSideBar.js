import { Container, ListGroup, Row } from "react-bootstrap";
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
    this.setState({
      images: this.state.images.concat(newImages),
      imageURLs: this.state.imageURLs.concat(newImageURLs),
      selected: this.state.images.length
    });
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
              <ListGroup horizontal>
                <ListGroup.Item action onClick={this.handleClick}>
                  +
                  <input type="file" multiple accept="image/*" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}} />
                </ListGroup.Item>
                <ListGroup.Item action onClick={this.handleClick}>-</ListGroup.Item>
                <ListGroup.Item action onClick={this.handleClick}><BoundingBox /></ListGroup.Item>
                <ListGroup.Item action onClick={this.handleClick}>export</ListGroup.Item>
              </ListGroup>
            <ListGroup>
              {this.state.images.length === 0 ? "Please, click on + and add images" : this.state.images.map((item, index) => (
                <ListGroup.Item action onClick={() => this.onImageSelect(index)} className={(this.state.selected === index) ? 'active' : ''}
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