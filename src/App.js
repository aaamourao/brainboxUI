import { Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <div className="App">
      <Container>
        <Form.Group controlId="imgInput" className="mb-3">
          <Form.Label>Select dataset</Form.Label>
          <Form.Control type="file" multiple accept="image/*" onChange={onImageChange} />
        </Form.Group>
      </Container>
      <Container>
        {imageURLs.map(imgSrc => <img src={imgSrc} />)}
      </Container>
    </div>
  );
}

export default App;
