/*Creation date : 11-June-2020
*  Application : ViDA
*  Description : This script is part of L1 Scan
*                It will fetch all the Ports for Scanning and Plot all the results onto ViDA UI
*  Author : Nikhil Saxena
*  Update History
*  -------------------
*  11-June-2020 : Initial Creation
*/

import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import * as d3 from 'd3';

const postUrl = process.env.REACT_APP_L1POST_URL;
console.log("Post URL : ",postUrl);

class L1ScanParameters extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           portDetails : [
               {"service":"DB2", port:50050},
               {"service":"SSH", port:22},
               {"service":"HTTP", port:80},
               {"service":"HTTPS", port:443},
               {"service":"NetBios", port:139},
               {"service":"Windows RDP", port:3389},
               {"service":"PostgreSQL", port:5432},
               {"service":"MYSQL", port:1433},
               {"service":"ORACLE DB", port:1521}
           ],
           newService: "",
           newPort: 0,
           instanceId: "instance-"+Math.ceil(Math.random()*10000),
           subnet: "",
           showL1Plottings: false,
           show: false,
           setShow: false,
           scanStatus: "In Progress",
           ipScanned: 0,
           plottingData: {},
           plotData : {},
           services: []
        };
    }
  
 
    deletePort = (index) =>
    {
        console.log("Deleting Port...");
        const ports = [...this.state.portDetails];
        ports.splice(index, 1);
        this.setState({portDetails: ports});

    }

    showPlottings = () =>{
        const l1GetUrl = "http://9.51.192.123:9471/api/getl1res";
        axios.get(l1GetUrl).then((res)=>{
            console.log("L1 Response :",JSON.stringify(res))
        })
    }

    handleSubnet = (e) =>{
        this.setState({subnet: e.target.value})
    }

    handleServiceName = (e) =>{
        this.setState({newService: e.target.value});
    }

    handlePortNumber = (e) =>{
        this.setState({newPort: e.target.value});
    }

    handleClose = () => {
        this.setState({setShow:false})
    }

    handleShow = () => {
        this.setState({setShow:true})
    }

    plotScannedData = () => {
        console.log("Plotting Function Called....");
                           
        const width = 600,
              height = 240,
              margin = 0.5;

        const radius = Math.min(width, height) /2 - margin;
                  
        d3.select("svg").remove();
        var svg = d3.select("#L1Plotting")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate("+((width/2)-70)+","+((height/2))+")");

        var data = this.state.plottingData;
                           
        var color = d3.scaleOrdinal()
                      .domain(data)
                      .range(d3.schemeCategory10);

        var pie = d3.pie()
                    .value(function(d) {return d.value;})
                           
        var data_ready = pie(d3.entries(data))
                   
        var arcGenerator = d3.arc()
                             .innerRadius(90)
                             .outerRadius(radius);

            svg.selectAll('piechart')
               .data(data_ready)
               .enter()
               .append('path')
               .attr('d', arcGenerator)
               .attr('fill', function(d){return(color(d.data.key))})
               .attr('stroke', 'black')
               .style('stroke-width', '0.5px')
               .style('opacity', 0.7);

        var legends = svg.append("g")
               .attr("transform", "translate("+((width/2)-90)+",-125)")
               .selectAll(".legends")
               .data(data_ready);

        var legend = legends.enter()
                            .append("g")
                            .classed("legends", true)
                            .attr("transform", function(d,i){
                         return "translate(0,"+(i+1)*20+")";
                      });
            legend.append("rect")
                  .attr("width", 15)
                  .attr("height", 15)
                  .attr('fill', function(d){return (color(d.data.key));})
            legend.append("text")
                  .text(function(d){
                     return d.data.key + " | Count : "+d.data.value;})
                  .attr("fill", function(d){return (color(d.data.key))})
                  .attr("x",25)
                  .attr("y",13)
                  .style("font-size", 10);      
                             
         svg.exit().remove();

    }

    startScan = () =>{
        if(this.state.subnet==="")
        {
           return (<Modal onHide={this.handleClose}>
              <Modal.Header closeButton>
               <Modal.Title>Blank Fields not allowed!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Subnet Field Cannot be left blank</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>);
        }
        else
        {
            var jsonData = {}, portData = {};
            var plotData = {}, globalDict = {};
            var scanResults = [], services = [];
            jsonData["InstanceId"]=this.state.instanceId;
            jsonData["Subnet"]=this.state.subnet;
            this.state.portDetails.map((ports)=>{
              var key;
              key = ports.service;
              plotData[key]=0;
              services.push(ports.service);
              this.setState({services: services});
              portData[key]=ports.port;
            });
            jsonData["PORTDETAILS"]=portData;
            console.log("Port Data ", portData);
            const scanPortUrl = postUrl+"/api/submitl1";
        
            //Sending the data
            axios({
               method: 'post',
               url: scanPortUrl,
               data: jsonData,
               headers: {'Content-Type':'application/json'}
            })
            .then((response)=>
            {
               console.log("Show L1 Plottings : ", this.state.showL1Plottings);
               console.log("Success : ", response);
               this.setState({showL1Plottings:true});
               const l1GetUrl = postUrl+"/api/getl1res";
               {this.plotScannedData()}
               const interval = setInterval(() => 
               {
                 axios({
                        method: 'post',
                        url: l1GetUrl,
                        data: jsonData,
                        headers: {'Content-Type':'application/json'}
                        })
                       .then((res)=>
                         {
                           //Print the response fetched
                           console.log("L1 Response : ", JSON.stringify(res))
                           
                           //This Code is for Updating the total number of IP's Scanned
                           //Pending with Abhishek
                           if(res.data.TotalScannedIP==="")
                           {
                             this.setState({ipScanned:0})
                           }
                           else
                           {  
                             this.setState({ipScanned: res.data.TotalScannedIP})
                           } 
                           
                           //Fecth the latest result
                           var responseData = res.data.Result;
                           var responseLength = responseData.length;
                           if(responseLength>=0)
                           {
                               for(var itr=0; itr<responseLength; itr++)
                               {
                                   var id = responseData[itr].IP;
                                   var onlyKeys = [];
                                   if(!globalDict.hasOwnProperty(id))
                                   {
                                       globalDict[id]=0;
                                       scanResults.push(responseData[itr]);
                                       onlyKeys = Object.keys(responseData[itr])
                                       onlyKeys.splice(0,1); //Remove Ip from Keys
                                       onlyKeys.pop(); //Remove MAC
                                       console.log("Keys : ", onlyKeys);
                                       var keyLength = onlyKeys.length;
                                       for(var kitr=0; kitr<keyLength; kitr++)
                                       {
                                           console.log(onlyKeys[kitr] + " is Present in PlotData? "+ plotData.hasOwnProperty(onlyKeys[kitr].toString()))
                                           var matchKey = onlyKeys[kitr].toString();
                                           if(plotData.hasOwnProperty(matchKey))
                                           {
                                               console.log("Value : ", plotData[matchKey]);
                                               var currentValue = plotData[matchKey];
                                               console.log("Current Value : ", currentValue);
                                               currentValue+=1;
                                               console.log("New Value : ", currentValue);
                                               plotData[matchKey] = currentValue;
                                           }
                                       }
                                    }
                                }
                           }

                           console.log("Final Results : ", JSON.stringify(scanResults));
                           //this.setState({plottingData:scanResults});
                           console.log("Plot Data : ", JSON.stringify(plotData));
                           this.setState({plottingData: plotData});   
                           {this.plotScannedData()}                      

                           //If status is Completed stop fetching records from response, Exit
                           if(res.data.Status==="Completed")
                           {
                             //Update the Status as Completed  
                             this.setState({scanStatus: "Completed"})
                             clearInterval(interval);
                           }  
                         

                         })
                        }, 5000);
                       })                                    
             .catch(function(error){
              console.log("Error : ", error); 
            }) 
        }    
    }

    addNewPort = () =>{
        console.log("Adding New Port...");
        if(this.state.newService!=="" && this.state.newPort!==0)
        {
            //Check if Port Already used
            const portIndex = this.state.portDetails
            const ports = [...this.state.portDetails];
            const newPort = {
                "service": this.state.newService,
                port: this.state.newPort
            }
            console.log("New Port", newPort);
            ports.push(newPort);
            this.setState({portDetails: ports});
        }
    }

    render()
    {
        const pieTableWidth = {
            width: "400px"
        }

        return (
        <div class="clr-row">
             <div class="clr-col-12">
                {(this.state.showL1Plottings) &&
               
                <div class="clr-row">
                 <div class="clr-col-6">
                 <h5  class="text-center thbg pd-025r mt-125r">L1 Scanning Progress Report</h5>
                   <table class="table table-vertical">
                        <tbody>
                                <tr>
                                    <th colSpan="2"></th>
                                </tr>
                                <tr>
                                    <th><b>Instance Under Scan</b></th>
                                    <td>{this.state.instanceId}</td>
                                </tr>
                                <tr>
                                    <th><b>Services Under Scan</b></th>
                                    <td>{this.state.services.join(', ')}</td>
                                </tr>
                                <tr>
                                    <th><b>Scan Status</b></th>
                                    <td>{this.state.scanStatus}</td>
                                </tr>
                                <tr>
                                    <th><b>Total IP's Scanned</b></th>
                                    <td>{this.state.ipScanned}</td>
                                </tr>
                                <tr>
                                    <th><b>Subnet</b></th>
                                    <td>{this.state.subnet}</td>
                                </tr>
                                <tr>
                                    <th colSpan="2"></th>
                                </tr>
                        </tbody>
                    </table>
                   
                 </div>
                   <div class="clr-col-6">
                       {/* <Table style={pieTableWidth} bordered={true} hover={true} response="md" striped={true} height="360px"> */}
                       <table class="table" style={pieTableWidth}>
                       <thead align="left">
                           <tr>
                                <td>
                                    <h5>&nbsp;L1 Plotting</h5>
                                </td>
                           </tr>
                       </thead>
                       <tbody>
                         <tr >
                             <td>
                               <div id="L1Plotting"></div>
                             </td>                           
                         </tr>
                         </tbody>
                       </table>  
                   </div>  
            </div>
                
                }
                {/* <div class="clr-break-row"></div> */}
                {/* <Row align="center">    */}
                <div class="clr-row mt-1r">
                    {/* <div class="clr-col-12 testBorder"> */}
                     <div class="clr-col-2  "></div>
                     <div class="clr-col-8 tbBorder">
                     <div class="text-center mt-05r"><h5  class="text-center thbg pd-025r">L1 Scanning Report</h5></div>
                     {/* <Table align="center" bordered={true} hover={true} response="md" striped={true}> */}
                     <form class="clr-form tbBorder">    
                       <table class="table table-vertical table-noborder">
                       <tr>
                           <th><b>Instance Id</b></th>
                           <td>
                                <input id="instance-id" type="text" value={this.state.instanceId}  class="clr-input" readOnly />                          
                           </td>
                       </tr>
                       <tr>
                           <th><b>Subnet</b></th>
                           <td>
                               <input  class="clr-input" id="subnet-value" type="text" onChange={this.handleSubnet} />
                                <p class="p-sm text-center mt-0">Format : IP-Address/CIDR Range</p>
                           </td>
                       </tr>
                       <tr>
                           <th><b>Add New Port</b></th>
                           <td>
                                <input  class="clr-input"  id="service-value" type="text"  onChange={this.handleServiceName} placeholder="Service Name" />
                            </td>
                       </tr>
                       <tr>
                           <th></th>
                           <td>
                                <div class="clr-row">
                                    <div class="clr-col">
                                        <input  class="clr-input"  id="port-value"    type="text"  onChange={this.handlePortNumber} placeholder="Port Number " />
                                    </div>
                                    <div class="clr-col">   
                                        <img src="/plus-line.svg" width="16px" height="16px" class="text-white" alt="Close" onClick={this.addNewPort} />
                                    </div>
                                </div>
                            </td>
                       </tr>
                       <tr>
                           <th><b>Port Details</b></th>
                           <td>
                               <div>
                                       {this.state.portDetails.map((ports, index)=>{
                                         return <div class="clr-row"><div class="clr-col mt-05r">{ports.service} : {ports.port}</div><div class="clr-col mb-3"><img src="/window-close-line.svg" width="16px" height="16px" class="text-white" alt="Close" onClick={()=>this.deletePort(index)}/></div></div>
                                       })}
                               </div>
                           </td>
                       </tr>
                       <tr >
                         <th colSpan="2" >
                             <div  class="text-center thbg pt-05r">
                                 <Button onClick={this.startScan}>Start Scanning</Button>
                             </div>
                         </th>
                         {/* <td>
                            <div id="l1Plotting"></div>
                         </td>  */}
                       </tr>
                     </table>
                  </form>  
                </div> 
                  <div class="clr-col-2"></div>
            </div>
               {/* </Row> */}
            
            </div>
            </div>
            // <div class="clr-break-row">
        )
    }
}

export default L1ScanParameters;