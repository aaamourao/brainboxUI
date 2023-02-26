import { Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import ImageSideBar from './ImageSideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './projectVariables.scss';
import Canvas from "./Canvas/Canvas";


class App extends Component {
  
  state = {
    selectedFile: null
  };

  handleFileChange = imageUrl => {
    this.setState({ selectedFile: imageUrl });
  };

  getSelectedFile = () => {
    return (this.state.selectedFile);
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
                <Canvas getCurrentImageUrl={this.getSelectedFile.bind(this)}/>
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
