export const chartDefault = {
	
	legend: false,
	
	legendCallback: function (chart) {
		const lis = chart.data.datasets.map(dataset => {	
			return `<li style = "color:${dataset.backgroundColor}";>
						<span style = "background-color:${dataset.backgroundColor}";></span>
						${dataset.label}
					</li>`;

		}).join("");

		return `<ul class="${chart.id}-legend">${lis}</ul>`;
	},

	scales:{
		yAxes: [{
			ticks: {
				display: false,
				maxTicksLimit: 5,
				beginAtZero: true,
			},
			gridLines: {
				drawBorder: false,
				lineWidth: 0.9,
				color: "rgba(0,0,0,0.4)",
				tickMarkLength: 15,
				zeroLineWidth: 2,
				zeroLineColor: "rgba(0,0,0,0.5)"					
			}
		}],
		xAxes: [{
			type: 'time',
			time: {
				unit: 'minute',
				displayFormats:{
					minute: 'HH:mm'
				},
			},
			gridLines: {
				display: false,
				drawBorder: false,
				tickMarkLength: 15,
			},
			ticks:{
				display: true,
				autoSkip: true,
        		maxTicksLimit: 15,
        		beginAtZero: true
			}
		}]
	},

	maintainAspectRatio: false, 
	
	layout: {
		padding:{
	    	left: 0,
        	right: 0,
        	top: 10,
         	bottom: 0
        }
    }
}

/* common options to all datasets */
export const commonDatasetOptions = {
	fill: false,
	lineTension: 0.1,
	borderCapStyle: 'butt',
	borderDash: [],
	borderDashOffset: 0.0,
	borderJoinStyle: 'miter',
	pointBorderWidth: 6,
	pointHoverRadius: 6,
	pointHoverBorderWidth: 0.1,
	pointRadius: 3,
	pointHitRadius: 3,
	borderWidth: 2,	
}