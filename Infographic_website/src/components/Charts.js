import React, { Component } from "react";
import Highcharts from "react-highcharts"
import { config } from "./Charts.config";

let migrateOut;
let migrateIn;
let migrateInOut;
export default class Charts extends Component{
	getConfig(){
      migrateOut = config(this.props.peopleOut);
      migrateIn = config(this.props.peopleIn);
      migrateInOut = config(this.props.peopleInOut);
   }
	render(){
      if(!this.props.peopleIn){
         //If region = Norway
         migrateInOut = config(this.props.peopleInOut);
         return (
            <div className="charts-container">
               <Highcharts config={migrateInOut}/>
            </div>
            )
      }else{
            this.getConfig();
            return (
               <div className="charts-container">
                  <div className="migrate-out">
                     <Highcharts config={migrateOut}/>
                  </div>
                  <div className="migrate-in">
                     <Highcharts config={migrateIn}/>
                  </div>
                  <div className="migrate-in-out">
                     <Highcharts config={migrateInOut}/>
                  </div>
               </div>
               )
         }
	}
}