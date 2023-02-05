import { Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import ImageSideBar from './ImageSideBar';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  
  state = {
    selectedFile: null
  };

  handleFileChange = imageUrl => {
    this.setState({ selectedFile: imageUrl });
  };


  render() {
    return (
      <div className="App">
        <Container>
          <Row></Row>
          <Row>
            <Col>
              <ImageSideBar onFileChange={this.handleFileChange} />
            </Col>
            <Col> 
              <Row>
                <img src={this.state.selectedFile} />
              </Row>
              <Row></Row>
            </Col>
            <Col></Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    );
  }
}

export default App;
