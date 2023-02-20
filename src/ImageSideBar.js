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
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
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
      selected: this.state.images.length,
    });
  }

  onImageSelect(index) {
    this.onFileChange(this.state.imageURLs[index]);
    this.setState({selected: index});
  }

  handleAddClick() {
    this.hiddenFileInput.current.click();
  }

  handleRemoveClick() {
    let newImages = [...this.state.images];
    let newImageURLs = [...this.state.imageURLs];
    let newSelected = this.state.selected;
    newImages.splice(newSelected, 1);
    newImageURLs.splice(newSelected, 1);
    newSelected = (newSelected > 0) ? newSelected - 1 : 0;
    this.setState({
      images: newImages,
      imageURLs: newImageURLs,
      selected: newSelected,
    });
    this.onFileChange(newImageURLs[newSelected]);
  }

  render() {
    return (
      <div className="imageSideBar">
        <Container>
          <Row>
            <div className="button-list">
              <ListGroup className="buttons-list" horizontal>
                <ListGroup.Item className="text-center" action onClick={this.handleAddClick}>
                  +
                  <input type="file" multiple accept="image/*" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}} />
                </ListGroup.Item>
                <ListGroup.Item className="text-center" action onClick={this.handleRemoveClick}>-</ListGroup.Item>
                <ListGroup.Item className="text-center" action onClick={this.handleAddClick}><BoundingBox /></ListGroup.Item>
                <ListGroup.Item className="text-center" action onClick={this.handleAddClick}>export</ListGroup.Item>
              </ListGroup>
            </div>
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