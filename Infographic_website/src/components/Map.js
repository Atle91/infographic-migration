import React, { Component } from "react";
import Counties from "./Counties";
import Municipalities from "./Municipalities";
export default class Map extends Component{
	constructor(){
		super();
		this.state = {
			municipalityNumber: null,
		}
	}
	componentDidMount(){
		this.setHeightOfBounds();
		const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
		if(!isMobile){
			this.enableZoom();
			this.enableDrag();
		}
	}
	setHeightOfBounds(){
		const boundsEle = document.getElementsByClassName("map-bounds")[0];
		const map = document.getElementsByClassName("norway")[0];
		const checkIfLoaded = setInterval(() => {
			if(map.height > 0){
				clearInterval(checkIfLoaded);
				map.ondragstart = () => {return false}
				boundsEle.style.height = map.height + "px";
			}
		},1);
		
	}
	setMunicipalityNumber(municipalityNumber){
		this.setState({
			municipalityNumber
		})
	}
	moveImg(e,img, start, prev){
		const moveLeft = e.screenX - start.x;
		const moveTop = e.screenY - start.y;
		img.style.marginLeft = prev.marginLeft + moveLeft+"px";
		img.style.marginTop = prev.marginTop + moveTop+"px";
		this.forceUpdate();
	}
	enableDrag(){
		const img = document.getElementsByClassName("norway")[0];
		let start = {};
		let prev = {};
		const that = this;
		//disable browser dragging img function
		img.addEventListener("mousedown", (e) => {
			start.x = e.screenX;
			start.y = e.screenY;
			prev.marginLeft = nFromPx(img.style.marginLeft),
			prev.marginTop = nFromPx(img.style.marginTop)
			window.addEventListener("mousemove", drag);
		});
		window.addEventListener("mouseup", () => {
			window.removeEventListener("mousemove", drag);
		});

		function drag(e){
			that.moveImg(e, img, start, prev);
		}

	}
	zoomOut(e,img,mapBounds){
		const prevScale = img.style.transform ? nFromTrans(img.style.transform) : 1;
		img.style.transform = `scale(${prevScale - 0.1})`;
	}
	zoomIn(e,img,mapBounds){
		const prevScale = img.style.transform ? nFromTrans(img.style.transform) : 1;
		img.style.transform = `scale(${prevScale + 0.1})`;

	}
	zoom(e,img,mapBounds){
		if(e.deltaY > 0){
			this.zoomOut(e,img,mapBounds);
		}else{
			this.zoomIn(e,img,mapBounds);
		}
		//force update to calculate style of counties
		this.forceUpdate();
	}
	enableZoom(){
		const img = document.getElementsByClassName("norway")[0];
		const mapBounds = document.getElementsByClassName("map-bounds")[0];
		if(mapBounds.addEventListener){
			mapBounds.addEventListener("mousewheel", (e) => this.zoom(e,img,mapBounds));
			mapBounds.addEventListener("DOMMouseScroll", (e) => this.zoom(e,img,mapBounds));
		}else{
			mapBounds.attachEvent("onmouswheel", (e) => this.zoom(e,img,mapBounds));
		}
	}

	render(){
		return (
			<div className="map-container"> 
				<div className="map-bounds">
					<img src="./images/Norway.png" className="norway"/>
					<Counties fetchCountyData={(countyNumber) => this.props.fetchCountyData(countyNumber)}
							setMunicipalityNumber={(municipalityNumber) => this.setMunicipalityNumber(municipalityNumber)}/>
				</div>
				<Municipalities municipalityNumber={this.state.municipalityNumber}
								fetchMunicipality={(mNum) => this.props.fetchMunicipality(mNum)}/>
			</div>
			)
	}
} 
function nFromPx(str){
	let arr = str.split("");
	arr.pop();
	arr.pop();
	return Number(arr.join(""));
}

function nFromTrans(str){
	const nInStr = str.match(/\d+\.?\d?/g)[0];
	return Number(nInStr);
}
function nFromTransOrigin(str){
	const nInStr = str.match(/\d+\.?\d+(?!px)/g);
	if(nInStr.lenght > 2) console.error("nFromTransOrigin() Error: Regex matched more than 2");
	return {
		x: Number(nInStr[0]),
		y: Number(nInStr[1])
	}
}
function getPercentCoords(xDistance, width, yDistance, height){
	return {
		x: Number((xDistance / (width/2))*100),
		y: Number((yDistance / (height/2))*100)
	}
}