import React from 'react';
import * as d3 from 'd3';
import geoJSON from './MC_Precinct.json'
import * as topojson from 'topojson-client'

function App() {

  const WIDTH = 900;
  const HEIGHT = 900;
  React.useEffect(() => {

    var projection = d3.geoAlbers();
    var path = d3.geoPath().projection(projection);
    const svg = d3.select("svg")

    var map = d3.json("http://localhost:3000/shapes/precinct.geo.json");

    Promise.all([map]).then((values) => {

      console.warn(values)
      svg.selectAll("path")
        .data(values[0].features)
        .enter()
        .append("path")
        .attr("class","continent")
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr("d", path)
    })
    // d3.json(`http://localhost:3000/shapes/mc.topo.json`).then((topology) => {
    //
    //   projection.scale(10).translate(topology.transform.translate)
    //   console.warn(topology)
    //   svg
    //   .append("g")
    //   .selectAll("path")
    //   .data(topojson.feature(topology, topology.objects.MC_Precinct).features)
    //   .join("path")
    //   .attr("fill", 'blue')
    //   .attr('stroke', 'white')
    //   .attr("d", path)
    //
    //
    //   svg.append("path")
    //   .datum(topojson.mesh(topology, topology.objects.MC_Precinct, (a,b) => a !== b))
    //   .attr("fill", "blue")
    //   .attr("stroke", "white")
    //   // .attr('stoke-width', 1)
    //   .attr("stroke-linejoin", "round")
    //   .attr("d", path);
    //
    // }).catch(e => console.warn('error', e));
  })
  return (
    <div className="App" id="app">
      <svg width={WIDTH} height={HEIGHT} style={{background: 'yellow'}} />
    </div>
  );
}

export default App;
