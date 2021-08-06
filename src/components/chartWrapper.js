import React, { Component } from "react";
import * as d3 from "d3";

class chartWrapper extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 400, 500];
    this.url = "https://udemy-react-d3.firebaseio.com/ages.json";
  }
  componentDidMount() {
    let size = 500;
    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", size)
      .attr("height", 500);
    let rect_width = 95;

    d3.json(this.url).then((agesData) => {
      svg
        .selectAll("rect")
        .data(agesData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => 5 + i * (rect_width + 5))
        .attr("y", (d) => size - d.age * 10)
        .attr("width", rect_width)
        .attr("height", (d) => d.age * 10)
        .attr("fill", (d) => {
          if (d.age <= 10) {
            return "green";
          }
          return "red";
        });
    });

    /*svg
      .selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rect_width + 5))
      .attr("y", (d) => size - d)
      .attr("width", rect_width)
      .attr("height", (d) => d)
      .attr("fill", "teal");*/
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default chartWrapper;
