import React from 'react';
import { ListGroup } from 'react-bootstrap';

class ImgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFileList: Array({file: "file0"}, {file: "file1"}, {file: "file2"}),
      selected: 0,
    }
  }

  render() {
    return (
      <ListGroup>
        {this.state.imgFileList.map((item, index) => (
          <ListGroup.Item key={item.file} variant={(this.state.selected === index) ? 'warning' : ''}>
            {item.file}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

export default ImgList