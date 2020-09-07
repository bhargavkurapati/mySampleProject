import React from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './DrawAnalytics.css';

const API_URL=process.env.REACT_APP_API_URL
// const API_URL = "http://9.51.192.123:8000"
class DrawAnalyticsGraph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: '',
            nodes: [],
            links: [],
        }
    }
    drawGraph=(e,y,z)=>{
      if (e.length !== 0 || y.length !== 0 || z) {
        const ssl_query=(z===true?"ssl_sd=Y":"")
        var queryToRun='?'
        if (e!=='') {
            e.map(
                i => queryToRun=queryToRun+'dest_port='+i+'&'
            )
        }
        if (y!=='') {
            y.map(
                (i)=>
                queryToRun=queryToRun+'app_name='+i+'&'
            )
        }
        axios.get(API_URL+'/api/affinity'+queryToRun+ssl_query).then(response=>{
            this.setState({
                data:response.data,
            },()=>{
                var nodes=[]
                var hosts=[]
                var links=[]
                var nodes_2=[]
                this.state.data.map(
                    (item)=>{
                       // let tempSource=item.source_ip+":"+item.source_port
                       // let tempDest=item.dest_ip+":"+item.dest_port
                        if ( ! nodes.includes(item.source_ip)){
                            nodes.push(item.source_ip)
                            hosts.push({host:(item.source_host!==''?item.source_host:item.source_ip),app:item.app_name})
                        }
                        if ( ! nodes.includes(item.dest_ip)) {
                            nodes.push(item.dest_ip)
                            hosts.push({host:(item.dest_host!==''?item.dest_host:item.dest_ip),app:item.app_name})
                        }
                        links.push({source:item.source_ip,target:item.dest_ip,source_port:item.source_port,dest_port:item.dest_port,app:item.app_name,ssl:item.ssl_sd})
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
                console.log("Node********", nodes)
                console.log("Links",links)
                console.log("Nodes_2",nodes_2)
                this.setState({
                    nodes: nodes_2,
                    links: links,
                })
                const width=960;
                const height=640;
                const radius=6;
                const boundary=20;
                var simulation = d3.forceSimulation(nodes_2)
                .force("charge", d3.forceManyBody().strength(-50).distanceMin(100).distanceMax(200))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("link",d3.forceLink(links).id(d =>{return d.ip;}).distance(100).strength(1))
                .force('collision', d3.forceCollide().radius(30)).tick(300);
                d3.select('.chart').selectAll("g").remove();
                const chart = d3.select('.chart')
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
                    .join("line").attr("stroke", d => {if (d.ssl.includes("Y")) {return "#6bfc03"} else { return "#999"}}).attr("stroke-width", 10)
                    .attr('marker-end','url(#arrow)')
                link.append('title')
                    .text(d=>{ console.log("links ",d)
                        return "APP Name - "+d.app+",\nSource - "+d.source.host+":"+d.source_port+",\nDest - "+d.target.host+":"+d.dest_port+",\nSSL - "+d.ssl})
                
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
                .attr("fill", "blue")
                node.append("title")
                .text(d => {return d.host});

                node.append("text").attr("dy",-3).text(d=> {return d.host}).attr("class","text-drawAnalytics")
                const restrict=(z,k)=>{
                    if (z>=(k-boundary)){
                        return k-boundary-radius
                    } else if ( z <= boundary ){
                        return boundary
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
            })
        })
      } 
    }
    shouldComponentUpdate(nextProps) {
        const differentIP = this.props.dest_port.join() !== nextProps.dest_port.join();
        const differentApp = this.props.app_name.join() !== nextProps.app_name.join();
        const differentSSL = this.props.ssl !== nextProps.ssl;
        console.log(this.props,":",nextProps)
        console.log(differentIP,differentApp,differentSSL)
        return differentIP || differentApp || differentSSL;
    }
    render(){
        console.log("Render called in DrawAnalytics",this.state)
        this.drawGraph(this.props.dest_port,this.props.app_name,this.props.ssl)
        return(
            <div className="container-1 border-gray">
                <div className="text-center"><h4>Affinity Graph</h4></div>
                
                <div key={this.props.source_ip} className='chartContainer'>
                    <svg className='chart'>
                    <defs>
                        <marker id="arrow" viewBox="0 -5 10 10" refX="13" refY="0"
                            markerWidth="3.2" markerHeight="2.2"
                            orient="auto-start-reverse">
                        <path d="M 0 -5 L 10 0 L 0 5 z" fill="white"/>
                        </marker>
                    </defs>
                    </svg>
                </div>  
            </div>
        )
    }
}

export default DrawAnalyticsGraph;