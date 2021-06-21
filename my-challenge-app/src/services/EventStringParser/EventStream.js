import Datasets from './Datasets';

export default class EventStream{
	
	constructor({timestamp, type, select, group}){
		this.timestamp = timestamp;
		this.type      = type;
		this.select    = select;
		this.group     = group;
		this.datasets  = new Datasets();
		this.fineshed  = false;
		this.span 	   = {
			begin: new Date(0).getTime(), 
			end:   new Date().getTime()
		};
	}

	updateSpan({begin, end}){
		this.span = {begin, end};
	}

	updateDataset(evt){
		if( !this.checkBondaries(evt) )
			return;

		const pairName = this.getPairNameFromEvent(evt);

		for(let variable of this.select){
			
			if ( !evt.hasOwnProperty(variable) )
				continue;

			const seriesID = (pairName + " " + variable).trim();

			const point = {
				x: 10800000 + (evt.timestamp - this.span.begin), 
				y: evt[variable]
			};

			this.datasets.insert(seriesID, point);
		}
	}

	checkBondaries({timestamp}){
		return timestamp >= this.span.begin && timestamp <= this.span.end;
	}

	getPairNameFromEvent(evt){
		return this.group.reduce((carry, el) => {
			if( evt.hasOwnProperty(el) )
				return carry + " " + evt[el];
			return carry;
		}, "");
	}

	stop(){
		this.fineshed = true;
	}
}