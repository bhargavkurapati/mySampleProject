/*Creation date : 06-April-20
*  Application : ViDA
*  Description : This script will map/plot all Ports/IP/Application
*                graphs for ViDA Analytics 
*  Author : Nikhil Saxena
*  Update History
*  -------------------
*  06-April-20 : Initial Creation
*/
import React from 'react';
import * as d3 from 'd3';
import axios from 'axios';
//Import Analytics data for Vida Analytics, to be replaced by Axios Call
import analyticsData from './data/analyticsData.json';
import CommunicationType from './communicationRule';

class VidaAnalyticsGraph extends React.Component
{
   constructor(props)
   {
       super(props);
       this.state = {
         isSSL: false
       };
   }

  shouldComponentUpdate(nextProps, nextState) {
        const differentApp = this.props.queryToRun !== nextProps.queryToRun;
        const differentPlotting = this.props.currentPlot !== nextProps.currentPlot;
        console.log(this.props,":",nextProps)
        console.log(differentApp);
        console.log(differentPlotting);
        return (differentApp || differentPlotting) ;  }

  communicationType = (sourceCount, destCount) =>
  {
    if(parseInt(sourceCount)<parseInt(destCount))
      return "Outbound"
    else 
      return "Inbound"
  }

   
  plotViDAAnalyticsGraph=(e)=>{
      //d3.select('.chart'+this.props.width+this.props.currentPlot).selectAll("g").remove();
      //Declare all the variables
      var item = {};
      var links = [], links_buffer = [];
      var nodes = [], nodes_buffer = [];
      var nodes_2 = [], nodes_2_buffer = [];
      var nodesCheck = {};
      var radius, linkDistance, minDistance, forceRadius;
      var appName, srcVal, dstVal;
   
      //Fetch the poltted Data id, which we'll plot
      var queriedId = this.props.queryToRun;

      console.log("Props value : ", JSON.stringify(this.props));

      try{
      //fetch the details and update the item variable

       analyticsData.forEach(dataItem => {
         if(dataItem.id===queriedId)
          {
            item =  dataItem; 
          }
       });

      
      //Check what Plotting is required

       if(this.props.currentPlot === "IP Mapping")
       {
          d3.select('.chart'+this.props.width).selectAll("g").remove();
          if(this.props.isFullScreen==="true")
          {
           if(this.state.isSSL===true)
           {
            this.setState({isSSL:false})
           }
           radius = 15;
           linkDistance = 80;
           minDistance = 40;
           forceRadius = 60;

           //Fetch both source/destination IP and push it to nodes
           item.Source_IP.split('|').forEach((row)=>
           {
              var jsonData = {}
              jsonData["ip"]=row.toString()
              jsonData["group"]="source"
              nodes.push(jsonData)
           })

           item.Dest_IP.split('|').forEach((row)=>
           {
             var jsonData = {}
             jsonData["ip"]=row.toString()
             jsonData["group"]="destination"
             nodes.push(jsonData)
           })
                
           //Prepare the link in the format Source:Target
           appName = item.APP_NAME;

           //var sslCheck = this.sslValidator(item.SSL_SD)
           //check for SSL
           item.SSL_SD.split("|").forEach((sslRow)=>{
             console.log("SSL Values : ", sslRow);
             if((sslRow.slice(0,1).toString())==="Y" || (sslRow.slice(1,2).toString())==="Y")
             {
                this.setState({isSSL:true});return;
             }
           })

           var commcheck = this.communicationType(item.SOURCE_PORT_COUNT,item.DEST_PORT_COUNT)
           if(commcheck==="Outbound")
           {
            srcVal = item.Source_IP.toString();
            dstVal = item.Dest_IP.toString();
           }
           else
           {
             srcVal = item.Dest_IP.toString();
             dstVal = item.Source_IP.toString();
           }
           links.push({source:srcVal, target:dstVal, app:appName, id:srcVal+'|'+dstVal})

           console.log("IP Mapping Nodes Data ", JSON.stringify(nodes));

           nodes.map((node_data)=>{
              let tempMap = {}
              tempMap.ip = node_data.ip;
              tempMap.group = node_data.group
              nodes_2.push(tempMap);
           })
           console.log("IP Mapping Nodes2 Data ", JSON.stringify(nodes_2));

           const width=this.props.width;
           const height=this.props.height;
           const boundary=5;
           var simulation = d3.forceSimulation(nodes_2)
              .force("charge", d3.forceManyBody().strength(-50).distanceMin(minDistance).distanceMax(200))
              .force("center", d3.forceCenter(width / 2, height / 2))
              .force("link",d3.forceLink(links).id(d =>{console.log("IP Returned : ",d.ip);return d.ip;}).distance(linkDistance).strength(1))
              .force('collision', d3.forceCollide().radius(forceRadius)).tick(300);
       
           const chart = d3.select('.chart'+this.props.width)
                           .attr("preserveAspectRatio", "xMinYMin meet")
                           .attr('width',width).attr('height',height)
                           .call(d3.zoom().on("zoom", function(){
                            chart.attr("transform", d3.event.transform)
                          }))
 
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
                             .attr("stroke-opacity", 0.1)
                             .selectAll("line")
                             .data(links)
                             .join("line").attr("stroke", d => { return "black"}).attr("stroke-width", 5)
                             .attr('marker-end','url(#arrow)');
                        
                           
           const node = chart.selectAll("circle").data(nodes_2).enter()
                             .append('g').call(d3.drag()
                             .on('start',drag_start)
                             .on('drag', drag_drag)) 
         
                         node.append("circle")
                             .attr("r", radius)
                             .attr("fill",function(d){return (d.group==="source")?'#dc3545':'gray'}); 
                        
                         node.append('text')
                             .text(d=>{return d.ip})
                             .attr("fill", "#000")
                             .attr("dx",15)
                             .attr("dy",-1)
                             .style("font-size",12);       
          
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
          }
          else  //if IP Mapping is not fullScreen
          {
            d3.select('.chart'+this.props.width).selectAll("g").remove();
            if(this.state.isSSL===true)
           {
            this.setState({isSSL:false})
           }
           radius = 12;
           linkDistance = 60;
           minDistance = 40;
           forceRadius = 60;

           //Fetch both source/destination IP and push it to nodes
           item.Source_IP.split('|').forEach((row)=>
           {
              var jsonData = {}
              jsonData["ip"]=row.toString()
              jsonData["group"]="source"
              nodes.push(jsonData)
           })

           item.Dest_IP.split('|').forEach((row)=>
           {
             var jsonData = {}
             jsonData["ip"]=row.toString()
             jsonData["group"]="destination"
             nodes.push(jsonData)
           })
                
           //Prepare the link in the format Source:Target
           appName = item.APP_NAME;

           //var sslCheck = this.sslValidator(item.SSL_SD)
           //check for SSL
           item.SSL_SD.split("|").forEach((sslRow)=>{
             console.log("SSL Values : ", sslRow);
             if((sslRow.slice(0,1).toString())==="Y" || (sslRow.slice(1,2).toString())==="Y")
             {
                this.setState({isSSL:true});return;
             }
           })

           var commcheck = this.communicationType(item.SOURCE_PORT_COUNT,item.DEST_PORT_COUNT)
           if(commcheck==="Outbound")
           {
            srcVal = item.Source_IP.toString();
            dstVal = item.Dest_IP.toString();
           }
           else
           {
             srcVal = item.Dest_IP.toString();
             dstVal = item.Source_IP.toString();
           }
           links.push({source:srcVal, target:dstVal, app:appName, id:srcVal+'|'+dstVal})

           console.log("IP Mapping Nodes Data ", JSON.stringify(nodes));

           nodes.map((node_data)=>{
              let tempMap = {}
              tempMap.ip = node_data.ip;
              tempMap.group = node_data.group
              nodes_2.push(tempMap);
           })
           console.log("IP Mapping Nodes2 Data ", JSON.stringify(nodes_2));

           const width=this.props.width;
           const height=this.props.height;
           const boundary=5;
           var simulation = d3.forceSimulation(nodes_2)
              .force("charge", d3.forceManyBody().strength(-50).distanceMin(minDistance).distanceMax(200))
              .force("center", d3.forceCenter(width / 2, height / 2))
              .force("link",d3.forceLink(links).id(d =>{console.log("IP Returned : ",d.ip);return d.ip;}).distance(linkDistance).strength(1))
              .force('collision', d3.forceCollide().radius(forceRadius)).tick(300);
       
           const chart = d3.select('.chart'+this.props.width)
                           .attr("preserveAspectRatio", "xMinYMin meet")
                           .attr('width',width).attr('height',height);
 
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
                             .attr("stroke-opacity", 0.1)
                             .selectAll("line")
                             .data(links)
                             .join("line").attr("stroke", d => { return "black"}).attr("stroke-width", 5)
                             .attr('marker-end','url(#arrow)');
                        
                           
           const node = chart.selectAll("circle").data(nodes_2).enter()
                             .append('g').call(d3.drag()
                             .on('start',drag_start)
                             .on('drag', drag_drag)) 
         
                         node.append("circle")
                             .attr("r", radius)
                             .attr("fill",function(d){return (d.group==="source")?'#dc3545':'gray'}); 
                        
                         node.append('text')
                             .text(d=>{return d.ip})
                             .attr("fill", "#000")
                             .attr("dx",15)
                             .attr("dy",-1)
                             .style("font-size",12);       
          
 
             d3.select("g").append("circle").attr("cx", 450).attr("cy",30).attr("r",6).style("fill", "#dc3545");
             d3.select("g").append("circle").attr("cx", 450).attr("cy",50).attr("r",6).style("fill", "gray");
             d3.select("g").append("text").attr("x", 460).attr("y", 33).text("Source IP").style("font-size", "10px");
             d3.select("g").append("text").attr("x", 460).attr("y", 53).text("Destination IP").style("font-size", "10px")
             d3.select("g").append("path").attr("d", d3.symbol().type(d3.symbolTriangle)).attr("transform","translate(450,70)").attr("width", 6).style("fill", "black");
             d3.select("g").append("path").attr("d", d3.symbol().type(d3.symbolTriangle)).attr("transform","translate(450,90)").attr("width", 6).style("fill", "green");
             d3.select("g").append("text").attr("x", 460).attr("y", 73).text("SSL Absent").style("font-size", "10px");
             d3.select("g").append("text").attr("x", 460).attr("y", 93).text("SSL Present").style("font-size", "10px");
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
          } 

        console.log("[INFO] IP Mapping data calculated ")
      }
      else
      {
        // This Block will consider Port Mappings 
        d3.select('.chart'+this.props.width).selectAll("g").remove();
        /**old values
          radius = 10
          linkDistance = 40 **/
         
         //check if communication type is Inbound/Outbound
        if(this.props.isFullScreen==="true")
        {
            var commcheck = this.communicationType(item.SOURCE_PORT_COUNT,item.DEST_PORT_COUNT)
            appName = item.APP_NAME;

            //Add all Source Ports
            if(commcheck === "Inbound")
            {
              item.Source_PORT.split('|').forEach((row) =>
              {
               var jsonData={};
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="destination";
               nodes_buffer.push(jsonData);
              });  
              item.Dest_PORT.split('|').forEach((row)=>
              {
               var jsonData={}
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="source"
               nodes_buffer.push(jsonData);
              });
            }
            else
            {
              item.Source_PORT.split('|').forEach((row) =>
              {
               var jsonData={};
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="source";
               nodes_buffer.push(jsonData);
              });  
              //Add all Destination Ports
              item.Dest_PORT.split('|').forEach((row)=>
              {
               var jsonData={}
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="destination"
               nodes_buffer.push(jsonData);
              });
            }  
          
            nodes_buffer.map((node_data)=>{
              let tempMap = {}
              tempMap.ip = node_data.node;
              tempMap.group = node_data.group;
              nodes_2_buffer.push(tempMap);
            }); 

 
            //Fetch all Mapping ports
            if(commcheck === "Outbound")
            {
              item.Port_Data.split('|').forEach((row, index)=>
              {
               var jsonRow=JSON.parse(row);
               if(nodesCheck.hasOwnProperty(jsonRow[0].toString()) && nodesCheck.hasOwnProperty(jsonRow[1].toString()))
               {
                links_buffer.push({source:jsonRow[0].toString(),target:jsonRow[1].toString(),app:appName, id:jsonRow[0]+"|"+jsonRow[1], index: index})
               }
              });
            }
            else
            {
              item.Port_Data.split('|').forEach((row, index)=>
              {
               var jsonRow=JSON.parse(row);
               if(nodesCheck.hasOwnProperty(jsonRow[0].toString()) && nodesCheck.hasOwnProperty(jsonRow[1].toString()))
               {
                links_buffer.push({source:jsonRow[1].toString(),target:jsonRow[0].toString(),app:appName, id:jsonRow[1]+"|"+jsonRow[0], index: index})
               }
              });
            }  

            //Set all d3 attributes - this is for small screen
            radius = 5;
            linkDistance = 10;
            minDistance = 5;
            forceRadius = 8;
            nodes = nodes_buffer;
            links = links_buffer;
            nodes_2 = nodes_2_buffer;
         
            //set d3 chart perimeters
            const width=this.props.width;
            const height=this.props.height;
            const boundary=5;
            var simulation = d3.forceSimulation(nodes_2)
                               .force("charge", d3.forceManyBody().strength(-10).distanceMin(minDistance).distanceMax(200))
                               .force("center", d3.forceCenter(width / 2, height / 2))
                               .force("link",d3.forceLink(links).id(d =>{return d.ip;}).distance(linkDistance).strength(1))
                               .force('collision', d3.forceCollide().radius(forceRadius)).tick(30);
        
            const chart = d3.select('.chart'+this.props.width)
                            .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr('width',width).attr('height',height)
                            .call(d3.zoom().on("zoom", function(){
                              chart.attr("transform", d3.event.transform)
                            }))
         
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
                              .attr("stroke-opacity", 0.3)
                              .selectAll("line")
                              .data(links)
                              .join("line").attr("stroke", d => { return "#999"}).attr("stroke-width", 2)
                              .attr('marker-end','url(#arrow)')

            const node = chart.selectAll("circle").data(nodes_2).enter()
                              .append('g').call(d3.drag()
                              .on('start',drag_start)
                              .on('drag', drag_drag)
            )
 
            node.append("circle")
                .attr("r", radius)
                .attr("fill",function(d){return (d.group==="source")?'#dc3545':'#6699ff'});    


            node.append('text')
                .text(d=>{console.log("Node Labels : ",d.ip); return d.ip})
                .attr("fill", "#000")
                .attr("dx",-3)
                .attr("dy",2)
                .style("font-size",5);       
      
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
          }
          else //if isFullScreen False
          {
            d3.select('.chart'+this.props.width).selectAll("g").remove();
            var commcheck = this.communicationType(item.SOURCE_PORT_COUNT,item.DEST_PORT_COUNT)
            appName = item.APP_NAME;


            //Fetch only the first 100 nodes
            if(commcheck === "Inbound")
            {
              item.Source_PORT.split('|').forEach((row) =>
              {
               var jsonData={};
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="destination";
               nodes_buffer.push(jsonData);
              });  
              item.Dest_PORT.split('|').forEach((row)=>
              {
               var jsonData={}
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="source"
               nodes_buffer.push(jsonData);
              });
            }
            else
            {
              item.Source_PORT.split('|').forEach((row) =>
              {
               var jsonData={};
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="source";
               nodes_buffer.push(jsonData);
              });  
              //Add all Destination Ports
              item.Dest_PORT.split('|').forEach((row)=>
              {
               var jsonData={}
               jsonData["node"]=row.toString();
               nodesCheck[row]=row.toString();
               jsonData["group"]="destination"
               nodes_buffer.push(jsonData);
              });
            }  
          
            nodes_buffer.map((node_data)=>{
              let tempMap = {}
              tempMap.ip = node_data.node;
              tempMap.group = node_data.group;
              nodes_2_buffer.push(tempMap);
            }); 

 
            //Fetch all Mapping ports
            if(commcheck === "Outbound")
            {
              item.Port_Data.split('|').forEach((row, index)=>
              {
               var jsonRow=JSON.parse(row);
               if(nodesCheck.hasOwnProperty(jsonRow[0].toString()) && nodesCheck.hasOwnProperty(jsonRow[1].toString()))
               {
                links_buffer.push({source:jsonRow[0].toString(),target:jsonRow[1].toString(),app:appName, id:jsonRow[0]+"|"+jsonRow[1], index: index})
               }
              });
            }
            else
            {
              item.Port_Data.split('|').forEach((row, index)=>
              {
               var jsonRow=JSON.parse(row);
               if(nodesCheck.hasOwnProperty(jsonRow[0].toString()) && nodesCheck.hasOwnProperty(jsonRow[1].toString()))
               {
                links_buffer.push({source:jsonRow[1].toString(),target:jsonRow[0].toString(),app:appName, id:jsonRow[1]+"|"+jsonRow[0], index: index})
               }
              });
            } 

            //Set all d3 attributes - this is for Full Screen
            radius = 8;
            linkDistance = 5;
            minDistance = 10;
            forceRadius = 12;
            nodes = nodes_buffer;
            links = links_buffer;
            nodes_2 = nodes_2_buffer;
         

            //set d3 chart perimeters
            const width=this.props.width;
            const height=this.props.height;
            const boundary=5;
            var simulation = d3.forceSimulation(nodes_2)
                               .force("charge", d3.forceManyBody().strength(-10).distanceMin(minDistance).distanceMax(50))
                               .force("center", d3.forceCenter(width / 2, height / 2))
                               .force("link",d3.forceLink(links).id(d =>{return d.ip;}).distance(linkDistance).strength(1))
                               .force('collision', d3.forceCollide().radius(forceRadius)).tick(150);
        
            const chart = d3.select('.chart'+this.props.width)
                            .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr('width',width).attr('height',height);
         
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
                              .attr("stroke-opacity", 0.2)
                              .selectAll("line")
                              .data(links)
                              .join("line").attr("stroke", d => { return "#999"}).attr("stroke-width", 2)
                              .attr('marker-end','url(#arrow)')

            d3.select("g").append("text")
              .text("Click Full View Plotting to get clear view of all nodes.")
              .attr("fill","#000")
              .attr("x",100)
              .attr("y",15)
              .style("font-size", 12);

            //Legends go here
            d3.select("g").append("circle").attr("cx", 450).attr("cy",50).attr("r",6).style("fill", "#dc3545");
            d3.select("g").append("circle").attr("cx", 450).attr("cy",70).attr("r",6).style("fill", "#6699ff");
            d3.select("g").append("text").attr("x", 460).attr("y", 53).text("Source Ports").style("font-size", "10px");
            d3.select("g").append("text").attr("x", 460).attr("y", 73).text("Destination Ports").style("font-size", "10px")

            const node = chart.selectAll("circle").data(nodes_2).enter()
                              .append('g').call(d3.drag()
                              .on('start',drag_start)
                              .on('drag', drag_drag)
            )
 
            node.append("circle")
                .attr("r", radius)
                .attr("fill",function(d){return (d.group==="source")?'#dc3545':'#6699ff'});    
      
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
          }
    } //else Close
    

    }
    catch(err)
    {
        console.log("Error Encountered!\nMessage : ",err);
    }
  }

  render()
  {
    //Note : SetTimeOut added by Nikhil
    //Once CoucnhBase DB is up and running remove setTimeout
    //with {this.plotViDAAnalyticsGraph(this.props.queryToRun)}
    // Change made on 15th April 20
    {setTimeout(()=>{
        this.plotViDAAnalyticsGraph(this.props.queryToRun)},3000);
    }
    if(this.props.currentPlot === "IP Mapping")
    {
     return (
      <div key={this.props.queriedId} className={'chartConatiner'+this.props.width}> 
       <svg className={'chart'+this.props.width}>
               <defs>
                    <marker id="arrow" viewBox="0 -5 10 10" refX="15" refY="0"
                        markerWidth="4" markerHeight="4"
                        orient="auto-start-reverse">
                      <path d="M 0 -5 L 10 0 L 0 5 z" fill={(this.state.isSSL)?"green":"black"}/>
                    </marker>
                </defs>
       </svg> 
      </div>
      )
     }
     else if(this.props.currentPlot === "Port Mapping" && this.props.isFullScreen === "true")
     {
      return (
       <div key={this.props.queriedId} className={'chartConatiner'+this.props.width}> 
        <svg className={'chart'+this.props.width}>
                <defs>
                     <marker id="arrow" viewBox="0 -5 10 10" refX="15" refY="0"
                         markerWidth="3" markerHeight="3"
                         orient="auto-start-reverse">
                       <path d="M 0 -5 L 10 0 L 0 5 z" fill="black"/>
                     </marker>
                 </defs>
        </svg> 
       </div>
       )
      }
     else
     {
      return (
        <div key={this.props.queriedId} className={'chartConatiner'+this.props.width}> 
         <svg className={'chart'+this.props.width}>
         </svg>
        </div>
        )
     }
  }
}

export default VidaAnalyticsGraph;