import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
import { Container } from "react-bootstrap";

class Canvas extends Component {

  state = {
    imageUrl: null
  };

  constructor(props) {
    super(props);
    this.getCurrentImageUrl= props.getCurrentImageUrl;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ imageUrl: this.getCurrentImageUrl });
  }

  render () {
    return (
      <Container>
        <canvas
          onChange={this.handleChange}
          style={{
            backgroundImage: `url(${this.getCurrentImageUrl()})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "100%",
          }}
        />
      </Container>
    );
  }
}

export default Canvas;