import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Badge from 'react-bootstrap/Badge';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
// import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import DrawAnalyticsGraph from './DrawAnalyticsGraph';
import SideBar from './AnalyticsSideBar';
import NetworkGraphForAffinity from './NetworkGraphAffinity';
import LoadingButton from './LoadingButton';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './clr-ui.min.css';
import './clr-ui.min_2.0.0.css';
import './App.css';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';
// import Select from 'react-select';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownMenu from 'react-bootstrap/DropdownMenu';
import L1ScanInputForm from './l1ScanInputs';


/*------------------- clarity ------------------*/



//importing analyticsData for ViDA Analytics
import analyticsData from './data/analyticsData.json';
import DrawVidaAnalyticsGraph from './DrawVidaAnalyticsGraph';
import VidaAnalysisReport from './GenerateAnalysisReport';


const API_URL = process.env.REACT_APP_API_URL
const REDIRECT_URL = process.env.REACT_APP_SERVER_URL
sessionStorage.setItem('_dcURL', REDIRECT_URL);
const search = window.location.search;
const params = new URLSearchParams(search);
sessionStorage.setItem('token', params.get('token'));
//DC URL
const VIDA_SESSION_DCURL = sessionStorage.getItem("_dcURL");

//dc token
const VIDA_SESSION_TOKEN = sessionStorage.getItem("token");
console.log("VIDA_SESSION_TOKEN:::", VIDA_SESSION_TOKEN);


const headerList = ['App Details', 'Server Details', 'Server Inventory', 'ViDA Analytics', 'L1 Scan', 'Instances']
const fieldsForHeader = ['business_app_name,cu_app_id,business_unit,business_app_owner,server_name',
  'server_name,os_platform,primary_ip_address,fqdn',
  'host_name,ip_address,fqdn,ip_host_composite,os_long,os_version,os_short,server_function,kernel_architecture,kernel_version,manufacturer,model,architecture,cpu_speed,cpu_type'
  , '', 'l1_scan', 'instanceid']
const fieldforInstance = ['', 'instanceid,server_ip,username,os,status,created_at', 'instanceid,os_version,public_ip,private_ip']
const apiPerHeader = ['/instances']
const contextMenuFields = ["create Cloud Formation Template", "create Terraform", "create Red Hat CloudFormation"]
const MENU_TYPE = 'SIMPLE'

//Vida Analytics Code Below -- Added by NikhilS
const performanceVidaMetrics = ['', 'host_name,fqdn,disk,size_mb',
  'host_name,fqdn,filesystems,sike_kb,used_kb,free_kb,pct_used,mount_point,owner,group,perm,type,timestamp',
  'host_name,ip_address,subnet_mask,fqdn,os_install_path,os_kernel_version,os_name,os_version,bios_date,bios_manufacturer,bios_name,bios_version,current_time_zone,daylight_savings,file_system_available_mb,file_system_capacity_mb,file_system_used_mb,host_physical_memorymb,host_manufacturer,host_model,host_install_date,host_platform,host_serialnumber,host_encryptionlevel,host_wmiused,host_serverflag,host_servicepack_level,host_uniqueidentifier,host_user_assigned,host_user_id,hyperthreading_capable,hyperthreading_enabled,physical_processor_count,processor_cores_per_physical,processor_coretype,processor_count,processor_id,processor_l2cachekb,processor_speedmhz,processor_type,server_function,server_locale,physical_server_type,os_kernel_bits',
  'host_name,fqdn,group,gid,members',
  'host_name,fqdn,gateway,interface,address',
  '',
  'lpar_nodename,lpar_partitionname,lpar_partitionnumber,lpar_type,lpar_mode,lpar_entitledcapacity,lpar_partitiongroup-id,lpar_sharedpoolid,lpar_onlinevirtualcpus,lpar_maximumvirtualcpus,lpar_minimumvirtualcpus,lpar_onlinememory,lpar_maximummemory,lpar_minimummemory,lpar_variablecapacityweight,lpar_minimumcapacity,lpar_maximumcapacity,lpar_capacityincrement,lpar_maximumphysicalcpusinsystem,lpar_activephysicalcpusinsystem,lpar_activecpusinpool,lpar_sharedphysicalcpusinsystem,lpar_maximumcapacityofpool,lpar_entitledcapacityofpool,lpar_unallocatedcapacity,lpar_physicalcpupercentage,lpar_unallocatedweight',
  'host_name,fqdn,gateway,interface,address',
  'host_name,fqdn,gateway,interface,mask',
  'host_name,fqdn,pkginst,name,category,version,basedir,vendor,desc,instdate',
  '',
  'host_name,fqdn,uid,pid,ppid,c,stime,tty,time,cmd',
  'host_name,fqdn,user,uid,gid,gecos,dir,s4',
  'host_name,fqdn,lv,lsize,vg,vsize,fmt,mount',
  '',
  ''
]
const vidaAnalyticsHeaders = ['application_name,source_ip,source_host,destination_ip,destination_host']//user,directory_address']
const neoPlottingUrls = ['', 'http://9.51.193.91/Neo4j/AppCent.html',
  'http://9.51.193.91/Neo4j/Apppath.html',
  'http://9.51.193.91/Neo4j/sercenfil.html',
  'http://9.51.193.91/Neo4j/sercenful.html',
  'http://9.51.193.91/Neo4j/usercen.html'
];

const User = () => {
  return <p>hello</p>

}
class ShowAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        show: props.show,
      }
    }
  }
  onCloseClick = () => this.props.onCloseAlertClick();
  render() {
    console.log(this.state);
    return (
      <tr className="Alert-Row">
        <td colSpan={this.props.colLength + 1}>
          <Alert variant="warning" onClose={this.onCloseClick} show={this.state.show} dismissible>
            <Alert.Heading>No Rows found</Alert.Heading>
            < p><b>Query: </b>&ensp; {this.props.queryToRun} &ensp;<b>fetched</b> {this.props.resultCount} <b>from database</b></p>
          </Alert>
        </td>
      </tr>
    )
  }
}

class ShowContextMenu extends React.Component {
  handleClick = (e, idx) => {
    //    console.log("Clicked: e",e)
    //    console.log("clicked id: ",idx)
    alert("This feature is a WIP")
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.rowId} holdToDisplay={1000}>
          <div className='well'>{this.props.value}</div>
        </ContextMenuTrigger>
        <ContextMenu id={this.props.rowId}>
          {contextMenuFields.map(
            (item, idx) =>
              <MenuItem onClick={this.handleClick} idx={idx}>{item}</MenuItem>
          )}
        </ContextMenu>
      </div>
    );
  }
}
class NavigationBarUserGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      condition:false
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.navItemSelected !== state.show) {
      return {
        show: props.navItemSelected,
      }
    }
  }

  instanceSelected = (event) =>{
    const value = event.target.id;
    console.log("Value Selected : ",value);
    this.props.instanceSelected(value)
  }

  

  handleClick = () =>{ 
    this.setState( { condition : !this.state.condition } );
   }
   handleCollapseClick = () =>{ 
    this.setState( { condition : false } );
   }
  //  mouseOut() {
  //   console.log("Mouse out!!!");
  //   this.setState({flipped: false});
  // }
  navSelected = (e) => {
    console.log("Nav Selected", e.target.value)
    this.props.navSelected(parseInt(e))
  }
  render() {
    // const params = queryString.parse(this.props.location.search)
     console.log("condition::::::",this.state.condition);
    return (
      <div class="header-actions" >
        <div  class="tbBorder" className={this.state.condition ? "dropdown bottom-right open" :"dropdown bottom-right"} >
           <button class="dropdown-toggle" aria-label="toggle" onClick={this.handleClick}>
             User Guide
             <clr-icon shape="caret down"></clr-icon>
           </button>
           <div class="dropdown-menu"  onMouseLeave={() => this.handleCollapseClick()}>
              <div class="dropdown-item"  ><a href="../public/vida_user_guide.pdf">Download User Guide</a></div>
            </div> 
        </div>
      </div>           
    )
  }
}
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      condition:false
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.navItemSelected !== state.show) {
      return {
        show: props.navItemSelected,
      }
    }
  }

  instanceSelected = (event) =>{
    const value = event.target.id;
    console.log("Value Selected : ",value);
    this.props.instanceSelected(value)
  }

  

  handleClick = () =>{ 
    this.setState( { condition : !this.state.condition } );
   }
   handleCollapseClick = () =>{ 
    this.setState( { condition : false } );
   }
  //  mouseOut() {
  //   console.log("Mouse out!!!");
  //   this.setState({flipped: false});
  // }
  navSelected = (e) => {
    console.log("Nav Selected", e.target.value)
    this.props.navSelected(parseInt(e))
  }
  render() {
    // const params = queryString.parse(this.props.location.search)
     console.log("condition::::::",this.state.condition);
    return (
      <div class="header-actions" >
        <div  class="tbBorder" className={this.state.condition ? "dropdown bottom-right open" :"dropdown bottom-right"} >
           <button class="dropdown-toggle" aria-label="toggle" onClick={this.handleClick}>
             Instances
             <clr-icon shape="caret down"></clr-icon>
           </button>
           <div class="dropdown-menu" onClick={(e)=>this.instanceSelected(e)} onMouseLeave={() => this.handleCollapseClick()}>
              <div class="dropdown-item" id="0" >Create Instance</div>
              <div class="dropdown-item" id="1" >Get Instance Status</div>
              <div class="dropdown-item" id="2" >Instance Report</div>
            </div> 
        </div>
      </div>           
    )
  }
}
class NavigationBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      condition:false,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.navItemSelected !== state.show) {
      return {
        show: props.navItemSelected,
      }
    }
  }

  handleClick = () =>{ 
    this.setState( { condition : !this.state.condition } );
   }
   handleCollapseClick = () =>{ 
    this.setState( { condition : false } );
   }
  navSelected = (e) => {
    console.log("Nav Selected", e)
    this.props.navSelected(parseInt(e))
  }
  render() {
    // const params = queryString.parse(this.props.location.search)
     console.log("condition::::::",this.state.condition);
    return (
      <div class="header-actions">
        <div  className={this.state.condition ? "dropdown bottom-right open" :"dropdown bottom-right"}>
                  <button class="dropdown-toggle" aria-label="toggle" onClick={this.handleClick}>
                    Analytics
                    <clr-icon shape="caret down"></clr-icon>
                  </button>
                  <div class="dropdown-menu" onClick={() => this.handleCollapseClick()} onMouseLeave={() => this.handleCollapseClick()}>
                  {this.props.headerList.map(
                      (header, idx) => {
                        if (header === "L1 Scan" || header ==="ViDA Analytics") {
                          return  <div class="dropdown-item" onClick={() => this.navSelected(idx)} activeKey={this.state.show} key={idx} eventKey={idx}>{header}</div>
                        } 
                      }
                    )} 
                  </div> 
         </div>
      </div>
      
    )
  }
}  

//Analytics Code added by NikhilS

class AnalyticsResultBar extends React.Component {
  render() {
    return (
      <div className="results-placeholder results mt-3">
        Results: <span class="badge badge-5">{this.props.resultCount} </span>
        <span > | </span>
        Time: <span class="badge badge-5">{this.props.timeTaken} ms </span>
      </div>
    )
  }
}


class ClearResults extends React.Component {
  render() {
    return (
      <button class="btn btn-primary btn-sm btn-sm-right mt-3" onClick={this.props.clearResults}>Clear Results</button>
    )
  }
}
class ResultBar extends React.Component {
  render() {
    return (
      <div className="results-placeholder results mt-3">
        Results: <span class="badge badge-5">{this.props.resultCount} </span>
        <span > | </span>
        Time: <span class="badge badge-5">{this.props.timeTaken} ms </span>
      </div>
    )
  }

}
class HeaderFields extends React.Component {
  render() {
    return (
      <tr>
        <th className=""></th>
        {this.props.headerFields.split(',').map(
          (item, idx) => (
            <th className="" key={idx}>{item.toUpperCase().replace(/_/g, ' ')}</th>
          )
        )}
      </tr>
    )
  }
}

class HeaderFieldsinstance extends React.Component {
  render() {
    return (
      <tr>
        {this.props.headerFields.split(',').map(
          (item, idx) => (
            <th key={idx}>{item.toUpperCase().replace(/_/g, ' ')}</th>
          )
        )}
      </tr>
    )
  }
}


class SearchFields extends React.Component {
  render() {
    return (
      <tr key={this.props.myState["navSelected"]}>
        <td key="radio-col" className=""></td>
        {this.props.headerFields.split(',').map(
          (item, idx) => (
            <td className="" key={idx + "-" + item}>
              {/* <form class="clr-form clr-form-compact"> */}
              <input id={item} type="search" name={item} value={this.props.myState[item + "_query"]} onChange={this.props.handleKeyPress} onKeyPress={this.props.handleKeyPress} placeholder="" class="clr-input" />
              {/* </form> */}
            </td>
          )
        )}
      </tr>
    )

  }
}

class DataFieldInstances extends React.Component {

  formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(string).toLocaleDateString([], options);
  }

  render() {
    console.log("Data List:", this.props.dataList)
    console.log("This is DataField Instances");
    return (
      this.props.dataList.map(
        (item, idx) => (
          <tr key={idx} id={idx} >

            {this.props.headerList.split(',').map(
              (header, idx2) => {
                if (header === "server_name") {
                  return <td key={idx2} onClick={this.serverFieldClicked} className="link" id={idx2}>{item[header]}</td>
                } else if (header === "business_app_name") {
                  return <td key={idx2} id={idx2}><ShowContextMenu rowId={idx} value={item[header]} /></td>
                }
                else if (header === "created_at") {
                  const a = item[header]
                  const b = this.formatDate(a)
                  console.log("dsfsgfdsdffd")
                  console.log(b)
                  return <td key={idx2} id={idx2}>{b}</td>
                } else {
                  console.log("else*************")
                  return <td key={idx2} id={idx2}>{item[header]}</td>
                }
              }
            )}
          </tr>
        )
      )
    )
  }
}




class DataFieldstatus extends React.Component {



  render() {
    console.log("Data List:", this.props.datalistStatus)
    return (
      this.props.datalistStatus.map(
        (item, idx) => (
          <tr key={idx} id={idx}>
            <td></td>
            {this.props.headerList.split(',').map(

              (header, idx2) => {
                if (header === "server_name") {
                  return <td key={idx2} onClick={this.serverFieldClicked} className="link" id={idx2}>{item[header]}</td>
                } else if (header === "business_app_name") {
                  return <td key={idx2} id={idx2}><ShowContextMenu rowId={idx} value={item[header]} /></td>
                }
                else {

                  return <td key={idx2} id={idx2}>{item[header]}</td>

                }
              }
            )}
          </tr>
        )
      )
    )
  }
}


class DataFieldInstance extends React.Component {
  getRowSelectedInstances = (e) => {
    console.log("Radio Selected: ", e.target)
    console.log("Radio selected: ", e.target.id)
    this.props.getRowSelectedInstances(e.target.id)
    this.props.hideMessage();

  }


  render() {
    console.log("Data List:", this.props.dataList)
    console.log("This is Data Field Instance");
    return (
      this.props.dataList.map(
        (item, idx) => (
          <tr key={idx} id={idx} >
            <td key={"radio-" + idx} id={idx} >
              { (item['status']!=='In queue'  &&  item['status']!=='In Progress')    &&     
                 <input onChange={this.getRowSelectedInstances} name="server-radio" id={item['instanceid']} title={item['status']}  type="radio" class="form-check-input is-valid" />
              }
              { (item['status']==='In queue' || item['status']==='In Progress' )   &&  
                <input  name="server-radio" id={item['instanceid']} title={item['status']} type="radio" class="form-check-input is-valid" disabled />
              }
            </td>
            {this.props.headerList.split(',').map(
              (header, idx2) => {
                if (header === "server_name") {
                  return <td class="text-left" key={idx2} onClick={this.serverFieldClicked} className="link" id={idx2}>{item[header]}</td>
                } else if (header === "business_app_name") {
                  return <td class="text-left" key={idx2} id={idx2}><ShowContextMenu rowId={idx} value={item[header]} />{item[header]} </td>
                } else {
                  return <td class="text-left" key={idx2} id={idx2}>{item['instanceid']}</td>
                }
              }
            )}
          </tr>
        )
      )
    )
  }
}

class DataFields extends React.Component {
  getRowSelected = (e) => {
    console.log("Radio Selected: ", e.target)
    console.log("Radio selected: ", e.target.id)
    this.props.getRowSelected(e.target.id)
  }
  serverFieldClicked = (e) => {
    console.log("Server Field Clicked", e.target.innerText)
    this.props.serverFieldClicked(e.target.innerText)
  }
  render() {
    console.log("Data List:", this.props.dataList)
    return (
      this.props.dataList.map(
        (item, idx) => (
          <tr key={idx} id={idx} >
            <td key={"radio-" + idx} id={idx} >
              {/* <Form.Check type="radio" id="check-api-radio">
                <Form.Check.Input onChange={this.getRowSelected} name="server-radio" id={item[this.props.headerList.split(',')[0]] + "---" + item['server_name']} type="radio" isValid />
              </Form.Check> */}
              <input onChange={this.getRowSelected} name="server-radio" id={item[this.props.headerList.split(',')[0]] + "---" + item['server_name']} type="radio" class="form-check-input is-valid" />

              {/* <input onChange={this.getRowSelected} name="server-radio" id={item[this.props.headerList.split(',')[0]] + "---" + item['server_name']} type="radio" class="form-check-input is-valid" /> */}
            </td>
            {this.props.headerList.split(',').map(
              (header, idx2) => {
                if (header === "server_name") {
                  return <td key={idx2} onClick={this.serverFieldClicked} className="link" id={idx2}>{item[header]}</td>
                } else if (header === "business_app_name") {
                  return <td key={idx2} id={idx2}><ShowContextMenu rowId={idx} value={item[header]} /></td>
                } else {
                  return <td key={idx2} id={idx2}>{item[header]}</td>
                }
              }
            )}
          </tr>
        )
      )

    )
  }
}

//Vida Analytics Data Fields -- Added by NikhilS
class AnalyticsDataFields extends React.Component {

  getDataRowSelected = (e) => {
    console.log("Radio Selected : " + e);
    console.log("Radio Id Selected : " + e.target.id);
    this.props.getDataRowSelected(e.target.id);
  }


  render() {
    //****NOTE : Once Couchbase is up and running replace, analyticsData with axios.get */
    console.log("analytics Data List : ", this.props.analyticsData)
    return (
      this.props.analyticsData.map(
        (item, index) => (
          <tr key={index} id={index}>
            <td key={"radio-" + index} id={index} >
              <Form.Check type="radio" id="check-api-radio">
                <Form.Check.Input onChange={this.getDataRowSelected} name="server-radio" id={item["id"]} type="radio" isValid />
              </Form.Check>
              {/* <input onChange={this.getRowSelected} name="server-radio" id={item[this.props.headerList.split(',')[0]] + "---" + item['server_name']} type="radio" class="form-check-input" is-valid /> */}
              {/* <input type="radio" onChange={this.getDataRowSelected} name="server-radio" id={item["id"]} type="radio" isValid class="clr-radio" /> */}

            </td>
            {
              this.props.headerFields.split(',').map(
                (header, innerIndex) => {
                  //Destructuring the data Objects   
                  if (header === "application_name") {
                    return <td key={innerIndex} id={innerIndex} >{item["APP_NAME"]}</td>
                  }
                  else if (header === "source_ip") {
                    return <td key={innerIndex} id={innerIndex}>{item["Source_IP"]}</td>
                  }
                  else if (header === "source_host") {
                    return <td key={innerIndex} id={innerIndex}>{item["Source_HOST"]}</td>
                  }
                  else if (header === "destination_ip") {
                    return <td key={innerIndex} id={innerIndex}>{item["Dest_IP"]}</td>
                  }
                  else if (header === "destination_host") {
                    return <td key={innerIndex} id={innerIndex}>{item["Dest_HOST"]}</td>
                  }
                  else if (header === "directory_address") {
                    return <td key={innerIndex} id={innerIndex}>{item["Dir_Addr"]}</td>
                  }
                  else {
                    return <td key={innerIndex} id={innerIndex}>{item[header]}</td>
                  }
                }
              )
            }
          </tr>
        )
      )
    )
  }
}

class Graph1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      showLoading: false,
      showLoadingModal: false,
      appSelected: "",
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.appSelected !== state.appSelected) {
      return {
        appSelected: props.appSelected,
        showLoading: true,
      }
    }
  }
  stopLoading = () => {
    this.setState({
      showLoading: false,
    })
  }
  stopLoadingInModal = () => {
    this.setState({
      showLoadingModal: false,
    })
  }
  render() {
    if (this.props.appSelected === "") {
      return (
        // <div class="content-area">
        <div class="alert alert-info pd-0" role="alert">
          <div class="alert-items">
            <div class="alert-item static">
              <div class="alert-icon-wrapper">
                <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
              </div>
              <span class="alert-text text-center">
                <strong>Search and Select a specific row radio button.</strong>
                <i> Select any row!!!</i>
              </span>
            </div>
          </div>
        </div>
        // </div>
      )
    } else {
      return (
        <table class="table table-compact" response="md" >
          <thead>
            <tr><th class=" m-0 p-1">Affinity Dashboard for {this.props.appSelected.split('---')[0]} App on {this.props.appSelected.split('---')[1]}</th>
              <th>
                {/* <button class="btn btn-primary btn-sm m-0 full-graph-button" onClick={() => this.setState({ modalShow: true, showLoadingModal: true })}>Full View</button> */}
                <button class="btn btn-primary btn-sm m-0 full-graph-button" onClick={() => document.getElementById('Affinity-fullview').style.display = 'block'}>Full View</button>
                {/* <Button className="full-graph-button" onClick={() => this.setState({ modalShow: true, showLoadingModal: true })}>Full View</Button> */}

                {/* <Modal dialogClassName="modal-graph" show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, })}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Affinity Full View of {this.props.appSelected.split('---')[0]} App on {this.props.appSelected.split('---')[1]}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                    <NetworkGraphForAffinity stopLoading={this.stopLoadingInModal} height='760' width='960' queryToRun={'/api/affinityAppMaster?limit=10000000&business_application=' + this.state.appSelected.split('---')[0] + '&source_host=' + this.state.appSelected.split('---')[1]} />
                  </Modal.Body>
                </Modal> */}
                <div class="modal" dialogClassName="modal-graph" id="Affinity-fullview" show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, })} >
                  <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title text-white">Affinity Full View of {this.props.appSelected.split('---')[0]} App on {this.props.appSelected.split('---')[1]}</h4>
                        <button aria-label="Close" class="close" type="button" onClick={() => document.getElementById('Affinity-fullview').style.display = 'none'}>
                          <img src="/times-line.svg" width="36px" height="25px" class="text-white" alt="Close" />
                        </button>
                      </div>
                      <div class="modal-body">
                        <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                        <NetworkGraphForAffinity stopLoading={this.stopLoadingInModal} height='760' width='960' queryToRun={'/api/affinityAppMaster?limit=10000000&business_application=' + this.state.appSelected.split('---')[0] + '&source_host=' + this.state.appSelected.split('---')[1]} />
                      </div>
                      <div class="modal-footer">
                        {/* <button class="btn btn-outline" type="button">Cancel</button>
                                <button class="btn btn-primary" type="button">Ok</button> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="modal-backdrop" aria-hidden="true"></div> */}
              </th>
            </tr>
          </thead>
          <tbody class="">
            <LoadingButton currentLength="1" show={this.state.showLoading} />
            <NetworkGraphForAffinity stopLoading={this.stopLoading} height='270' width='370' queryToRun={'/api/affinityAppMaster?limit=20&business_application=' + this.state.appSelected.split('---')[0] + '&source_host=' + this.state.appSelected.split('---')[1]} />
          </tbody>
        </table>
      )
    }
  }
}

class VidaAnalyticsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      plotDataSelected: "",
      currentPlot: "Port Mapping",
      showLoading: false,
      showLoadingModal: false,
      modalPlotShow: false,
      modalReportShow: false,
    })
  }

  // document.getElementById('report-graph1').style.display='none';
  // document.getElementById('report-graph2').style.display='none';
  // document.getElementById('report-graph3').style.display='none';
  // document.getElementById('report-graph4').style.display='none';

  static getDerivedStateFromProps(props, state) {
    if (props.plotDataSelected !== state.plotDataSelected) {
      return {
        plotDataSelected: props.plotDataSelected,
        showLoading: true
      }
    }
  }
  stopLoading = () => {
    this.setState({
      showLoading: false,
    })
  }
  stopLoadingInModal = () => {
    document.getElementById('report-graph1').style.display = 'none';
    document.getElementById('report-graph2').style.display = 'none';
    document.getElementById('report-graph3').style.display = 'none';
    document.getElementById('report-graph4').style.display = 'none';
    this.setState({
      showLoadingModal: false,
    })

  }

  vidaAnalyticsSelector = (e) => {
    this.setState({ showLoading: true })
    console.log("Current Selector Value, before Change : ", this.state.currentPlot);
    console.log("Mapping Selected : ", e.target.value)
    console.log((e.target.value.toString()))
    this.setState({
      currentPlot: e.target.value.toString()
    })
    console.log("Props Current Plot : ", this.props.currentPlot);

    //  this. hideModals()
  }

  // showModal = () => {
  //   // this.setState({ modalReportShow: true });
  // };

  // hideModals = (e) => {Select any row !!
  //   console.log("Hide called,......");
  //   // console.log((e.target.value.toString()))
  //   // this.setState({ modalPlotShow: false });  
  // };
  render() {

    if (this.props.plotDataSelected === "") {
      return (
        // <div class="content-area">
        <div class="alert alert-info pd-0" role="alert">
          <div class="alert-items">
            <div class="alert-item static">
              <div class="alert-icon-wrapper">
                <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
              </div>
              <span class="alert-text text-center">
                <strong>Search and Select a specific row radio button.</strong>
                <i> Select any row!!!</i>
              </span>
            </div>
          </div>
        </div>
        //  </div>
      );
    }
    else {
      if (this.state.currentPlot === "Port Mapping") {
        return (
          <table class="table table-compact" response="md" >
            {/* <Table bordered={false} hover={false} response="md" striped={false} > */}
            <thead>
              <tr>
                <th className="analytics-th">ViDA Analytics Graph for {this.state.currentPlot}</th>
                <th>Available Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <LoadingButton currentLength="2" show={this.state.showLoading} />
                  <DrawVidaAnalyticsGraph isFullScreen="false" currentPlot="Port Mapping" stopLoading={this.stopLoading} height='260' width='540' queryToRun={this.state.plotDataSelected} />
                </td>
                <td class="" >
                  <div class="">
                    {/* <div className="btn-group">
                      <select className="vida-analytics-selector" value={this.state.value} onChange={this.vidaAnalyticsSelector}>
                        <option value="Port Mapping">Port Mapping</option>
                        <option value="IP Mapping">IP Mapping</option>
                      </select>
                    </div> */}
                    <div class="clr-form-control">
                      {/* <label for="select-full" class="clr-control-label">Basic select</label> */}
                      <div class="clr-control-container float-right">
                        <div class="clr-select-wrapper">
                          <select id="select-full" class="clr-select" className="vida-analytics-selector" value={this.state.value} onChange={this.vidaAnalyticsSelector}>
                            <option value="Port Mapping">Port Mapping</option>
                            <option value="IP Mapping">IP Mapping</option>
                          </select>
                          {/* <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon> */}
                        </div>
                        {/* <span class="clr-subtext">Helper Text</span> */}
                      </div>
                    </div>

                    <div>

                      {/* <Button className="vida-analytics-button" onClick={() => this.setState({ modalReportShow: true, showLoadingModal: true })}>Get Analysis Report</Button> */}
                      {/* <Modal dialogClassName="report-graph" show={this.state.modalReportShow} onHide={() => this.setState({ modalReportShow: false, })}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            ViDA Analysis Report
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <VidaAnalysisReport height='760' width='500' queryToRun={this.state.plotDataSelected} />
                        </Modal.Body>
                      </Modal> */}
                      <button class="btn btn-primary btn-sm" onClick={() => document.getElementById('report-graph1').style.display = 'block'}>Get Analysis Report</button>
                      <div class="modal" dialogClassName="report-graph" id="report-graph1" show={this.state.modalReportShow} onHide={() => this.setState({ modalReportShow: false, })}>
                        <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title">ViDA Analysis Report</h3>
                              <button aria-label="Close" class="close" type="button" onClick={() => document.getElementById('report-graph1').style.display = 'none'}>
                                <img src="/times-line.svg" width="36px" height="25px" class="text-white" alt="Close" />
                              </button>

                            </div>
                            <div class="modal-body">
                              <VidaAnalysisReport height='760' width='500' queryToRun={this.state.plotDataSelected} />
                            </div>
                            {/* <div class="modal-footer">
                                      <button class="btn btn-outline" type="button" onClick={() => this.setState({ modalReportShow: false, })}>Cancel</button>
                                      <button class="btn btn-primary" type="button">Ok</button>
                                  </div> */}
                          </div>
                        </div>
                      </div>
                      {/* <div class="modal-backdrop" aria-hidden="true"></div> */}
                    </div>
                    <div>
                      {/* <Button class="btn btn-primary btn-sm" className="vida-analytics-button" onClick={() => this.setState({ modalPlotShow: true, showLoadingModal: true })}>&nbsp;Full View Plotting &nbsp;</Button>
                      <Modal dialogClassName="report-graph" show={this.state.modalPlotShow} onHide={() => this.setState({ modalPlotShow: false, })}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            ViDA Analytics Full View of {this.state.currentPlot}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                          <DrawVidaAnalyticsGraph currentPlot="Port Mapping" stopLoading={this.stopLoadingInModal} height='760' width='960' queryToRun={this.state.plotDataSelected} />
                        </Modal.Body>
                      </Modal> */}
                      <button class="btn btn-primary btn-sm" onClick={() => document.getElementById('report-graph2').style.display = 'block'}>Full View Plotting</button>
                      <div class="modal" dialogClassName="report-graph" id="report-graph2" show={this.state.modalPlotShow} onHide={() => this.setState({ modalPlotShow: false, })}>
                        <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title">ViDA Analytics Full View of {this.state.currentPlot}</h3>
                              <button aria-label="Close" class="close" type="button" onClick={() => document.getElementById('report-graph2').style.display = 'none'}>
                                <img src="/times-line.svg" width="36px" height="25px" class="text-white" alt="Close" />
                              </button>

                            </div>
                            <div class="modal-body">
                              <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                              <DrawVidaAnalyticsGraph isFullScreen="true" currentPlot="Port Mapping" stopLoading={this.stopLoadingInModal} height='760' width='960' queryToRun={this.state.plotDataSelected} />
                            </div>
                            <div class="modal-footer">
                              <button class="btn btn-outline" type="button" >Cancel</button>
                              <button class="btn btn-primary" type="button" onClick={() => document.getElementById('report-graph2').style.display = 'block'}>Ok</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="modal-backdrop" aria-hidden="true"></div> */}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>)
      }
      else {
        return (
          <table class="table table-compact" response="md" >
            {/* <Table bordered={false} hover={false} response="md" striped={false} > */}
            <thead>
              <tr>
                <th className="analytics-th">ViDA Analytics Graph for {this.state.currentPlot}</th>
                <th>Available Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <LoadingButton currentLength="2" show={this.state.showLoading} />
                  <DrawVidaAnalyticsGraph isFullScreen="false" currentPlot="IP Mapping" stopLoading={this.stopLoading} height='260' width='540' queryToRun={this.state.plotDataSelected} />
                </td>
                <td>
                  <div class="colBorder">
                    <div className="btn-group" class="float-right">
                      <select className="vida-analytics-selector" value={this.state.value} onChange={this.vidaAnalyticsSelector}>
                        <option value="Port Mapping">Port Mapping</option>
                        <option value="IP Mapping">IP Mapping</option>
                      </select>
                    </div>
                    <div>
                      <button className="vida-analytics-button" onClick={() => document.getElementById('report-graph3').style.display = 'block'}>Get Analysis Report</button>
                      <div class="modal" dialogClassName="report-graph" id="report-graph3" show={this.state.modalReportShow} onHide={() => this.setState({ modalReportShow: false, })} >
                        <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title">ViDA Analysis Report</h3>
                              <button aria-label="Close" class="close" type="button" onClick={() => document.getElementById('report-graph3').style.display = 'none'}>
                                {/* <clr-icon aria-hidden="true" shape="close"></clr-icon> */}
                                <img src="/times-line.svg" width="36px" height="25px" class="text-white" alt="Close" />
                              </button>

                            </div>
                            <div class="modal-body">
                              <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                              <VidaAnalysisReport height='760' width='500' queryToRun={this.state.plotDataSelected} stopLoading={this.stopLoadingInModal} />
                            </div>
                            {/* <div class="modal-footer">
                                <button class="btn btn-outline" type="button" onClick={() => this.setState({ modalReportShow: false, })}>Cancel</button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* <Button className="vida-analytics-button" onClick={() => this.setState({ modalPlotShow: true, showLoadingModal: true })}>&nbsp;Full View Plotting &nbsp;</Button> */}
                      {/* <Modal dialogClassName="report-graph" show={this.state.modalPlotShow} onHide={() => this.setState({ modalPlotShow: false, })}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          ViDA Analytics Full View of {this.state.currentPlot}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                        <DrawVidaAnalyticsGraph currentPlot="IP Mapping" stopLoading={this.stopLoadingInModal} height='760' width='960' queryToRun={this.state.plotDataSelected} />
                      </Modal.Body>
                    </Modal> */}
                      <button className="vida-analytics-button" onClick={() => document.getElementById('report-graph4').style.display = 'block'}>&nbsp;Full View Plotting &nbsp;</button>
                      <div class="modal" dialogClassName="report-graph" id="report-graph4" show={this.state.modalPlotShow} onHide={() => this.setState({ modalPlotShow: false, })} >
                        <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title">ViDA Analytics Full View of {this.state.currentPlot}</h3>
                              {/* <button aria-label="Close" class="close" type="button" onClick={() => this.setState({ modalReportShow: false, })}> */}
                              <button aria-label="Close" class="close" type="button" onClick={() => document.getElementById('report-graph4').style.display = 'none'}>
                                <img src="/times-line.svg" width="36px" height="25px" class="text-white" alt="Close" />
                              </button>
                            </div>
                            <div class="modal-body">
                              <LoadingButton currentLength="2" show={this.state.showLoadingModal} />
                              <DrawVidaAnalyticsGraph isFullScreen="true" currentPlot="IP Mapping" stopLoading={this.stopLoadingInModal} queryToRun={this.state.plotDataSelected} />
                            </div>
                            {/* <div class="modal-footer">
                                <button class="btn btn-outline" type="button" onClick={() => this.setState({ modalReportShow: false, })}>Cancel</button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>)
      }
    }
  }
}


class PlotlyGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAxis: {
        'CPU_USED_PCT': [],
        'MEM_INUSE_PCT': [],
        'MEM_INUSE_MB': [],
        'MEMSIZE_MB': [],
        'SWAPMEM_INUSE_PCT': [],
        'NETWORK_IN_KB': [],
        'NETWORK_OUT_KB': [],
        'NETWORK_TOTAL_KB': [],
        'DISK_READ_KB': [],
        'DISK_WRITE_KB': [],
        'DISK_TOTAL_KB': [],
        'IOPS': [],
        'READ_IOPS': [],
        'WRITE_IOPS': []
      },
      timeAxis: {
        'CPU_USED_PCT': [],
        'MEM_INUSE_PCT': [],
        'MEM_INUSE_MB': [],
        'MEMSIZE_MB': [],
        'SWAPMEM_INUSE_PCT': [],
        'NETWORK_IN_KB': [],
        'NETWORK_OUT_KB': [],
        'NETWORK_TOTAL_KB': [],
        'DISK_READ_KB': [],
        'DISK_WRITE_KB': [],
        'DISK_TOTAL_KB': [],
        'IOPS': [],
        'READ_IOPS': [],
        'WRITE_IOPS': []
      },
      subPlots: ['CPU_USED_PCT',
        'MEM_INUSE_PCT',
        'MEM_INUSE_MB',
        'MEMSIZE_MB',
        'SWAPMEM_INUSE_PCT',
        'NETWORK_IN_KB',
        'NETWORK_OUT_KB',
        'NETWORK_TOTAL_KB',
        'DISK_READ_KB',
        'DISK_WRITE_KB',
        'DISK_TOTAL_KB',
        'IOPS',
        'READ_IOPS',
        'WRITE_IOPS'
      ],
      plotSelected: 'CPU_USED_PCT',
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const differentApp = this.props.appSelected !== nextProps.appSelected;
    const differentPlot = this.state.plotSelected !== nextState.plotSelected;
    const stateChangedForTime = this.state.timeAxis[this.state.plotSelected].join() !== nextState.timeAxis[this.state.plotSelected].join()
    const stateChangedForData = this.state.dataAxis[this.state.plotSelected].join() !== nextState.dataAxis[this.state.plotSelected].join()
    console.log(this.props, ":", nextProps)
    console.log(differentApp)
    console.log(stateChangedForTime, stateChangedForData, differentPlot)
    return differentApp || stateChangedForData || stateChangedForTime || differentPlot;
  }
  static getDerivedStateFromProps(props, state) {
    if (props.plotSelected !== state.plotSelected) {
      return {
        plotSelected: props.plotSelected,
      }
    }
  }
  runAxiosToGetUtilization = (e) => {
    var dataAxis = {
      'CPU_USED_PCT': [],
      'MEM_INUSE_PCT': [],
      'MEM_INUSE_MB': [],
      'MEMSIZE_MB': [],
      'SWAPMEM_INUSE_PCT': [],
      'NETWORK_IN_KB': [],
      'NETWORK_OUT_KB': [],
      'NETWORK_TOTAL_KB': [],
      'DISK_READ_KB': [],
      'DISK_WRITE_KB': [],
      'DISK_TOTAL_KB': [],
      'IOPS': [],
      'READ_IOPS': [],
      'WRITE_IOPS': []
    }
    var timeAxis = {
      'CPU_USED_PCT': [],
      'MEM_INUSE_PCT': [],
      'MEM_INUSE_MB': [],
      'MEMSIZE_MB': [],
      'SWAPMEM_INUSE_PCT': [],
      'NETWORK_IN_KB': [],
      'NETWORK_OUT_KB': [],
      'NETWORK_TOTAL_KB': [],
      'DISK_READ_KB': [],
      'DISK_WRITE_KB': [],
      'DISK_TOTAL_KB': [],
      'IOPS': [],
      'READ_IOPS': [],
      'WRITE_IOPS': []
    }
    axios.get(API_URL + '/api/utilization?limit=1000000000&host_name=' + e.split('---')[1]).then(res => {
      res.data.results.map(
        (item, idx) => {
          if (this.state.subPlots.includes(item.lprf_columnname)) {
            timeAxis[item.lprf_columnname].push(item.valuetimestamp)
            dataAxis[item.lprf_columnname].push(item.instancevalue)
          } else {
            console.log(item.lprf_columnname + " does not exist in list subplots allowed")
          }
        }
      )
      this.setState({
        timeAxis: timeAxis,
        dataAxis: dataAxis,
      })
      console.log("TimeAxis ", this.state.timeAxis)
      console.log("DataAxis ", this.state.dataAxis)
      this.props.stopLoading()
    }).catch(err => console.log("Graph2 : ", err))
  }

  render() {
    { this.runAxiosToGetUtilization(this.props.appSelected) }
    return (
      <tr>
        <td colSpan="2">
          <Plot
            data={
              [
                {
                  x: this.state.timeAxis[this.state.plotSelected],
                  y: this.state.dataAxis[this.state.plotSelected],
                  type: 'scatter',
                  marker: { color: 'blue' }
                }
              ]
            }
            layout={{ width: 450, height: 260, margin: { l: 30, t: 30, b: 30, p: 0 }, title: this.state.plotSelected, side: 'right' }}
          />
        </td>
      </tr>
    )
  }
}
class Graph2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      appSelected: "",
      plotSelected: "CPU_USED_PCT",
      subPlots: ['CPU_USED_PCT',
        'MEM_INUSE_PCT',
        'MEM_INUSE_MB',
        'MEMSIZE_MB',
        'SWAPMEM_INUSE_PCT',
        'NETWORK_IN_KB',
        'NETWORK_OUT_KB',
        'NETWORK_TOTAL_KB',
        'DISK_READ_KB',
        'DISK_WRITE_KB',
        'DISK_TOTAL_KB',
        'IOPS',
        'READ_IOPS',
        'WRITE_IOPS'
      ],
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.appSelected !== state.appSelected) {
      return {
        appSelected: props.appSelected,
        showLoading: true,
      }
    }
  }
  stopLoading = () => {
    this.setState({
      showLoading: false,
    })
  }
  onSelectingAPlot = (e) => {
    console.log("eeeeeeeeeeeeeeee::", e)
    this.setState({
      plotSelected: e['label']
    })
  }
  onChanegeAPlot = (e) => {
    console.log("selected value::", e.target.value)
    // this.subPlotOption(e.target.value)
    this.setState({
      // this.setState({value: event.target.value});
      plotSelected: e.target.value
    })
  }
  subPlotOption = (v) => {
    console.log("vvvvvvvvvvvvvvvv::", v)
    return { value: v, label: v }
  }
  render() {
    if (this.props.appSelected === "") {
      return (
        // <div class="content-area">
        <div class="alert alert-info pd-0" role="alert">
          <div class="alert-items">
            <div class="alert-item static">
              <div class="alert-icon-wrapper">
                <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
              </div>
              <span class="alert-text text-center">
                <strong>Search and Select a specific row radio button.</strong>
                <i> Select any row!!!</i>
              </span>
            </div>
          </div>
        </div>
        // </div>
      )
    } else {
      return (
        <table class="table table-compact" response="md" >
          {/* <Table> bordered={false} hover={false} response="md" striped={false} > */}
          <thead>
            <tr><th>Utilization Dashboard {this.props.appSelected.split('---')[1]}</th>
              <th>
                {/* <Select className="plot-select" placeholder="Select Plot Type..." defaultValue={this.state.plotSelected}
                options={this.state.subPlots.map(v => this.subPlotOption(v))} onChange={this.onSelectingAPlot} />
               */}
                <div class="clr-select-wrapper">
                  <select id="select-basic" class="clr-select" placeholder="Select Plot Type..." defaultValue={this.state.plotSelected} onChange={this.onChanegeAPlot} value={this.state.value}>
                    {this.state.subPlots.map((v, index) => {
                      console.log("index:::", v, index);
                      return (<option value={v}>{v}</option>)
                    })}
                  </select>
                </div>

              </th>
            </tr>
          </thead>
          <tbody>
            <LoadingButton currentLength="1" show={this.state.showLoading} />
            <PlotlyGraph plotSelected={this.state.plotSelected} stopLoading={this.stopLoading} appSelected={this.props.appSelected} />
          </tbody>
        </table>
      )
    }

  }
}

class QueryOutput extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan={this.props.colLength}>{this.props.text !== "" ? "Query: " + this.props.text : ""}</td>
      </tr>
    )
  }
}

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: analyticsData,
      currentPage: 1,
      todosPerPage: 5,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: 'disabled',
      isNextBtnActive: '',
      pageBound: 3
    };
    // this.setState({
    //   todos: analyticsData
    // });
    console.log("todos::", this.state.todos);
    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
  }
  getDataRowSelected = (e) => {
    console.log("Radio Selected : " + e);
    console.log("Radio Id Selected : " + e.target.id);
    this.props.getDataRowSelected(e.target.id);
  }
  componentDidUpdate() {
    // juery("ul li.active").removeClass('active');
    // jQuery('ul li#'+this.state.currentPage).addClass('active');
  }
  handleClick(event) {
    let listid = Number(event.target.id);
    this.setState({
      currentPage: listid
    });
    // jQuery("ul li.active").removeClass('active');
    // jQuery('ul li#'+listid).addClass('active');
    this.setPrevAndNextBtnClass(listid);
  }
  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
    this.setState({ isNextBtnActive: 'disabled' });
    this.setState({ isPrevBtnActive: 'disabled' });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: '' });
    }
    else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
    }
    else if (totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
      this.setState({ isPrevBtnActive: '' });
    }
  }
  btnIncrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnDecrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
    if ((this.state.currentPage + 1) > this.state.upperPageBound) {
      this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  render() {
    const { todos, currentPage, todosPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
      return <tr>
        <td key={"radio-" + index} id={index}><Form.Check type="radio" id="check-api-radio"><Form.Check.Input onChange={this.getDataRowSelected} name="server-radio" id={todo["id"]} type="radio" isValid /></Form.Check></td><td key={index}>{todo.APP_NAME}</td><td key={index}>{todo.Source_IP}</td><td key={index}>{todo.Source_HOST}</td><td key={index}>{todo.Dest_IP}</td><td key={index}>{todo.Dest_HOST}</td></tr>;
    });
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
        )
      }
      else if ((number < upperPageBound + 1) && number > lowerPageBound) {
        return (
          <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
        )
      }
    });
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
    }
    let renderPrevBtn = null;
    if (isPrevBtnActive === 'disabled') {
      renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
    }
    else {
      renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
    }
    let renderNextBtn = null;
    if (isNextBtnActive === 'disabled') {
      renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
    }
    else {
      renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
    }
    return (
      <div>
        <table class="table table-compact">
          <thead>
            <tr>
              <th>SELECT</th>
              <th>APPLICATION NAME</th>
              <th>SOURCE IP</th>
              <th>SOURCE HOST</th>
              <th>DESTINATION IP</th>
              <th>DESTINATION HOST</th>
            </tr>
          </thead>
          <tbody>
            {renderTodos}
          </tbody>
        </table>
        <ul className="pagination">
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </ul>
      </div>
    );
  }
}



//Pagination Logic for ViDA Analytics -- Added by NikhilS

class AnalyticsPagination extends React.Component {
  uniqueArray = (a) => {
    console.log("Pagination Value for a : ", a);
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j] || a[j] <= 0 || a[j] > this.props.totalPages)
          a.splice(j--, 1);
      }
    }

    return a;
  };
  showPages = () => {
    var page = 0
    var pagenationItems = []
    var initialPages = [1, 2, 3, 4, 5]
    var middleNumber = Math.round(this.props.totalPages / 2)
    var middlePages = [middleNumber - 2, middleNumber - 1, middleNumber, middleNumber + 1, middleNumber + 2]
    console.log("Middle Number: ", middlePages)
    var finalPages = [this.props.totalPages - 4, this.props.totalPages - 3, this.props.totalPages - 2, this.props.totalPages - 1, this.props.totalPages]
    if (this.props.totalPages !== 1) {
      if (this.props.totalPages <= 10) {
        while (page < this.props.totalPages) {
          page = page + 1
          pagenationItems.push(<PageItem active={(page === this.props.currentPage ? true : false)}>{page}</PageItem>)
        }
      } else {
        if (initialPages[initialPages.length - 1] >= middlePages[0] && middlePages[middlePages.length - 1] >= finalPages[0]) {
          while (page < this.props.totalPages) {
            page = page + 1
            pagenationItems.push(<PageItem active={(page === this.props.currentPage ? true : false)}>{page}</PageItem>)
          }
        } else if (initialPages[initialPages.length - 1] >= middlePages[0]) {
          initialPages = this.uniqueArray(initialPages.concat(middlePages))
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              console.log("final Pages ", item, idx)
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        } else if (middlePages[middlePages.length - 1] >= finalPages[0]) {
          finalPages = this.uniqueArray(finalPages.concat(middlePages)).sort()
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        } else {
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          if (!initialPages.includes(this.props.currentPage) && !finalPages.includes(this.props.currentPage)) middlePages = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2]
          middlePages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        }
      }
    }
    return [pagenationItems]
  }
  pageChanged = (e) => {
    console.log(e.target.text)
    this.props.onPagePress(e.target.text)
  }
  render() {
    return (
      <Pagination onClick={this.pageChanged}>
        {this.showPages()}
      </Pagination>
    )
  }
}



class PaginationRow extends React.Component {
  uniqueArray = (a) => {
    console.log("Pagination Value for a : ", a);
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j] || a[j] <= 0 || a[j] > this.props.totalPages)
          a.splice(j--, 1);
      }
    }

    return a;
  };
  showPages = () => {
    var page = 0
    var pagenationItems = []
    var initialPages = [1, 2, 3, 4, 5]
    var middleNumber = Math.round(this.props.totalPages / 2)
    var middlePages = [middleNumber - 2, middleNumber - 1, middleNumber, middleNumber + 1, middleNumber + 2]
    console.log("Middle Number: ", middlePages)
    var finalPages = [this.props.totalPages - 4, this.props.totalPages - 3, this.props.totalPages - 2, this.props.totalPages - 1, this.props.totalPages]
    if (this.props.totalPages !== 1) {
      if (this.props.totalPages <= 10) {
        while (page < this.props.totalPages) {
          page = page + 1
          pagenationItems.push(<PageItem active={(page === this.props.currentPage ? true : false)}>{page}</PageItem>)
        }
      } else {
        if (initialPages[initialPages.length - 1] >= middlePages[0] && middlePages[middlePages.length - 1] >= finalPages[0]) {
          while (page < this.props.totalPages) {
            page = page + 1
            pagenationItems.push(<PageItem active={(page === this.props.currentPage ? true : false)}>{page}</PageItem>)
          }
        } else if (initialPages[initialPages.length - 1] >= middlePages[0]) {
          initialPages = this.uniqueArray(initialPages.concat(middlePages))
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              console.log("final Pages ", item, idx)
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        } else if (middlePages[middlePages.length - 1] >= finalPages[0]) {
          finalPages = this.uniqueArray(finalPages.concat(middlePages)).sort()
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        } else {
          initialPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          if (!initialPages.includes(this.props.currentPage) && !finalPages.includes(this.props.currentPage)) middlePages = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2]
          middlePages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
          pagenationItems.push(<Pagination.Ellipsis />)
          finalPages.map(
            (item, idx) => {
              pagenationItems.push(<PageItem active={(item === this.props.currentPage ? true : false)}>{item}</PageItem>)
            }
          )
        }
      }
    }
    return [pagenationItems]
  }
  pageChanged = (e) => {
    console.log(e.target.text)
    this.props.onPagePress(e.target.text)
  }
  render() {
    return (
      <Pagination onClick={this.pageChanged}>
        {this.showPages()}
      </Pagination>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errorMessage: '',
      successMessage:'',
      errorCreate: 0,
      sstatus: [],
      ip: '',
      username: '',
      password: '',
      os: '',
      module: '',
      create: 1,
      q: 1,
      currentHeadersInstance: fieldforInstance[1],
      moduleHeaderInstance: '',
      showmodule: "1",
      showmoduletatus: "2",
      sudo: false,
      showreport: "1",
      result: [],
      status: [],
      currentTab: 0,
      users: "",
      currentHeaders: fieldsForHeader[5],
      currentApi: apiPerHeader[0],
      rowClickApi: "/servers",
      dataList: [],
      datalistStatus: [],
      currentPage: 1,
      totalPages: 1,
      timeTaken: 0,
      resultCount: 0,
      queryToRun: "",
      showAlert: false,
      navItemSelected: 3,
      appSelected: "",
      affinityPort: [],
      affinityApp: [],
      affinitySSLOnly: false,
      showLoading: false,
      value: "",
      target1: "",
      instanceData: [],
      flag: "",
      attributeForm: [],
      attributeForm1: "",
      metricsAttribute: performanceVidaMetrics[1],
      //Vida Analytics Attributes -- Added by NikhilS
      plotDataSelected: "",
      currentPlot: "Port Mapping",
      vidaAnalytics: 0,
      analyticsHeaders: vidaAnalyticsHeaders[0],
      analyticsDataList: [],
      analyticsCurrentPage: 1,
      analyticsResultCount: 0,
      analyticsTotalPages: 1,
      analyticsTimeTaken: 0,
      instance_inventery_report:"",
    }
  }

  populateVidaAnalyticsData = () => {
    //Fetch the analyticsData
    var start = Date.now()
    var analyticsTimeTaken = 0;
    console.log("Inside populate Vida Analytics Data function!!!!");
    console.log("Curent analyticsDataList : ", this.state.analyticsDataList);
    console.log("Analytics Data :", analyticsData);
    console.log("Analytics Time Take : ", this.state.analyticsTimeTaken);
    try {
      var showAlert = false;
      console.log(start, analyticsTimeTaken)
      console.log(analyticsData.length)
      if (analyticsData.length === 0) {
        console.log("Results null for ViDA Analytics!");
        showAlert = true
      }
      const resultsPerPage = 10;
      const resultsCount = analyticsData.length;
      const resultsCurrentPage = 1;
      const resultsTotalPages = Math.ceil(resultsCount / resultsPerPage)
      analyticsTimeTaken = Date.now() - start;
      if ((this.state.analyticsResultCount !== resultsCount) && resultsCount !== 0) {
        console.log("I am Inside, updating state!!")
        this.setState({
          analyticsDataList: analyticsData,
          analyticsResultCount: resultsCount,
          analyticsTotalPages: resultsTotalPages,
          analyticsCurrentPage: resultsCurrentPage,
          analyticsTimeTaken: analyticsTimeTaken,
          showAlert: showAlert,
          showLoading: false
        })
      }
      console.log("After update Analytics Time Taken : ", this.state.analyticsTimeTaken);
      console.log("Analytics Result Count : ", this.state.analyticsResultCount);
    }
    catch (err) {
      console.log("Error Encountered!\nMessage: ", err)
      analyticsTimeTaken = Date.now() - start;
      this.setState({
        analyticsResultCount: 0,
        analyticsTimeTaken: analyticsTimeTaken,
        showLoading: false,
      })
    }
  }



  runSearchQuery = (apiToCall, queryToRun) => {
    const complete_path = API_URL + "/api" + apiToCall.concat("?", queryToRun)
    console.log(complete_path)
    var start = Date.now()
    this.setState({ showLoading: true, totalPages: 1, dataList: [], }, () => {
      axios.get(complete_path).then(res => {
        let timeTaken = Date.now() - start;
        var showAlert = false;
        console.log(JSON.stringify(res));
        console.log(start, timeTaken)
        console.log(res.data.results.length)
        if (res.data.results.length === 0) {
          console.log("Result null for: " + queryToRun);
          showAlert = true
        }
        this.setState({
          dataList: res.data.results,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPageNumber,
          resultCount: res.data.count,
          timeTaken: timeTaken,
          showAlert: showAlert,
          showLoading: false,
        })
      }).catch(err => {
        console.log(err)
        let timeTaken = Date.now() - start;
        this.setState({
          resultCount: 0,
          timeTaken: timeTaken,
          showLoading: false,
        })
      })
    })
  }


  makeQuery = (callbackfunction) => {
    var myQueryToRun = ""
    Object.keys(this.state).map(
      (query, idx) => {
        if (query.includes('_query')) {
          if (this.state.currentHeaders.includes(query.replace("_query", ""))) myQueryToRun = myQueryToRun + (myQueryToRun === "" ? "" : "&") + query.replace("_query", "") + "=" + this.state[query]
        }
      }
    )
    this.setState({ queryToRun: myQueryToRun, }, () => {
      callbackfunction(this.state.currentApi, this.state.queryToRun)
    })
  }
  onCloseAlertClick = () => {
    this.setState({
      showAlert: false,
    })
  }
  onPagePress = (e) => {
    this.runSearchQuery(this.state.currentApi, this.state.queryToRun + "&page=" + e)
  }
  handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      console.log("HandleEnterPress", e)
      this.makeQuery(this.runSearchQuery)
    }
  }
  handleKeyPress = (e) => {
    console.log(e.target.id, e.type, e.key, e.keyCode);
    this.setState({
      [e.target.id + "_query"]: e.target.value,
    })
    this.handleEnterPress(e)
  }
 
  instanceSelected = (event) =>{
    console.log(typeof event);
    console.log("E value : ",event);
    if(event==="0"){this.onCreate(event)}
    if(event==="1"){this.onGetInstance(event)}
    if(event==="2"){this.onInstanceReport(event)}
  }

  navSelected = (e) => {
    this.setState({
      currentTab: e,
      currentHeaders: fieldsForHeader[e],
      currentApi: apiPerHeader[e],
      dataList: [],
      queryToRun: "",
      instanceidd: "",
      currentPage: 1,
      totalPages: 1,
      navItemSelected: e,
      showAlert: false,
      timeTaken: 0,
      resultCount: 0,
    })
    console.log("Current Headers Value : " + this.state.currentHeaders);
  }



  getRowSelected = (e) => {
    console.log("getRowSelected", e)
    this.setState({
      appSelected: e,
    })
  }

  //Vida Analytics Code - Added by NikhilS
  getDataRowSelected = (e) => {
    console.log("Data Row Selected : " + e)
    this.setState({
      plotDataSelected: e
    })
  }


  clearResultstatus = () => {
    this.setState({

    })
  }
  clearResults = () => {
    this.setState({
      dataList: [],
      queryToRun: "",
      currentPage: 1,
      attributeForm: "",
      totalPages: 1,
      showAlert: false,
      appSelected: "",
      timeTaken: 0,
      resultCount: 0,
    })
  }


  serverFieldClicked = (server) => {
    var apiIdx = this.state.navItemSelected + 1
    var api = apiPerHeader[apiIdx]
    this.setState({
      [fieldsForHeader[apiIdx].split(',')[0] + "_query"]: server,
      currentTab: apiIdx,
      currentHeaders: fieldsForHeader[apiIdx],
      currentApi: api,
      dataList: [],
      queryToRun: "",
      currentPage: 1,
      navItemSelected: apiIdx,
    }, () => { this.makeQuery(this.runSearchQuery) }
    )
  }
  changeAffinityPortSelection = (e) => {
    this.setState({
      affinityPort: e,
    })
  }
  changeAffinityAppSelection = (e) => {
    console.log(e.target.id)
    var apps = this.state.affinityApp.slice()
    if (apps.includes(e.target.id)) {
      apps.splice(apps.indexOf(e.target.id), 1)
    } else {
      apps.push(e.target.id)
    }
    this.setState({
      affinityApp: apps,
    })
  }
  changeAffinitySSLSelection = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      this.setState({
        affinitySSLOnly: true,
      })
    } else {
      this.setState({
        affinitySSLOnly: false,
      })
    }
  }


  sudochange = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      this.setState({
        sudo: true,
      })
    } else {
      this.setState({
        sudo: false,
      })
    }
  }
  handleChange = (e) => {
    this.setState({ ip: e.target.value });
  }
  handleusernameChange = (e) => {
    this.setState({ username: e.target.value });
  }
  handleos = (e) => {
    this.setState({ os: e.target.value });
  }
  handlepasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = async event => {
    event.preventDefault();
    event.persist();
    var ipList = this.state.ip;

    const { ip } = this.state;
    const { username } = this.state;
    const { password } = this.state;
    const { os } = this.state;
    const { sudo } = this.state;
    console.log("form");
    console.log(sudo.toString());
    console.log(password);
    console.log(ip.replace(/[\r\n]/g, ''));
    let a = []
    this.serverRequest = axios
      .get(API_URL + "/api/instance", {
        params: {
          ip: ip,
          username: username,
          password: password,
          os: os
        }
      })
      .then((response) => {
        console.log(response.data['packages']);
        this.setState({
          users: response.data['packages']
          //users : a
        });
      }).catch(function (error) {
      });


  }


  onCreate = async event => {

    this.setState({
      create: 1
    });

  }

  onInstanceReport = async event => {

    this.state.attributeForm = "";
    this.state.results = "";
    //event.preventDefault();
    //event.persist();
    console.log("currenttab")
    console.log(this.state.currentTab)

    var start = Date.now()
    this.setState({ create: 3, currentHeadersInstance: fieldforInstance[0], showLoading: true, totalPages: 1, dataList: [], }, () => {
      axios.get(API_URL + "/api/instances").then(res => {
        let timeTaken = Date.now() - start;
        var showAlert = false;
        console.log(res); console.log(start, timeTaken)
        console.log(res.data.results.length)
        if (res.data.results.length === 0) { showAlert = true }
        this.setState({
          create: 3,
          showmodule: "1",
          message: "",
          showmodulestatus: "1",
          dataList: res.data.results,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPageNumber,
          resultCount: res.data.count,
          timeTaken: timeTaken,
          showAlert: showAlert,
          showLoading: false,
        })
      }).catch(err => {
        console.log(err)
        let timeTaken = Date.now() - start;
        this.setState({
          resultCount: 0,
          timeTaken: timeTaken,
          showLoading: false,
        })
      })
    })



    console.log("Instance report")
  }

  /////////////////////To generate Random Instance Id/////////////////////////////
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSub = async event => {
    
    this.state.results = "";
    
    //Logic to accept NewLine Ip's
    var final = this.state.ip;
    var flag = "space";
    var strLen = final.length;
    var errMsg="";
    var errFlag=0;
    
    for(var i=0;i<strLen;i++)
    {
      if(final[i]===",")
      {
        flag="comma";
        break;
      }
    }
    var ipValue = "";
    var objLength = final.split("\n");
    console.log("No. of Objects : ", objLength.length);
    if(flag==="space")
    {
      final.split("\n").map((item ,index)=>{
        if(objLength.length-1 !== index)
        {
          if(item!=="")
          {
            ipValue += item + ",";
          }  
        }
        else
        {
          if(item!=="")
          {
           ipValue += item
          }
          else
          {
            var newValue = ipValue.slice(0,-1);
            ipValue=newValue;
          }
        }
        return 1;
      });
    }
    else
    {
      ipValue = final
    }

    const  ip  = ipValue;
    const { username } = this.state;
    const { password } = this.state;
    const { os } = this.state;
    const { sudo } = this.state;
    if (ip.includes('\n')) { ip = ip.replace(/[\r\n]/g, ','); }
    if (ip.includes('\s')) { ip = ip.replace(/\s+/g, ','); }



    if (ip == null || ip == "") {

      //alert("Please enter Server IP");
      event.preventDefault();
      errFlag=1;
      errMsg="Please enter Server IP";
      //return;
    }
    else if (username == null || username == "") {

      //alert("Please enter User Id");
      event.preventDefault();
      errFlag=2;
      errMsg="Please enter User Id";
     // return;
    }
    else if (password == null || password == "") {

      //alert("Please enter Password");
      errFlag=3;
      event.preventDefault();
      errMsg="Please enter Password";
      //return;
    }
    else if (os == null || os == "" || os == "Select OS") {

      //alert("Please select OS");
      event.preventDefault();
      errFlag=4;
      errMsg="Please select OS";
      
     // return;
    }
    else{
      errFlag=0;
      errMsg="";
    }

    console.log("errFlag:errMsg=-out=>",errFlag,":",errMsg);
    // console.log("form");
    // console.log(sudo.toString());
    // console.log(ip);
    // console.log(sudo);
    // console.log(this.makeid(5));
    if(errFlag===0){
          console.log("errFlag:errMsg=-IN=>",errFlag,":",errMsg);
        this.serverRequest = axios
          .post(API_URL + "/api/createinstances/",
            {
              instanceid: this.makeid(5),
              server_ip: ip,
              username: username,
              password: password,
              os: os,
              status: "In queue",
              sudo: sudo
            }
          )
          .then((response) => {
            console.log(response.data);
              // alert("Instance added Successfully. Refer Get Instance Status for more details...");
              this.setState({
                create:0,
                errorCreate:5,
                errorMessage:"",
                successMessage:"Instance added Successfully. Refer Get Instance Status for more details..."
             });
          }).catch(function (error) {
            console.log(error);
            // alert("Error Occurred, Please try in sometime!!");
                errMsg="Error Occurred, Please try in sometime!!";
                this.setState({
                  create:0,
                  errorCreate:6,
                  errorMessage:errMsg
                });
          });
          
          this.setState({create:0})
      
    } 
    else if(errFlag > 0){
      this.setState({
        create: 1,
        errorCreate:errFlag,
        errorMessage:errMsg
      });
    }
  }

  onBack = async event => {
    this.setState({
      create: 0
    });
  }


  //Index for selecting vida Affinity Graph
  selectAffinityGraph = () => {
    this.setState({
      vidaAnalytics: 1
    });
  }

  selectVidaPlotting = () => {
    this.setState({
      vidaAnalytics: 2
    });
  }
  selectNetworkAnalysis = () => {
    this.setState({
      vidaAnalytics: 3
    })
  }


  handleChangeserverIP = (e) => {
    this.setState({ ip: e.target.value });
  }
  handleBlur = (e) => {
    if(e.target.value !==""){
      this.setState({ errorCreate: 0 });
    } 
  }
  
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  }
  handleOptionChange = (e) => {
    this.setState({
      os: e.target.value
    });
    console.log(e.target.value);
  }

  ///////////////////////////////To Fetch Instance Report////////////////////////////////////
  generateData = (data) => {
    const newData = Object.keys(data).reduce((result, currentKey) => {
      if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {
        console.log(currentKey)
        //const elementToPush = generateElement(currentKey, data[currentKey]);
        result.push("a");
      }
      return result;
    }, []);
    return newData;
  }
  handleModuleChange = (e) => {
    // console.log(serverstatus[1]);
    const a = e.target.value
    const mod = performanceVidaMetrics[parseInt(e.target.value)]
    console.log("Inventory")
     
    console.log(a)
    this.setState({ datalistStatus: [], module: a }, () => {
      axios.get(API_URL + "/api/instancejson", { params: { instanceid: this.state.instanceid, inventory: a } }).then(res => {
        let a = res.data
        //Logic by Venkata
        console.log("AAAAAAAAAAAAAA:::",a.length);
        if(a.length>0)
        {
         //a=JSON.parse(JSON.stringify(a));
         //a=JSON.parse(a);
         console.log("output type");
         console.log(typeof (a));
         console.log(a);
         let ss = ""

         let b = a[0];
         console.log(a);

         b = Object.keys(b);
         console.log(b);
         ss = b.toString();
         console.log("String")
         console.log(ss);

         this.setState({
          //attributeForm : response.data.results[0].status
          showreport: "2",
          datalistStatus: a,
          moduleHeaderInstance: ss,
          instance_inventery_report:"1"
         })
        }else{
          console.log("AAAAAAAAAAAAAA-catch:::",a.length);
          this.setState({
            //attributeForm : response.data.results[0].status
            showreport: "2",
            // datalistStatus: a,
            // moduleHeaderInstance: ss,
            instance_inventery_report:"0"
          })
        }
      })
    })





    console.log(e.target.value);
    console.log(this.state.instanceid);
    console.log(this.state.moduleHeaderInstance);
  }


  ////////////////////////INSTANCE REPORT DROPDOWN/////////////////////////////////////
  handleVidaMetricsChange = (e) => {
    this.setState({
      moduleHeaderInstance: performanceVidaMetrics[parseInt(e.target.value)],
      showreportt: "2"
    })
    console.log(e.target.value);
    console.log(this.state.metricsAttribute);
  }

  onGetInstance = async event => {
    this.state.attributeForm = "";
    this.state.results = "";
    //event.preventDefault();
    //event.persist();
    console.log("currenttab")
    console.log(this.state.currentTab)
    /*this.serverRequest=axios.get(API_URL+"/api/instances")  .then((response) => {
      console.log(response.data.results);
      this.setState({
        result : response.data.results,
        create : false
                  });
    })*/
    var start = Date.now()
    this.setState({ create: 2, currentHeadersInstance: fieldforInstance[this.state.q], showLoading: true, totalPages: 1, dataList: [], }, () => {
      axios.get(API_URL + "/api/instances").then(res => {
        let timeTaken = Date.now() - start;
        var showAlert = false;
        console.log(res);
        console.log(start, timeTaken)
        console.log(res.data.results.length)
        if (res.data.results.length === 0) { showAlert = true }
        this.setState({
          create: 2,
          showmodule: "1",
          dataList: res.data.results,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPageNumber,
          resultCount: res.data.count,
          timeTaken: timeTaken,
          showAlert: showAlert,
          showLoading: false,
        })
      }).catch(err => {
        console.log(err)
        let timeTaken = Date.now() - start;
        this.setState({
          resultCount: 0,
          timeTaken: timeTaken,
          showLoading: false,
        })
      })
    })

  }
  handleCreate = (e) => {
    this.setState({
      create: e.target.value
    });
    console.log(e.target.value);
  }


  ////////////////////To Get Inventory Details Of a particular Instance/////////////////////////

  hideMessage = () =>{
    this.setState({instance_inventery_report:""})
  }



  getRowSelectedInstances = (e) => {
    let a = ""
    let osst = ""
    this.state.showmodule = "1"
    this.state.showreport = "1"
    this.serverRequest = axios
      .get(API_URL + "/api/instances", {
        params: {
          instanceid: e
        }
      })
      .then((response) => {
        a = response.data.results[0].status;
        osst = response.data.results[0].os;
        console.log(osst);


        if (a.includes("Completed")) {
          let messag = "Inventory report generated for the instance"
          let os1 = ""
          if (osst.includes("Windows")) {
            os1 = "1"
            console.log(os1);
          }
          else {
            os1 = "2"
            console.log(os1);
          }

          this.setState({
            showmodule: "2",
            showmodulestatus: "3",
            osfinal: os1,
            message: messag,
            instanceid: e
          });
        }
        else {
          let messag = ""
          if (a.includes("queue")) {
            messag = "Instance is in queue"
          }
          else if (a.includes("Issues")) {
            messag = "Issues in scanning instance so report not generated"
          }
          else {
            messag = "Instance is under scanning"
          }
          this.setState({
            showmoduletatus: "3",
            message: messag,
            showmodule: "1"
          })
        }
      }).catch(function (error) {
      });
  }
  reDirect = () => {
    console.log("Redirect URL : ", sessionStorage.getItem("_dcURL") + "/landing?status=Transfer&token=" + sessionStorage.getItem("token"));
    window.location.href = sessionStorage.getItem("_dcURL") + "/landing?status=Transfer&token=" + sessionStorage.getItem("token");
  }

  render() {

    //style for table tabs 
    const tabWidth = {
      width: "150px",
      color: '#A9A9A9'
    };

    const extraTabWidth = {
      width: "550px",
      color: '#A9A9A9'
    };

    var keys = [];

    return (

      <div class="main-container">
        <header class="header header-6" id="header">
          <div className="branding" id="branding">
            <a href="#" classe="nav-link ">
              <img src="/logo.png" id="logo" alt="ViDA" class="ml-2" />
              <span className="title ml-10"> Delivery Curator - ViDA</span>
            </a>
          </div>
          <div class="float-r ml-auto mr-1">
            <a class="nav-link" onClick={this.reDirect} >
              <img src="/logo.png" title="Back to DC" alt="Back to Dc" class="mb-1 logo1" />
            </a>
          </div>
          <div class="float-r mr-1">
            <NavigationBar key="Nav" navItemSelected={this.state.navItemSelected} navSelected={this.navSelected} instanceSelected={this.instanceSelected}/>
          </div>
          <div class="float-r mr-1">
            <NavigationBarUserGuide key="Nav" />
          </div>
         </header>
     
        <div className="content-container">
          <div className="content-area">   
          {
             this.state.create === 0 &&
             <div class="clr-row mt-2">
                <div class=" clr-col-3 clr-col-sm-2 text-center"></div>
                  <div class=" clr-col-6 clr-col-sm-8 text-center">
                      <div class="card">
                          <div class="card-header">
                             Created Instance Status
                          </div>
                          <div class="card-block">
                            {this.state.errorCreate === 5 &&    
                              <div>                             
                                  <span class="label label-light-blue">Instance added Successfully. Please refer <strong> <a class="badge badge-warning clickable" onClick={this.onGetInstance}>Get Instance Status</a></strong>  for more details..."</span><br />
                                  {/* <span class="label label-info"><h4>Select an option from Instances tab to know more. </h4></span><br /> */}
                                  <p class="badge badge-light-blue">Select an option from Instances tab to know more. </p>
                              </div> 
                              }
                              {this.state.errorCreate === 6 &&   
                                <div>                              
                                  <span class="label label-danger"><strong>{this.state.errorMessage}</strong></span><br />
                                  {/* <span class="label label-info"><h4>Select an option from Instances tab to know more. </h4></span> */}
                                  <p class="badge badge-light-blue">Select an option from Instances tab to know more. </p>
                                </div>
                              }
                          </div>
                          
                      </div>
                  </div>
                  <div class=" clr-col-3 clr-col-sm-2 text-center"></div>
            </div>
          }        
              {this.state.create === 1 &&
                   <div class=" text-center">
                      <div class="alert alert-info pd-0" role="alert">
                        <div class="alert-items">
                          <div class="alert-item static">
                            <div class="alert-icon-wrapper">
                              <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                            </div>
                            <span class="alert-text text-center float-r">
                              <strong>Create Instance</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                     <form class="clr-form clr-form-horizontal tbBorder">
                        <label class="clr-control-label"></label>
                        <div class="clr-form-control clr-row">
                          <label for="tutorial" class="clr-control-label clr-col-4 clr-col-md-4">Server IP</label>
                          <div class="clr-control-container clr-col-8 clr-col-md-8">
                            <div class="clr-input-wrapper">
                              <textarea id="tutorial" name="tutorial" placeholder="Server IP" class="clr-textarea" onChange={this.handleChangeserverIP} onBlur={this.handleBlur}></textarea>
                               {this.state.errorCreate === 1 &&                                 
                                  <span class="label label-danger float-l ml-1"><strong>{this.state.errorMessage}</strong></span>
                               }
                            </div>  
                          </div>
                        </div>
                        <div class="clr-form-control clr-row mt-1r">
                          <label for="username" class="clr-control-label clr-col-4 clr-col-md-4 mt-2r">User Id</label>
                          <div class="clr-control-container clr-col-8 clr-col-md-8 mt-1r">
                            <div class="clr-input-wrapper mt-1r">
                              <input id="username" name="username" type="text" class="clr-input" onChange={this.handleUsername} onBlur={this.handleBlur} />
                              
                            </div>
                            {this.state.errorCreate === 2 &&                                 
                                  <span class="label label-danger float-l ml-1"><strong>{this.state.errorMessage}</strong></span>
                               }
                          </div>
                        </div>
                        <div class="clr-form-control clr-row">
                          <label for="password" class="clr-control-label clr-col-4 clr-col-md-4">Password</label>
                          <div class="clr-control-container clr-col-8 clr-col-md-8">
                            <div class="clr-input-wrapper">
                              <input id="password" name="password" type="password" class="clr-input" onChange={this.handlePassword} onBlur={this.handleBlur} />
                               
                          </div>
                          {this.state.errorCreate === 3 &&                                 
                                  <span class="label label-danger float-l ml-1"><strong>{this.state.errorMessage}</strong></span>
                              }
                          </div>
                        </div>
                        <div class="clr-form-control clr-row">
                          <label for="myList" class="clr-control-label clr-col-4 clr-col-md-4">Operating System</label>
                          <div class="clr-control-container clr-col-8 clr-col-md-8 pr-2r">
                            <div class="clr-select-wrapper">
                              <select id="myList" class="clr-select" onChange={this.handleOptionChange} onBlur={this.handleBlur} >
                                <option value="Windows"  >Select OS</option>
                                <option value="Windows"  >Windows</option>
                                <option value="Linux"  >Linux</option>
                              </select>
                              
                            </div>
                               {this.state.errorCreate === 4 &&                                 
                                  <span class="label label-danger float-l ml-1"><strong>{this.state.errorMessage}</strong></span>
                               }
                          </div>
                        </div>
                        <div class="clr-form-control clr-row">
                          <label for="sudorun" class="clr-control-label clr-col-4 clr-col-md-4">Run as Sudo</label>
                          <div class="clr-control-container clr-control-inline clr-col-8 clr-col-md-8">
                            <div class="clr-checkbox-wrapper ml-10">
                              <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Please Check" onChange={this.sudochange} className="pd-0" />
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div class="clr-form-control clr-row">
                          <div class="clr-control-container clr-col-8 clr-col-md-8"></div>
                          <div class="clr-control-container clr-col-4 clr-col-md-4 ">
                            <button class="btn btn-primary btn-sm float-r" type="submit" value="Sub" onClick={this.onSub} >Submit</button>
                            <button class="btn btn-primary btn-sm float-r" type="submit" value="Back" onClick={this.onBack} >Back</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  }
                  {this.state.create === 2 &&
                    <div>
                       <div class="alert alert-info pd-0" role="alert">
                        <div class="alert-items">
                          <div class="alert-item static">
                            <div class="alert-icon-wrapper">
                              <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                            </div>
                            <span class="alert-text text-center">
                              <strong>Get Instance Status</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="clr-row pl-05r pr-05r">
                        {/* <Table bordered={false} hover={false} response="md" striped={false} > */}
                        <table class="table table-compact mt-0 getIns" response="md"  >
                          <thead>
                            {/*<ShowAlert show={this.state.showAlert} colLength={this.state.currentHeaders.split(',').length} onCloseAlertClick={this.onCloseAlertClick} queryToRun={this.state.queryToRun} resultCount={this.state.resultCount}/>*/}
                            {/*<QueryOutput text={this.state.queryToRun} colLength={this.state.currentHeaders.split(',').length+1}/>*/}

                            <HeaderFieldsinstance headerFields={this.state.currentHeadersInstance} />
                          </thead>
                          <tbody>
                            <LoadingButton currentLength={this.state.currentHeadersInstance.split(',').length} show={this.state.showLoading} />
                            <DataFieldInstances dataList={this.state.dataList} headerList={this.state.currentHeadersInstance} />
                          </tbody>
                        </table>
                      </div>
                      {/* <div class="clr-row">
                      <div className="pagenation_container">
                        <div className="bottom-container-server">
                          <PaginationRow totalPages={this.state.totalPages} onPagePress={this.onPagePress} currentPage={this.state.currentPage} />

                          {this.state.timeTaken !== 0 ? <ResultBar timeTaken={this.state.timeTaken} resultCount={this.state.resultCount} /> : ""}
                        </div>
                      </div>  
                      </div> */}
                      <div class="clr-row">
                        <div class="clr-col-12 clr-col-lg-6 clr-col-xl-6">
                          <PaginationRow totalPages={this.state.totalPages} onPagePress={this.onPagePress} currentPage={this.state.currentPage} />
                        </div>
                        <div class="clr-col-12 clr-col-lg-4 clr-col-xl-4">
                          {this.state.timeTaken !== 0 ? <ResultBar timeTaken={this.state.timeTaken} resultCount={this.state.resultCount} /> : ""}
                        </div>
                        <div class="clr-col-12 clr-col-lg-2 clr-col-xl-2">
                          {/* <div className="bottom-container-server">
                                {this.state.timeTaken !== 0 && this.state.resultCount !== 0 ? <ClearResults clearResults={this.clearResults} /> : ""}
                            </div> */}
                        </div>
                      </div>
                      {/*   TO LIST INVENTORY REPORT  */}


                    </div>}
                  {/*   TO DISPLAY INSTANCE REPORT     */}
                  {this.state.create === 3 &&
                    <div>
                       <div class="alert alert-info pd-0" role="alert">
                        <div class="alert-items">
                          <div class="alert-item static">
                            <div class="alert-icon-wrapper">
                              <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                            </div>
                            <span class="alert-text text-center">
                              <strong>Instance Report</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="clr-row pl-05r "> 
                        <Col md="2">
                          <div class="clr-row tbBorder ">
                            <div class="clr-col-12 clr-col-md-12">
                              <table class="table table-compact" response="md" >
                                {/* <Table bordered={false} hover={false} response="md" striped={false} > */}
                                <thead>
                                  {/*<ShowAlert show={this.state.showAlert} colLength={this.state.currentHeaders.split(',').length} onCloseAlertClick={this.onCloseAlertClick} queryToRun={this.state.queryToRun} resultCount={this.state.resultCount}/>*/}
                                  {/*<QueryOutput text={this.state.queryToRun} colLength={this.state.currentHeaders.split(',').length+1}/>*/}

                                  {/* <HeaderFields headerFields={this.state.currentHeadersInstance} /> */}
                                  <tr><th colSpan="2" class="text-center noborder">INSTANCEID</th></tr>
                                </thead>
                                <tbody >
                                  <LoadingButton currentLength={this.state.currentHeadersInstance.split(',').length} show={this.state.showLoading} />
                                  <DataFieldInstance dataList={this.state.dataList} getRowSelectedInstances={this.getRowSelectedInstances} headerList={this.state.currentHeadersInstance} hideMessage={this.hideMessage}/>
                                </tbody>
                              </table>
                            </div>
                            <div class="clr-col-12 clr-col-md-12">
                              <div className="m-0 p-0 text-center">
                                <PaginationRow totalPages={this.state.totalPages} onPagePress={this.onPagePress} currentPage={this.state.currentPage} />
                              </div>
                              <div className="m-0 p-0 text center">
                                {this.state.timeTaken !== 0 ? <ResultBar timeTaken={this.state.timeTaken} resultCount={this.state.resultCount} /> : ""}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md="10">

                          {
                            this.state.showmodule === "2" &&

                            <div class="clr-row ">
                              <div class="clr-col-12 clr-col-md-12 text-center">

                              { 
                              this.state.instance_inventery_report === "1" &&
                                <div class="alert alert-success pd-0" role="alert">
                                  <div class="alert-items">
                                    <div class="alert-item static pd-0">
                                      <div class="alert-icon-wrapper pd-0">
                                        <clr-icon class="alert-icon" shape="check-circle"></clr-icon>
                                      </div>
                                      <span class="alert-text text-center">
                                        <b>{this.state.message}</b>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              }                
                              {this.state.instance_inventery_report === "0" &&
                                <div class="alert alert-danger pd-0" role="alert">
                                  <div class="alert-items">
                                    <div class="alert-item static pd-0">
                                      <div class="alert-icon-wrapper pd-0">
                                        <clr-icon class="alert-icon" shape="check-circle"></clr-icon>
                                      </div>
                                      <span class="alert-text text-center">
                                        <b>No Data Found</b>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              }

                                {this.state.osfinal === "2" &&
                                  <div class="clr-form-control">
                                    {/* <label for="myList" class="clr-control-label">Select Inventory Report</label> */}
                                    <div class="clr-control-container">
                                      <div class="clr-select-wrapper ">
                                        <select class="clr-select " id="myList" onChange={this.handleModuleChange}>
                                          <option value="0">Select Inventory Report</option>
                                          <option value="disk">DISK</option>
                                          <option value="filesystem">FILESYS</option>
                                          <option value="hostdetails">INVENTORY</option>
                                          <option value="groups">GROUP</option>
                                          <option value="interfaces">IPADDRESS</option>
                                          <option value="mac">MACADDRESS</option>
                                          <option value="mask">MASK</option>
                                          <option value="packages">PACKAGES</option>
                                          <option value="patches">PATCH</option>
                                          <option value="process">PROCESS</option>
                                          <option value="users">USER</option>
                                          <option value="volume">VOL</option>
                                        </select>
                                        {/* <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon> */}
                                      </div>
                                      {/* <span class="clr-subtext">Helper Text</span> */}
                                    </div>
                                  </div>
                                }
                                {this.state.osfinal === "1" &&

                                  <div class="clr-form-control text-center">
                                    {/* <label for="myList" class="clr-control-label">Select Inventory Report</label> */}
                                    <div class="clr-control-container">
                                      <div class="clr-select-wrapper">
                                        <select class="clr-select" id="myList" onChange={this.handleModuleChange}>
                                          <option value="0">Select Inventory Report</option>
                                          <option value="affinity">AFFINITY</option>
                                          <option value="alldisks">ALLDISKS</option>
                                          <option value="bios">BIOS</option>
                                          <option value="hostdetails">GENERALINV</option>
                                          <option value="hotfix">HOTFIX</option>
                                          <option value="infraapps">INFRAAPPS</option>
                                          <option value="logicaldisk">LOGICALDISK</option>
                                          <option value="networkinfo">NETWORKINFO</option>
                                          <option value="printers">PRINTERS</option>
                                          <option value="process">PROCESS</option>
                                          <option value="processor">PROCESSOR</option>
                                          <option value="route">ROUTE</option>
                                          <option value="services">SERVICES</option>
                                          <option value="shares">SHARES</option>
                                          <option value="software">SOFTWARE</option>
                                          <option value="volume">VOLUME</option>
                                          <option value="license">LICENSE</option>
                                        </select>
                                        {/* <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon> */}
                                      </div>
                                      {/* <span class="clr-subtext">Helper Text</span> */}
                                    </div>
                                  </div>
                                }
                              </div>
                             
                              {
                                this.state.showreport === "2" &&
                                <div class="tableContainer1">
                                  <div class="clr-row">
                                    <table class="table table-compact" response="md" >
                                       <thead >
                                       <HeaderFields headerFields={this.state.moduleHeaderInstance} />
                                      </thead>
                                      <tbody  >
                                        <LoadingButton currentLength={this.state.moduleHeaderInstance.split(',').length} show={this.state.showLoading} />
                                        <DataFieldstatus datalistStatus={this.state.datalistStatus} headerList={this.state.moduleHeaderInstance} />
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              }

                            </div>
                          }

                        </Col>
                      </div>
                      
                    </div>
                  }
                 
            
          </div>
      </div>
      </div >

    );
  }
}

export default App;


