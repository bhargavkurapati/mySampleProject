import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ModalBody from 'react-bootstrap/ModalBody';
import './AnalyticsSideBar.css';
import LoadingButton from './LoadingButton';

//const API_URL=process.env.REACT_APP_API_URL
const API_URL = "http://9.51.192.123:8000"

class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            port: [],
            app:[],
            selectedPorts:[],
            showLoadingModal: true,
        }
    }
    componentDidMount() {
        axios.get(API_URL+'/api/affinity').then(response=>{
            var ports=[]
            var apps=[]
            response.data.map(
               (item) => {
                   if (!ports.includes(item.dest_port)) ports.push(item.dest_port)
                   if (!apps.includes(item.app_name)) apps.push(item.app_name)
               }
            )
            this.setState({
                port:ports,
                app:apps,
            },()=>{console.log("Analytics Side Bar",this.state.port)})
        })
    }
    portOption=(v)=>{
        return {value:v,label:v}
    }
    onSelectingAPort=(e)=>{
        if (e != null){
            console.log(e[0].value)
            console.log(this.state.selectedPorts)
            this.setState({
                selectedPorts: e
            },()=>{
                var ports=this.state.selectedPorts.map(i=>i.value)
                console.log(ports)
                this.props.onSelectingAPort(ports)
            })
        } else {
            this.setState({
                selectedPorts: e
            },()=>{
                this.props.onSelectingAPort([])
            })
        }

    }
    onSelectingAnApp=(e)=>{
        this.props.onSelectingAnApp(e)
    }
    onSelectingSSL=(e)=>{
        this.props.onSelectingSSL(e)
    }
    render(){
        return(
            <div class=" clr-row pd-075r">
            <div class="clr-col-12 clr-col-md-12">
                <div class="text-left ">
                <div class="clr-col-12 clr-col-md-12">
                    <h6>Ports:</h6>
                     <Select className="port-select" isMulti value={this.state.selectedPorts} options={this.state.port.map(v=>this.portOption(v))} onChange={this.onSelectingAPort}/>
                </div>
                  <div className="bg-grey mt-1r pd-025r">
                     <div class="clr-col-12 clr-col-md-12">
                        <h6>Applications:</h6>
                        <table class="table table-compact affinityTable" response="md" >

                        {this.state.app.length===0?<LoadingButton currentLength="2" show={this.state.showLoadingModal} />:this.state.app.map(
                            (item,i)=>    
                            [<tr>
                             <td><input class="checkfield" type="checkbox" name={item} onChange={this.onSelectingAnApp} id={item} /></td>
                             <td><label for={item}>{item}</label></td>
                             </tr>
                             ]       
                        )}
                         </table>

                        {/* <ModalBody style={{'max-height': '30vh', 'overflow-y': 'auto', 'float':'left'}} > */}
                        {/* <Form type="checkbox" id="analytics-app-checkbox" > */}
                                {/* {this.state.app.length===0?<p>Loading...</p>:this.state.app.map(
                                    (item)=>                
                                    // <Form.Check type="checkbox" onChange={this.onSelectingAnApp} name="analytics-app-checkbox" id={item} label={item} isValid />
                                    <label for={item}>{item}</label> <input type="checkbox" name={item} onChange={this.onSelectingAnApp} id={item}  />
                                )} */}
                        {/* </Form> */}
                        {/* </ModalBody> */}
                    </div>
                    <div class="clr-col-12 clr-col-md-12 ">
                        <table class="table table-compact affinityTable-sm" response="md">
                            <tr>
                                {/* <td>
                                <Form type="checkbox" id="analytics-ssl-checkbox" className="m-0 pd-0">
                                     <Form.Check type="checkbox" onChange={this.onSelectingSSL} name="analytics-ssl-checkbox" id="ssl" className="m-0 pd-0"/>
                                </Form>
                                </td>
                                <td>
                                    <label for="analytics-ssl-checkbox" class="ml1">Show SSL Only:</label>
                                </td> */}
                                <td><input class="checkfield" type="checkbox"  onChange={this.onSelectingSSL} name="analytics-ssl-checkbox" id="ssl" /></td>
                                <td><label for="ssl">Show SSL Only</label></td>
                            </tr>
                        </table>
                       
                        
                    </div>
                </div>
                <div class="clr-col-12 clr-col-md-12 mt-1r">
                    <h6>More Information: </h6>
                     <label for="myFile">Select a file (Feature is WIP):</label> <input type="file" name="myFile"/>
                </div>
            </div>
            </div>
            </div>  
        )
    }
}

export default SideBar