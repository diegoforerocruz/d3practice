import React, { Component } from "react";
import * as d3 from "d3";

const height = 400;
const width = 600;
const margin = { TOP: 50, BOTTOM: 50, LEFT: 50, RIGHT: 50 };

class chartWrapper extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.dataset = "https://udemy-react-d3.firebaseio.com/tallest_women.json";
    this.url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps.gender);
  }

  componentDidMount() {
    //this code creates the svg
    this.svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width + margin.RIGHT + margin.LEFT)
      .attr("height", height + margin.TOP + margin.BOTTOM)
      .append("g")
      .attr("transform", `translate(${(margin.LEFT, margin.TOP)})`);

    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0,${height})`);

    this.yAxisGroup = this.svg.append("g");

    this.xlabel = this.svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle");

    this.svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text("Height in CM")
      .attr("transform", "rotate(270)");

    Promise.all([
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json"),
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
    ]).then((datasets) => {
      this.menData = datasets[1];
      this.womenData = datasets[0];
      this.update("Men");
      /*const [women, men] = datasets;

      let flag = true;

      d3.interval(() => {
        this.agesData = flag ? men : women;
        this.update();
        flag = !flag;
      }, 1000);*/
    });
  }

  render() {
    return <div ref={this.myRef}></div>;
  }

  update(gender) {
    this.agesData = gender == "Men" ? this.menData : this.womenData;
    this.xlabel.text(`Tallest ${gender}`);

    const max = d3.max(this.agesData, (d) => {
      return parseInt(d.height);
    });

    //el scale linear y band nos permite que el bar char ocupe todo el svg
    const y = d3
      .scaleLinear()
      .domain([0, max + 1])
      .range([height, 0]);
    const x = d3
      .scaleBand()
      .domain(this.agesData.map((d) => d.name))
      .range([0, width])
      .padding(0.2);

    const xAxisCall = d3.axisBottom(x);
    this.xAxisGroup.transition().duration(250).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    this.yAxisGroup.transition().duration(250).call(yAxisCall);

    //join the data we want to draw
    const rects = this.svg.selectAll("rect").data(this.agesData);

    //exit the data on screen but not in the join list
    rects
      .exit()
      .transition()
      .duration(250)
      .attr("y", height)
      .attr("height", 0)
      .remove();

    //update update the data on screen that is on the join list
    rects
      .transition()
      .duration(500)
      .attr("x", (d, i) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => height - y(d.height));

    //enter draw the data on the join list that is not on the screen
    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(d.name))
      .attr("width", x.bandwidth)
      .attr("y", (d) => height)
      .attr("fill", "gray")
      .transition()
      .duration(500)
      .attr("height", (d) => height - y(d.height))
      .attr("y", (d) => y(d.height));
  }
}

export default chartWrapper;
