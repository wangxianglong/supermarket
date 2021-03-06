import React from "react";
import {connect} from 'react-redux'

import HeadComponent from "./HeadComponent";
import ListComponent from "./ListComponent";
import login from "../login/LoginReducer"

import "./header.scss";

class Operator extends React.Component{
	componentDidMount(){
		console.log(this.props.store)
		
	
		
	}
	render(){
		return (
			<div className = "parent">
				<HeadComponent />
				<div className = "content">
					<div className = "content_left" ref = "list"><ListComponent/></div>
					<div className = "content_right">{this.props.children}</div>
				</div>
			</div>

		)
	}
}


const mapStateToProps = state => ({
    store:state
})
export default connect(mapStateToProps)(Operator)
