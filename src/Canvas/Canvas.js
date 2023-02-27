import { Component, createRef } from "react";
import { Container } from "react-bootstrap";

class Canvas extends Component {

  state = {
    imageUrl: null,
    boundingBoxes: [],
  };

  startX = null;
  startY = null;
  canvasRef = null;
  contextRef = null;
  isDrawing = false;

  constructor(props) {
    super(props);
    this.getCurrentImageUrl= props.getCurrentImageUrl;

    this.canvasRef = createRef();

    this.handleChange = this.handleChange.bind(this);
    //this.startDrawingRectangle = this.drawRectangle.bind(this);
    this.drawRectangle = this.drawRectangle.bind(this);
    this.stopDrawingRectangle = this.stopDrawingRectangle.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    this.contextRef = context;
  }

  startDrawingRectangle(event) {
    event.preventDefault();
    event.stopPropagation();

    const canvasOffSet = this.canvasRef.current.getBoundingClientRect();

    const scaleX = this.canvasRef.current.width / canvasOffSet.width;
    const scaleY = this.canvasRef.current.height / canvasOffSet.height;

    this.startX = (event.clientX - canvasOffSet.left) * scaleX;
    this.startY = (event.clientY - canvasOffSet.top) * scaleY;

    this.contextRef.strokeRect(this.clientX - canvasOffSet.left, this.startY, 40, 40);
    this.isDrawing = true;

    this.setState({ isDrawing: true })
  }

  drawRectangle(event) {
    if (!this.isDrawing) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const canvasOffSet = this.canvasRef.current.getBoundingClientRect();

    const scaleX = this.canvasRef.current.width / canvasOffSet.width;
    const scaleY = this.canvasRef.current.height / canvasOffSet.height;

    const newMouseX = (event.clientX - canvasOffSet.left) * scaleX;
    const newMouseY = (event.clientY - canvasOffSet.top) * scaleY;

    const rectWidth = newMouseX - this.startX;
    const rectHeight = newMouseY - this.startY;

    this.contextRef.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    this.contextRef.strokeRect(this.startX, this.startY, rectWidth, rectHeight);
  }


  stopDrawingRectangle() {
    this.isDrawing = false;
    console.log("drawed!!!")
  }

  handleChange(event) {
    this.setState({ imageUrl: this.getCurrentImageUrl });
  }

  render () {
    return (
      <Container>
        <canvas
          ref={this.canvasRef}
          onChange={this.handleChange}
          style={{
            backgroundImage: `url(${this.getCurrentImageUrl()})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          onMouseDown={(e) => this.startDrawingRectangle(e)}
          onMouseMove={(e) => this.drawRectangle(e)}
          onMouseUp={(e) => this.stopDrawingRectangle(e)}
          onMouseLeave={(e) => this.stopDrawingRectangle(e)}
        />
      </Container>
    );
  }
}

export default Canvas;