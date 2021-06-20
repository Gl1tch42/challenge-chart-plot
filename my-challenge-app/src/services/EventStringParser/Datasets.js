import { commonDatasetOptions } from '../../constants/chartsInstanci.js';

export default class Datasets{
	
	constructor(){
		this.datasets = new Map();
	}

	insert(datasetID, point){
		
		if( this.datasets.has(datasetID) )
			this.datasets.get(datasetID).data.push(point);	
		else
			this.datasets.set(datasetID, this.createDataset(point, datasetID));
	}


	createDataset(firstPoint, seriesID){
		
		const label = this.generateDatasetLabel(seriesID);
		const color = this.randomColor();

		return {
			label,
			data: [firstPoint],
			backgroundColor: color,
			borderColor: color,
			pointBorderColor: color,
			pointHoverBackgroundColor: color,
			...commonDatasetOptions
		};
	}

	generateDatasetLabel(seriesID){
		return seriesID.replace(/_/g, ' ')
			.split(" ")
			.map(a => a[0].toUpperCase() + a.substr(1))
			.join(" ");
	}

	randomColor(){

		const r = Math.floor(Math.random()*256);
		const g = Math.floor(Math.random()*256);
		const b = Math.floor(Math.random()*256);

		return `rgb(${r}, ${g}, ${b})`;
	}

	toChartFormat(){
		return Array.from( this.datasets.values() );
	}

}