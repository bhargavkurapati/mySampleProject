/*Creation date : 30-April-20
*  Application : ViDA
*  Description : This script will check the communication type 
*                between source and destination ports
*  Author : Nikhil Saxena
*  Update History
*  -------------------
*  30-April-20 : Initial Creation
*/
import React from 'react';


/*
   NOTE : This script currently checks for Inbound/Outbound rules
   (Number of srcPorts) < (Number of destPorts)
      -> Inbound
   (Number of destPorts) < (Number of srcPorts)
      -> Outbound 
   (Number of srcPorts) === (Number of destPorts) && for other rules
      -> Gather Input from Abhishek/Vinay
*/


class CommunicationType extends React.Component
{
   constructor(props){
       super(props);
       this.state={
           commType: ''
       }
   }

   shouldComponentUpdate(nextProps,nextState)
   {
       if(this.props.sourcePortCount !== nextProps.sourcePortCount)
       {
           return true;
       }
       if(this.state.commType !== nextState.commType)
       {
           return true;
       }
       return false;
   }

   checkCommunication = () =>
   {
       const sourcePorts = this.props.sourcePortCount;
       const destPorts =  this.props.destPortCount;
          

       //Communication rule Book logic will sit here
       if(parseInt(sourcePorts)<parseInt(destPorts))
       {
           this.setState({
               commType: 'Outbound'
           })
       }
       else
       {
           this.setState({
               commType: 'Inbound'
           })
       } 
   }

   render()
   {
       {this.checkCommunication()}
       return this.state.commType;
   }  
}

export default CommunicationType;