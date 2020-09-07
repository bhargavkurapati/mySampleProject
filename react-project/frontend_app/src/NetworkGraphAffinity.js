import React from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const API_URL=process.env.REACT_APP_API_URL
// const API_URL="http://9.51.192.123:8000"

class NetworkGraphForAffinity extends React.Component{
    shouldComponentUpdate(nextProps) {
      const differentApp = this.props.queryToRun !== nextProps.queryToRun;
      console.log(this.props,":",nextProps)
      console.log(differentApp)
      return differentApp ;
    }
  
    runAxiosToGetAffinity=(e)=>{
      d3.select('.chart'+this.props.width).selectAll("g").remove();
      axios.get(API_URL+e).then(res=>{
        const data = res.data.results
        console.log(data)
        console.log("OFFSET: ",d3.select('.chartContainer'+this.props.width))
                  var nodes=[]
                  var hosts=[]
                  var links=[]
                  var nodes_2=[]
                  data.map(
                      (item)=>{
                         // let tempSource=item.source_ip+":"+item.source_port
                         // let tempDest=item.destination_ip+":"+item.dest_port
                          if ( ! nodes.includes(item.source_ip)){
                              nodes.push(item.source_ip)
                              hosts.push({host:(item.source_host!==''?item.source_host:item.source_ip),app:item.business_application})
                          }
                          if ( ! nodes.includes(item.destination_ip)) {
                              nodes.push(item.destination_ip)
                              hosts.push({host:(item.destination_host!==''?item.destination_host:item.destination_ip),app:item.business_application})
                          }
                          links.push({source:item.source_ip,target:item.destination_ip,app:item.business_application})
                      }
                  )
                  nodes.map(
                      (item,idx) => {
                          let tempMap={}
                          tempMap.ip=item
                          tempMap.host=hosts[idx].host
                          tempMap.app=hosts[idx].app
                          nodes_2.push(tempMap)
                      }
                  )
                  console.log("Nodes", nodes)
                  console.log("Links",links)
                  console.log("Nodes_2",nodes_2)
                  this.setState({
                      nodes: nodes_2,
                      links: links,
                  })
                  const width=this.props.width;
                  const height=this.props.height;
                  const radius=20;
                  const boundary=5;
                  var simulation = d3.forceSimulation(nodes_2)
                  .force("charge", d3.forceManyBody().strength(-50).distanceMin(20).distanceMax(200))
                  .force("center", d3.forceCenter(width / 2, height / 2))
                  .force("link",d3.forceLink(links).id(d =>{return d.ip;}).distance(40).strength(1))
                  .force('collision', d3.forceCollide().radius(30)).tick(300);
                  const chart = d3.select('.chart'+this.props.width)
                  .attr("preserveAspectRatio", "xMinYMin meet")
                  .attr('width',width).attr('height',height)/*.call(d3.zoom().scaleExtent([-5, 5])
                  .translateExtent([[-100, -100], [width+100, height+100]])
                  .extent([[-100, -100], [width+100, height+100]])
                  .on("zoom", ()=>{chart.attr("transform",d3.event.transform)})
                  )*/
  
                  //drag handler
                  //d is the node 
                  const drag_start = d => {
                      if (!d3.event.active) simulation.alpha(0.01).restart();
                      d.fx = d.x;
                      d.fy = d.y;
                  }
                  
                  const drag_drag = d => {
                      d.fx = d3.event.x;
                      d.fy = d3.event.y;
                  }
                  
                  
                  const drag_end= d => {
                      if (!d3.event.active) simulation.alphaTarget(0);
                      d.fx = null;
                      d.fy = null;
                  }
  
                  const link = chart.append("g")
                      .attr("stroke-opacity", 0.6)
                      .selectAll("line")
                      .data(links)
                      .join("line").attr("stroke", d => { return "#999"}).attr("stroke-width", 5)
                      .attr('marker-end','url(#arrow)')
                  link.append('title')
                      .text(d=>{ console.log("links ",d)
                          return "APP Name - "+d.app+",\nSource - "+d.source.host+",\nDest - "+d.target.host})
                  
                  /*const node=chart.append("g")
                      .attr("stroke", "#fff")
                      .attr("stroke-width", 1.5)
                      .selectAll("circle")
                      .data(nodes_2)
                      .join("circle")
                      .attr("r", 6)
                      .attr("fill", "blue")
                      .call(d3.drag()
                          .on('start',drag_start)
                          .on('drag', drag_drag)
                      //  .on('end', drag_end)
                  )    */
                  const node = chart.selectAll("circle").data(nodes_2).enter()
                      .append('g').call(d3.drag()
                      .on('start',drag_start)
                      .on('drag', drag_drag)
                  //  .on('end', drag_end)
                  )
                  node.append("circle")
                  .attr("r", radius)
                  .attr("fill", d=> {return (d.index===0?"blue":"#806c5d" )})
                  node.append("title")
                  .text(d => {return d.host});
  
                  node.append("text").attr("dy",-3).text(d=> {return d.host}).attr("class","text-g-dark")
                  const restrict=(z,k)=>{
                      if (z>=(k-boundary-radius)){
                          return k-boundary-radius
                      } else if ( z <= boundary+radius ){
                          return boundary+radius
                      } else {
                          return z
                      }
                  }
                  const tickActions = () => {
                      //update circle positions each tick of the simulation 
                      node
                      .attr("transform", function (d) {return "translate(" + Math.max(radius+boundary, Math.min(width - radius - boundary , d.x)) + ", " + Math.max(radius+boundary, Math.min(height - radius - boundary, d.y)) + ")";});
                      //update link positions 
                      //simply tells one end of the line to follow one node around
                      //and the other end of the line to follow the other node around
                      link
                          .attr("x1", d => { return restrict(d.source.x,width) })
                          .attr("y1", d => { return restrict(d.source.y,height) })
                          .attr("x2", d => { return restrict(d.target.x,width) })
                          .attr("y2", d => { return restrict(d.target.y,height) });
                  }
                  simulation.nodes(nodes_2).on('tick',tickActions).tick(20);
                  simulation.force('link').links(links);
                  this.props.stopLoading()
              }).catch(err=>console.log(err))
              
    }
    render(){
      {this.runAxiosToGetAffinity(this.props.queryToRun)}
      return(
        <div key={this.props.source_ip} className={'chartContainer'+this.props.width}>
                <svg className={'chart'+this.props.width}>
                <defs>
                    <marker id="arrow" viewBox="0 -5 10 10" refX="20" refY="0"
                        markerWidth="3.2" markerHeight="4.2"
                        orient="auto-start-reverse">
                    <path d="M 0 -5 L 10 0 L 0 5 z" fill="white"/>
                    </marker>
                </defs>
                </svg>
            </div>
      )
    }
  }

export default NetworkGraphForAffinity