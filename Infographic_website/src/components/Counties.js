import React, { Component } from "react";
let styles;
let firstTime = true;
export default class Counties extends Component{
	constructor(){
		super();
		this.state = {
			countyNr: null,
		}
	}
	componentDidMount(){
		this.createOnClicks();
		window.addEventListener("resize", () => this.createStylesIfReady());
		window.addEventListener("scroll", () => this.createStylesIfReady());
	}
	createOnClicks(){
		const hitBoxes = document.getElementsByClassName("hitbox");
		Array.prototype.map.call(hitBoxes, hitBox => {
			hitBox.addEventListener("click", () => {
				this.props.setMunicipalityNumber(hitBox.dataset.countyNumber);
				this.props.fetchCountyData(hitBox.dataset.countyNumber);
				this.highlightElement(hitBox.parentElement);
				
			})
		})
	}
    highlightElement(element){
    	const classElements = document.getElementsByClassName("highlight");
    	Array.prototype.map.call(classElements, ele => {
    		ele.classList.remove("highlight")
    	})
    	element.className += " highlight";	
    }
    createStylesIfReady(){
    	//check if <img> is ready
    	let interval = setInterval(() => {
			const norway = document.getElementsByClassName("norway")[0];
			if(norway.height > 0) {
				clearInterval(interval)
				this.createStyles();
			};
		},1);
    }
	createStyles(){
		/*
		Counties are positioned base on <img> distance from left and top screen
		*/
		//ClientRects are used to get position and size after transform
		//need parent element to detect if outside of parent and not render
		const bounds = document.getElementsByClassName("map-bounds")[0];
		const boundsRect = bounds.getBoundingClientRect();
		const norway = document.getElementsByClassName("norway")[0];
		const norwayRect = norway.getBoundingClientRect();
		//Get length from left and top screen
		const startLeft = norwayRect.left;
		const startTop = norwayRect.top;
		//get 1% of width and height of img
		const percentWidth = norwayRect.width / 100;
		const percentHeight = norwayRect.height / 100;
		//set size and position of counties and hitboxes
		let sheet = document.getElementById("county-styles");
		if(!sheet) {
			sheet = document.createElement("style");
			sheet.setAttribute("id", "county-styles");
		}
		sheet.innerHTML = `
		.county { 
			width: ${percentWidth*1.5}px; 
			height:${percentWidth*1.5}px;
		}
		.hitbox {
			margin-left: -${(percentWidth*1.5)}px;
			margin-top: -${(percentWidth*1.5)}px;
			width: ${percentWidth*4}px;
			height: ${percentWidth*4}px;
		}
		#ostfold ${getPos(27, 92)}
	 	#akershus ${getPos(27,87)}
	 	#oslo ${getPos(25, 85.8)}
	 	#hedmark ${getPos(30, 77)}
	 	#oppland ${getPos(22, 75)}
	 	#buskerud ${getPos(20, 83)}
	 	#vestfold ${getPos(21,91)}
	 	#telemark ${getPos(15, 88)}
	 	#aust-agder ${getPos(12, 94)}
	 	#vest-agder ${getPos(7, 94)}
	 	#rogaland ${getPos(6, 88)}
	 	#hordaland ${getPos(9, 82)}
	 	#sogn-og-fjordane ${getPos(12,72)}
	 	#more-og-romsdal ${getPos(18,65)}
	 	#nordland ${getPos(47, 37)}
	 	#troms ${getPos(64, 20)}
	 	#finnmark ${getPos(80, 16)}
	 	#trondelag ${getPos(31, 61)}
		`
		document.body.appendChild(sheet);


		function getPos(leftPercent, topPercent){
			//fixed position = Img distance from screen border + 1vw/vh * %Coords of img 
			const left = startLeft+percentWidth*leftPercent;
			const top = startTop+percentHeight*topPercent;
			//transform position = fixed pos - parent distance from screen border + width of counties
			const translateLeft = left-(bounds.offsetLeft+(percentWidth*1.5));
			const translateTop = top-(bounds.offsetTop+(percentWidth*1.5));

			if(outOfBounds(left, top, boundsRect)) {
				return `{display: none}`;
		}
			return `{
				-ms-transform: translate(${translateLeft}px, ${translateTop}px);
				-webkit-transform: translate(${translateLeft}px, ${translateTop}px);
				transform: translate(${translateLeft}px, ${translateTop}px);
			}`
		}
	}
	render(){
		this.createStylesIfReady();
			return(
				<div>
					<div className="county" id="ostfold" >
						<div className="hitbox" data-county-number="01"></div>
					</div>
					<div className="county" id="akershus">
						<div className="hitbox" data-county-number="02"></div>
					</div>
					<div className="county" id="oslo">
						<div className="hitbox" data-county-number="03"></div>
					</div>
					<div className="county" id="hedmark">
						<div className="hitbox" data-county-number="04"></div>
					</div>
					<div className="county" id="oppland">
						<div className="hitbox" data-county-number="05"></div>
					</div>
					<div className="county" id="buskerud">
						<div className="hitbox" data-county-number="06"></div>
					</div>
					<div className="county" id="vestfold">
						<div className="hitbox" data-county-number="07"></div>
					</div>
					<div className="county" id="telemark">
						<div className="hitbox" data-county-number="08"></div>
					</div>
					<div className="county" id="aust-agder">
						<div className="hitbox" data-county-number="09"></div>
					</div>
					<div className="county" id="vest-agder">
						<div className="hitbox" data-county-number="10"></div>
					</div>
					<div className="county" id="rogaland">
						<div className="hitbox" data-county-number="11"></div>
					</div>
					<div className="county" id="hordaland">
						<div className="hitbox" data-county-number="12"></div>
					</div>
					<div className="county" id="sogn-og-fjordane">
						<div className="hitbox" data-county-number="14"></div>
					</div>
					<div className="county" id="more-og-romsdal">
						<div className="hitbox" data-county-number="15"></div>
					</div>
					<div className="county" id="trondelag">
						<div className="hitbox" data-county-number="50"></div>
					</div>
					<div className="county" id="nordland">
						<div className="hitbox" data-county-number="18"></div>
					</div>
					<div className="county" id="troms">
						<div className="hitbox" data-county-number="19"></div>
					</div>
					<div className="county" id="finnmark">
						<div className="hitbox" data-county-number="20"></div>
					</div>
					
				</div>
				)
	}
}

function outOfBounds(left, top,ele){
	const overTop = Boolean(top < ele.top);
	const overLeft = Boolean(left < ele.left);
	const overRight = Boolean(left > ele.left + ele.width);
	const overBottom = Boolean(top > ele.top + ele.height);
	return Boolean(overTop || overLeft || overRight || overBottom);
}
