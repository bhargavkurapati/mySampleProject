import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
class LoadingButton extends React.Component{
    render(){
      console.log("Loading Button: ",this.props.show)
      if (this.props.show){
        return(
          <tr><td colSpan={this.props.currentLength} >
          {/* <Button variant="default"  disabled size="lg" block >
            <Spinner
              as="span"
              animation="grow"
              size="lg"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button> */}
          <span class="spinner spinner-md">
             Loading...
        </span>
          </td>
          </tr>
        ) 
      } else {
        return(<tr></tr>)
      }
      
    }
  }
  export default LoadingButton;