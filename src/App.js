import { React, Component } from "react";
import ChartWrapper from "./components/chartWrapper";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Brand text</Navbar.Brand>
        </Navbar>
        <Container className="d-flex justify-content-center my-5">
          <ChartWrapper />
        </Container>
      </div>
    );
  }
}

export default App;
