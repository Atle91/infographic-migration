import React, { Component } from "react";

export default class Header extends Component{

	render(){
		return(
			<div className="header-container">
				<h2 className="region-title">{this.props.region.toUpperCase()}</h2>
			</div>
			)
	}
}