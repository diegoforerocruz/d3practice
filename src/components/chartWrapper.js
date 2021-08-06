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
    const height = 400;
    const width = 600;
    const margin = { TOP: 50, BOTTOM: 50, LEFT: 50, RIGHT: 50 };
    let svg = d3
      .select(this.myRef.current)
      .append("svg")

      .attr("width", width + margin.RIGHT + margin.LEFT)
      .attr("height", height + margin.TOP + margin.BOTTOM)
      .append("g")
      .attr("transform", `translate(${(margin.LEFT, margin.TOP)})`);
    let rect_width = 95;

    d3.json(this.url).then((agesData) => {
      const max = d3.max(agesData, (d) => {
        return parseInt(d.age);
      });
      console.log(max);
      //el scale linear y band nos permite que el bar char ocupe todo el svg
      const y = d3
        .scaleLinear()
        .domain([0, max + 1])
        .range([height, 0]);
      const x = d3
        .scaleBand()
        .domain(agesData.map((d) => d.name))
        .range([0, width])
        .padding(0.2);

      const xAxisCall = d3.axisBottom(x);
      svg
        .append("g")
        .call(xAxisCall)
        .attr("transform", `translate(0,${height})`);

      const yAxisCall = d3.axisLeft(y);
      svg.append("g").call(yAxisCall);

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("age of children");

      svg
        .append("text")
        .attr("x", -height / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .text("Age in years")
        .attr("transform", "rotate(270)");

      svg
        .selectAll("rect")
        .data(agesData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(d.name))
        .attr("y", (d) => y(d.age))
        .attr("width", x.bandwidth)
        .attr("height", (d) => height - y(d.age))
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
