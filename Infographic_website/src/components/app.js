import React, {Component} from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import Charts from "./Charts";
import Header from "./Header";
import { fetchData } from "../api/fetch.js";
class App extends Component{
	constructor(){
		super();
		this.state = {
			region: "Norge",
			peopleOut: null,
			peopleIn: null,
			peopleInOut: null,
		}
	}
	componentWillMount(){
		this.fetchCountryData();
	}
	setData(peopleInOut,peopleOut,peopleIn){
		this.setState({
			peopleOut,
			peopleIn,
			peopleInOut
		})
	}
	fetchCountryData(){
		fetchData("vs:Landet", "0", ['Innvandring','Utvandring'])
		.then(data => {
			const peopleInOut = dataToObj(data);

			this.setData(peopleInOut,null,null);
		});
	}
	fetchCountyData(countyNumber){
		const peopleIn = fetchData("vs:FylkerFastland", countyNumber, ['InnflyttingInnland','Innvandring']);
		const peopleOut = fetchData("vs:FylkerFastland", countyNumber, ['UtflyttingInnland','Utvandring']);
		const peopleInOut = fetchData("vs:FylkerFastland", countyNumber, ['Innflytting','Utflytting']);
		Promise.all([peopleInOut, peopleOut, peopleIn])
		.then((values) => {
			const region = Object.values(values[0].dimension.Region.category.label)[0];
			this.updateRegion(region);

			this.setData(dataToObj(values[0]),dataToObj(values[1]),dataToObj(values[2]));
		})
	}
	fetchMunicipality(municipalityNumber){
		const peopleIn = fetchData("agg_single:KommGjeldende", municipalityNumber, ['InnflyttingInnland','Innvandring']);
		const peopleOut = fetchData("agg_single:KommGjeldende", municipalityNumber, ['UtflyttingInnland','Utvandring']);
		const peopleInOut = fetchData("agg_single:KommGjeldende", municipalityNumber, ['Innflytting','Utflytting']);
		Promise.all([peopleInOut, peopleOut, peopleIn])
		.then((values) => {
			const region = Object.values(values[0].dimension.Region.category.label)[0];
			this.updateRegion(region);

			this.setData(dataToObj(values[0]),dataToObj(values[1]),dataToObj(values[2]));
		})
	}
	updateRegion(region){
		this.setState({
			region,
		})
	}
	render(){
			if(this.state.peopleInOut){
				return (
					<div className="app-container">
						<Header region={this.state.region}/>
						<div className="content-container">
							<Charts 
								peopleOut={this.state.peopleOut}
								peopleIn={this.state.peopleIn}
								peopleInOut={this.state.peopleInOut}
							/>
							<Map fetchCountyData={(countyNumber) => this.fetchCountyData(countyNumber)}
								 fetchMunicipality={(mNum) => this.fetchMunicipality(mNum)} />
						</div>
					</div>
				)
			}else{
				return (
					<div> Loading data... </div>
					)
			}
	}
}
//Helper functions
function splitArrInTwo(arr){
	const arr1 = arr.slice(0, arr.length/2);
	const arr2 = arr.slice(arr.length/2);
	return [arr1,arr2];
}
function dataToObj(data){
	const category = Object.values(data.dimension.Tid.category.label);
	const seriesName = Object.values(data.dimension.ContentsCode.category.label);
	const dataPoints = splitArrInTwo(data.value);
	return {category, seriesName, dataPoints};
}
ReactDOM.render(<App />, document.getElementById("app"));
