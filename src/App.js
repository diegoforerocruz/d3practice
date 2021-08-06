import { React, Component } from "react";
import ChartWrapper from "./components/chartWrapper";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GenderDropdown from "./components/genderdropdown";

class App extends Component {
  state = {
    gender: "Men",
  };

  genderSelected = (gender) => {
    this.setState({
      gender: gender,
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Brand text</Navbar.Brand>
        </Navbar>
        <Container className="my-5">
          <Row>
            <Col xs={12}>
              <GenderDropdown genderSelected={this.genderSelected} />
            </Col>
          </Row>
          <Row className="my-5">
            <Col xs={12}>
              <ChartWrapper gender={this.state.gender} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
