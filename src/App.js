import { Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import ImageSideBar from './ImageSideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './projectVariables.scss';


class App extends Component {
  
  state = {
    selectedFile: null
  };

  handleFileChange = imageUrl => {
    this.setState({ selectedFile: imageUrl });
  };


  render() {
    return (
      <div className="App bg-dark text-white height-full">
        <Container>
          <Row><Col className="wf flex-row">BrainBox</Col></Row>
          <Row className="mainArea height-full">
            <Col className="wf">
              <ImageSideBar onFileChange={this.handleFileChange} />
            </Col>
            <Col className="wf" xs={6}> 
              <Row>
                <img className="img-responsive" src={this.state.selectedFile} />
              </Row>
              <Row></Row>
            </Col>
            <Col className="wf"></Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    );
  }
}

export default App;
