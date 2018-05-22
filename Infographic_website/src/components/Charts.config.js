export function config(data) {
   let height = "200px";
   let title;
   if(data.seriesName[0] === "Innflytting" || data.seriesName[0] === "Innvandring"){
      title = "Inn og Utflyttere";
      height = 400 + "px";
   }else if(data.seriesName[0] === "Utflytting, innenlands"){
      title = "Utflyttere";
   }else{
      title = "Innflyttere";
   }
   return {
			chart:{
				height: height,
            backgroundColor: "none",
			},
  			title:{
               text: title.toUpperCase(),
               style: {
                  color: "#d1d1d1"
               }
            },
         subtitle:{
               /*text: 'Source: Statistisk sentralbyr\u00e5'*/
            },
         xAxis: {
               categories: data.category,
               labels:{
                  style:{
                     color: "#b3b3b3"
                  }
               }
            },
         yAxis: {
               title: {
                  text: 'Personer',
                  style:{
                     color: "#d1d1d1",
                  }
               },
               plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
               }],
               labels:{
                  style:{
                     color: "#b3b3b3"
                  },
                  margin: 0,
               }
            },   
         tooltip: {
               valueSuffix: ' personer'
            },
         legend: {
               layout: 'vertical',
               align: 'right',
               verticalAlign: 'middle',
               borderWidth: 0,
               itemStyle: {
                  color: "#ffffff"
               },
            },
         series:[{
                  name: data.seriesName[0],
                  data: data.dataPoints[0],
                  color: "#82d373",
               }, 
               {
                  name: data.seriesName[1],
                  data: data.dataPoints[1],
                  color: "#d39873",
               }, 
            ],
         responsive: {
            rules: [{
               condition: {
                  maxWidth: 560
               },
               chartOptions: {
                  legend: {
                     align: "center",
                     verticalAlign: "bottom",
                     layout: "horizontal"
                  },
                  yAxis:{
                     labels:{
                        align: "left",
                        x: 0,
                        y: -5,
                        tickPixelInterval: 20,
                     },
                     title: {
                        align:"high",
                        rotation: 0,
                        y: -20,
                        x: 0,
                        margin: 0,
                        offset:-50,
                     },
                  },
                  subtitle: {
                     text: false,
                  }

               }
            }]
         }
  }
}