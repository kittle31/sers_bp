import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Redirect } from 'react-router-dom'
import {InputGroup, Button, Intent} from '@blueprintjs/core'

import {doLogin} from  "../state/login/actions"
import {colors} from "../util/constants"
import {makePicker} from "../util/util"

const width = 500

let loginStyle = {
  backgroundColor: 'white',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  position: 'fixed',
  left: '50%',
  top: '40px',
  width: width,
  marginLeft: -(width / 2),
  opacity: '1.0',
  padding: 55,
  boxSizing: 'border-box',
  borderRadius: '10px',
}

let rowStyle = {
  paddingTop: 15,
  width: '100%'
}

class AuthPage extends React.Component {
    constructor(){
      super()
      this.state = {
        showPassword: false,
        username: '',
        password: '',
        tmpColor :colors.brownLight2
      }
    }
    doLogin(){      
      this.props.doLogin(this.state.username, this.state.password)
    }

    toggleShowPassword(){
      this.setState({showPassword: !this.state.showPassword})
    }
    
    handleUserChange(event){
      this.setState({username: event.target.value})
    }

    handlePassChange(event){
      this.setState({password: event.target.value})
    }

    render() {
      let toPath = this.props.location.from || '/'
      if ( toPath == '/login' ) {
        toPath = '/'
      }
      if ( this.props.auth ) {
        return (<Redirect to={{ pathname: toPath}} />)
      }
      
      const styleToUse = Object.assign({}, loginStyle, {backgroundColor: this.props.tmpColor})
      let lockButton = <Button
                    icon={this.state.showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.toggleShowPassword.bind(this)}
                />

        const pwType = this.state.showPassword ?  "input" : "password"
        return (
<div style={{display: 'flex', flexDirection: 'row'}}>
          {this.props.enablePicker && makePicker(this, colors, 'tmpColor')}
          <div style={styleToUse}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={rowStyle}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{fontSize: '40px', fontWeight: 'bold'}}>SERS</div>
                  <div className={"bp3-text-small bp3-text-muted"}>SAFE Electronic Records System</div>
                </div>
                <h2>Login</h2>
              </div>

              <div style={rowStyle}>
                <div>Username</div>
                <InputGroup value={this.state.username}
                            onChange={this.handleUserChange.bind(this)}  
                            large={true} type="text" placeholder="Enter your user id..." intent={Intent.PRIMARY}/>
              </div>

              <div style={rowStyle}>
                <div>Password</div>
                <InputGroup value={this.state.password}
                            onChange={this.handlePassChange.bind(this)}  
                            large={true} type={pwType} placeholder="Enter your password..." intent={Intent.PRIMARY}
                            rightElement={lockButton}
                />
              </div>
              <div style={{paddingTop: 35, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Button style={{width: '75%', height: 50}} intent={Intent.PRIMARY} onClick={this.doLogin.bind(this)}>Login</Button>
              </div>
            </div>
          </div>
</div>          
        );
    }
}

function mapStateToProps(state) {
  return {
    auth: state.login.auth,
    tmpColor: state.homepage.tmpColor,
    enablePicker: state.homepage.enablePicker
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    doLogin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)

