/*Creation date : 27-April-20
*  Application : ViDA
*  Description : This script will generate analysis report for current
*                selected vida analytics data
*  Author : Nikhil Saxena
*  Update History
*  -------------------
*  27-April-20 : Initial Creation
*/
import React from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import analyticsData from './data/analyticsData.json';
import CommunicationType from './communicationRule';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class VidaAnalysisReport extends React.Component
{
   constructor(props)
   {
       super(props);
       this.state = {
         item: {},
         id: '',
         sourceIp: '',
         destIp: '',
         sourceHost: '',
         destHost: '',
         appName: '',
         sourcePortCount: '',
         destPortCount: '',
         user: '',
         portData: '',
         timeStamp: '',
         sourcePortsOneToOne : [],
         sourcePortsOneToMany: [],
         destinationPortsOneToOne : [],
         destinationPortsOneToMany: [],
         sourceMappingSelected: '',
         destinationMappingSelected: '',
         isDataPopulated: false
       };
   }


   shouldComponentUpdate(nextProps, nextState) 
   {
     const differentQuery = this.props.queryToRun !== nextProps.queryToRun
     const differentMapping = this.props.currentMapping !== nextProps.currentMapping
     const differentId = this.state.id!== nextState.id
     if((differentQuery || differentMapping || differentId) && !this.state.isDataPopulated)
      {
          this.setState({isDataPopulated:true})
          return true;
      }
      else
      {
          return false;
      }

   }
  

   generateReport=()=>{
        try
        {
            //fetch the query from props
            const queriedId = this.props.queryToRun;
            
            //fetch the data, replace json data with axios.get once endpoint is up and running
            const vidaData = analyticsData;
            //console.log("Data : ", data);
            //extract the query for which analysis report has to be generated

            vidaData.forEach(dataItem => {
                if(dataItem.id === queriedId)
                {
                    console.log("Source Port Count : ",dataItem.SOURCE_PORT_COUNT);
                    console.log("Destination Port Count : ",dataItem.DEST_PORT_COUNT);
                    this.setState({
                        item: dataItem,
                        id: dataItem.id,
                        sourceIp: dataItem.Source_IP,
                        destIp: dataItem.Dest_IP,
                        sourceHost: dataItem.Source_HOST,
                        destHost: dataItem.Dest_HOST,
                        appName: dataItem.APP_NAME,
                        sourcePortCount: dataItem.SOURCE_PORT_COUNT,
                        destPortCount: dataItem.DEST_PORT_COUNT,
                        user: dataItem.user,
                        portData: dataItem.Port_Data,
                        timeStamp: dataItem.Time_Stamp                        
                    })
                }
            });
            
        }
        catch(error)
        {
            var err ={
                "Status" : "400",
                "Type" : "Error",
                "Message": err 
            }
            console.log(err);
            //when in Production Replace above statement with
            //debugger.log(error);
        }
    }

    createUniquePortsPieChart = () =>{
      try{
           //This function will create the pie chart for Source/Destination Port Counts
           //Assign the table width and height
           var item = {};
           const vidaData = analyticsData;
           const queriedId = this.props.queryToRun;
           vidaData.forEach((dataItem)=>{
               if(dataItem.id === queriedId)
               {
                   item = dataItem;
               }
           })
           const srcPortList = item.Source_PORT;
           const destPortList = item.Dest_PORT;
           var srcPortCheck = {}, destPortCheck={};
           var uniqSrcPort = 0, uniqDestPort = 0;
           srcPortList.split('|').forEach((portItem)=>{
               if(!srcPortCheck.hasOwnProperty(portItem))
               {
                   uniqSrcPort+=1;
                   srcPortCheck[portItem]="newPort"
               }
           })
           destPortList.split('|').forEach((portItem)=>{
               if(!destPortCheck.hasOwnProperty(portItem))
               {
                   uniqDestPort+=1;
                   destPortCheck[portItem]="newPort"
               }
           })
          console.log("[INFO] Unique Source Ports : ",uniqSrcPort);
          console.log("[INFO] Unique Destination Ports : ", uniqDestPort);

          const width = 450,
                height = 250,
                margin = 1;

          const radius = Math.min(width, height) /2 - margin;
          var svg = d3.select("#pieChartForPorts")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", "translate("+((width/2)-70)+","+height/2+")");

          var data = {Source: uniqSrcPort, 
                      Destination: uniqDestPort}

          var color = d3.scaleOrdinal()
                        .domain(data)
                        .range(["#0066ff", "#6699ff"])

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

              svg.append("text")
                 .text("Unique Number of Ports")
                 .attr("fill","#000")
                 .attr("x",-75)
                 .attr("y",0)
                 .style("font-size", 14);



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


      }
      catch(err)
      {
          var error = {
              'status': 400,
              'type': 'error',
              'message': err
          }
          console.log(error);
          //when in Production Replace above statement with
          //debugger.log(error);
      }   
    }

    createSourcePortsPieChart = () => {
        //This function will create Pie Chart for Ports directly connected with Source Port
        //fetch the data, data is too long hence call the endpoint
        try
        {
            console.log("---------BEFORE-------------------")
            console.log("Source Ports one to one State :", JSON.stringify(this.state.sourcePortsOneToOne))   
           var item = {};
           const vidaData = analyticsData;
           const queriedId = this.props.queryToRun;
           vidaData.forEach((dataItem)=>{
               if(dataItem.id === queriedId)
               {
                   console.log("LOG : Queried Id Found. ID - "+queriedId);
                   item = dataItem;
               }
           })
          
        //data is within item variable
        //Now fetch Port_Data value and write your logic
        var  jsonPortsGlobalDict = {};
        var jsonPortsArray = [];
        const srcIdentifier = 0; //as every jsonRow below has Source Port at 0 index
        const destIdentifier = 1;
        item.Port_Data.split('|').forEach((portItem)=>{
            var jsonRow = JSON.parse(portItem);
            var currentValue = 0, newValue=0;
            var Key = jsonRow[srcIdentifier];
            var jsonPortsDataDict = {}
            if(jsonPortsGlobalDict.hasOwnProperty(Key))
            {
                currentValue = jsonPortsGlobalDict[Key].Value;
                newValue = currentValue + 1;
                jsonPortsGlobalDict[Key].Value = newValue;
                var portList = jsonRow[destIdentifier]
                jsonPortsGlobalDict[Key].List.push(portList);
            }
            else
            {
                jsonPortsDataDict['Port']=Key;
                jsonPortsDataDict['Value']=1;
                jsonPortsDataDict['List']=[jsonRow[destIdentifier]]
                jsonPortsArray.push(jsonPortsDataDict);
                jsonPortsGlobalDict[Key]=jsonPortsDataDict
            }
        })

        //console.log("jsonPortArray ", JSON.stringify(jsonPortsArray));
        var oneToOnePortsCount = 0, oneToManyPortsCount = 0;
        var srcPortOneToOne =[], srcPortsOneToMany=[];
        for (var i =0; i<jsonPortsArray.length; i++)
        {
            if(jsonPortsArray[i].Value===1)
            {
              oneToOnePortsCount+=1;
              var jsonRecord = {
                  "src" : jsonPortsArray[i].Port,
                  "dest" : jsonPortsArray[i].List[0] 
              }
              srcPortOneToOne.push(jsonPortsArray[i].Port);
            }
            else
            {
              oneToManyPortsCount+=1;
              //console.log("1 to Many Destination : ",jsonPortsArray[i].List)
              var jsonRecord = {
                "src" : jsonPortsArray[i].Port,
                "dest" : jsonPortsArray[i].List
               }
               srcPortsOneToMany.push(jsonPortsArray[i].Port);
            }
        }
        
        srcPortOneToOne.sort(function(a,b){return a-b})
        srcPortsOneToMany.sort(function(a,b){return a-b})

        this.setState({sourcePortsOneToOne:srcPortOneToOne,
                       sourcePortsOneToMany:srcPortsOneToMany
        })
        
        const width = 450,
              height = 250,
              margin = 1;

        const radius = Math.min(width, height) /2 - margin;
        var svg = d3.select("#pieChartForSourcePorts")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate("+((width/2)-70)+","+height/2+")");

        var data = {"One To One ": oneToOnePortsCount, 
                    "One To Many": oneToManyPortsCount}

          var color = d3.scaleOrdinal()
                        .domain(data)
                        .range(["#00cc00", "#009933"])

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

              svg.append("text")
                 .text("Source Port Mappings")
                 .attr("fill","#000")
                 .attr("x",-70)
                 .attr("y",0)
                 .style("font-size", 14);



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
        

        }
        catch(err)
        {
            var error = {
                'status': 400, 
                'type': 'error',
                'message': err
            }
            console.log(error);
        }

      }

    createDestinationPortsPieChart = () => {
        //This function will create Pie Chart for Ports directly connected with Source Port
        //fetch the data, data is too long hence call the endpoint
        try
        {
           var item = {};
           const vidaData = analyticsData;
           const queriedId = this.props.queryToRun;
           vidaData.forEach((dataItem)=>{
               if(dataItem.id === queriedId)
               {
                   console.log("LOG : Queried Id Found. ID - "+queriedId);
                   item = dataItem;
               }
           })
          
        //data is within item variable
        //Now fetch Port_Data value and write your logic
        var  jsonPortsGlobalDict = {};
        var jsonPortsArray = [];
        const srcIdentifier = 0; //as every jsonRow below has Source Port at 0 index
        const destIdentifier = 1;
        item.Port_Data.split('|').forEach((portItem)=>{
            var jsonRow = JSON.parse(portItem);
            var currentValue = 0, newValue=0;
            var Key = jsonRow[destIdentifier];
            var jsonPortsDataDict = {}
            if(jsonPortsGlobalDict.hasOwnProperty(Key))
            {
                currentValue = jsonPortsGlobalDict[Key].Value;
                newValue = currentValue + 1;
                jsonPortsGlobalDict[Key].Value = newValue;
                var portList = jsonRow[srcIdentifier]
                jsonPortsGlobalDict[Key].List.push(portList);
            }
            else
            {
                jsonPortsDataDict['Port']=Key;
                jsonPortsDataDict['Value']=1;
                jsonPortsDataDict['List']=[jsonRow[srcIdentifier]]
                jsonPortsArray.push(jsonPortsDataDict);
                jsonPortsGlobalDict[Key]=jsonPortsDataDict
            }
        })

        //console.log("jsonPortArray ", JSON.stringify(jsonPortsArray));
        var oneToOnePortsCount = 0, oneToManyPortsCount = 0;
        var destPortOneToOne =[], destPortsOneToMany=[];
        for (var i =0; i<jsonPortsArray.length; i++)
        {
            if(jsonPortsArray[i].Value===1)
            {
              oneToOnePortsCount+=1;
              var jsonRecord = {
                  "src" : jsonPortsArray[i].Port,
                  "dest" : jsonPortsArray[i].List[0] 
              }
              destPortOneToOne.push(jsonPortsArray[i].Port);
            }
            else
            {
              oneToManyPortsCount+=1;
              //console.log("1 to Many Destination : ",jsonPortsArray[i].List)
              var jsonRecord = {
                "src" : jsonPortsArray[i].Port,
                "dest" : jsonPortsArray[i].List
               }
               destPortsOneToMany.push(jsonPortsArray[i].Port);
            }
        }
        
        destPortOneToOne.sort(function(a,b){return a-b})
        destPortsOneToMany.sort(function(a,b){return a-b})

        this.setState({destinationPortsOneToOne:destPortOneToOne,
                       destinationPortsOneToMany:destPortsOneToMany
        })
      
        const width = 450,
              height = 250,
              margin = 1;

        const radius = Math.min(width, height) /2 - margin;
        var svg = d3.select("#pieChartForDestinationPorts")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate("+((width/2)-70)+","+height/2+")");

        var data = {"One To One ": oneToOnePortsCount, 
                    "One To Many": oneToManyPortsCount}

          var color = d3.scaleOrdinal()
                        .domain(data)
                        .range(["#ff5050","#cc0000"])

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

              svg.append("text")
                 .text("Destination Port Mappings")
                 .attr("fill","#000")
                 .attr("x",-89)
                 .attr("y",0)
                 .style("font-size", 14);



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
        

        }
        catch(err)
        {
            var error = {
                'status': 400, 
                'type': 'error',
                'message': err
            }
            console.log(error);
        }

      }

 
  render()
  {
     {this.generateReport();}
     {this.createUniquePortsPieChart();}
     {this.createSourcePortsPieChart();}
     {this.createDestinationPortsPieChart();}
      
     const pieTableWidth = {
         width: "400px"
     }
     const breakHeight = {
       margin: "10px 0"
     }


     return (          
          <div>
               <Table>
                   <Row>
                       <Container>
                        <Table bordered={false} hover={true} response="md" striped={true} height="345px" width="450px">
                         <tr>
                             <td><b>Source IP&nbsp;</b></td>
                             <td>{this.state.sourceIp}</td>
                         </tr>
                         <tr>
                             <td><b>Destination IP</b></td>
                             <td>{this.state.destIp}</td>
                         </tr>
                         <tr>
                             <td><b>Source Host</b></td>
                             <td>{this.state.sourceHost}</td>
                         </tr>
                         <tr>
                             <td><b>Destination Host</b></td>
                             <td>{this.state.destHost}</td>
                         </tr>
                         <tr>
                             <td><b>Application Name</b></td>
                             <td>{this.state.appName}</td>
                         </tr>
                         <tr>
                             <td><b>User</b></td>
                             <td>{this.state.user}</td>
                         </tr>
                         <tr>
                             <td><b>Communication Type</b></td>
                             <td><CommunicationType sourcePortCount={this.state.sourcePortCount} destPortCount={this.state.destPortCount}></CommunicationType></td>
                         </tr>
                        </Table>
                       </Container>
                       <Container>
                        <Table style={pieTableWidth} bordered={true} hover={true} striped={false} height="345px">
                         <thead align="left"><td><h5>&nbsp;Ports Distribution</h5></td></thead>
                          <tr class="trBlueBg">
                             <td class="cursor">
                               {/*This block is showing the number of individual source/destination ports count */}
                               <div id="pieChartForPorts">
                               </div>
                             </td>
                           </tr>  
                        </Table>                         
                       </Container>
                   </Row>
                   <Row>
                      <Container>
                        <Table style={pieTableWidth} bordered={true} hover={true} response="md" striped={true}>
                         <thead align="left"><td><h5>&nbsp;Source Port Details</h5></td></thead>
                          <tr class="trBlueBg">
                              <td class="cursor">
                                {/*This block is showing the number of Ports directly connected with each Source Port */}
                               <div id="pieChartForSourcePorts">
                               </div>
                              </td>
                          </tr>
                                                  
                        </Table>
                      </Container>
                      <Container>
                        <Table style={pieTableWidth} bordered={true} hover={true} response="md" striped={true}>
                          <thead align="left"><td><h5>&nbsp;Destination Port Details</h5></td></thead>
                           <tr class="trBlueBg">
                              <td class="cursor">
                                {/*This block is showing the number of Ports directly connected with each Source Port */}
                               <div id="pieChartForDestinationPorts">
                               </div>
                              </td>
                           </tr>                           
                         </Table>
                       </Container>
                    </Row>
                    <Row>
                      <Container>
                        <Table width="450px" height="340px" bordered={true} hover={true} response="md" striped={true}>
                         <thead align="left">
                             <td>
                              <h5>&nbsp;Source Port List</h5>
                             </td>                             
                          </thead>
                          <tr class="trBlueBg">
                           <td width="200px">
                             <b>One To One Ports</b>
                           </td>
                           <td width="200px">
                             <b>One To Many Ports</b>
                           </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                <ul className="port-List">
                                  {
                                    this.state.sourcePortsOneToOne.map((item)=>{
                                      return <li>{item}</li>
                                    })
                                  }
                                </ul>
                              </div>
                            </td>
                            <td>
                            <div>
                                <ul className="port-List">
                                  {
                                    this.state.sourcePortsOneToMany.map((item)=>{
                                      return <li>{item}</li>
                                    })
                                  }
                                </ul>
                              </div>
                            </td>
                          </tr>                                                  
                        </Table>
                      </Container>
                      <Container>
                      <Table width="450px" bordered={true} hover={true} response="md" striped={true}>
                         <thead align="left">
                         <td><h5>&nbsp;Destination Port List</h5></td>
                          </thead>
                          <tr class="trBlueBg">
                           <td width="200px">
                             <b>One To One Ports</b>
                           </td>
                           <td width="200px">
                              <b>One To Many Ports</b>
                           </td>
                          </tr>
                          <tr>
                              <td>
                              <div className="port-List">
                                <ul>
                                  {
                                    this.state.destinationPortsOneToOne.map((item)=>{
                                      return <li>{item}</li>
                                    })
                                  }
                                </ul>
                              </div>
                            </td>
                            <td>
                            <div>
                                <ul className="port-List">
                                  {
                                    this.state.destinationPortsOneToMany.map((item)=>{
                                      return <li>{item}</li>
                                    })
                                  }
                                </ul>
                              </div>
                              </td>
                          </tr>                                                  
                        </Table>
                       </Container>
                    </Row>
                    
               </Table>
          </div>
      )
  }
}

export default VidaAnalysisReport;

