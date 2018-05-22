export function fetchData(region, regionvalue, contentvalues ){

	return fetch("https://data.ssb.no/api/v0/no/table/09588/", {
			method: `post`,
			headers: {
				"Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`
			},
			body: JSON.stringify({
				query: [
				    {
				      code: "Region",
				      selection: {
				        filter: region,
				        values: [
				          regionvalue
				        ]
				      }
				    },
				    {
				      code: "ContentsCode",
				      selection: {
				        filter: "item",
				        values: contentvalues
				      }
				    }
				  ],
				  response: {
				    format: "json-stat"
				  }
			})
		})
		.then(function(res){
			return res.json();
		})
		.then(function(data){
			return data.dataset;
		});
}
