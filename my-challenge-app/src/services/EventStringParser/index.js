
import JSON5 from 'json5';

import EventStream from './EventStream';

export default class EventStringParser{
	
	constructor(jsonEventList){

		if( jsonEventList && jsonEventList.length > 55000 ){
			throw new Error(`This input is too large it cannot be processed at the browser.
				Max Input size: ${jsonEventList.length}, size: 55000`);
		}
		
		this.list 	       = [];
		this.events        = undefined;
		this.top 	       = null;
		this.jsonEventList = jsonEventList;
	}

	jsonStringToEventArray(){
		const asJsonArray     = '[' + this.jsonEventList.replace(/}\s*{/g, '},{') + ']';
		const asPlainJSObject = JSON5.parse(asJsonArray);
		this.events = asPlainJSObject;
	}

	process(){

		this.jsonStringToEventArray();

		for(let evt of this.events){

			const err = this.canPerformEvent(evt);

			const {type} = evt;
			
			if(err){
				this.list = [];
				return err;
			}

			switch(type){
			
				case 'start':
					this.list.unshift( new EventStream(evt) );
					this.top = this.list[0];
				break;

				
				case 'span':
					this.top.updateSpan(evt);
				break;

				
				case 'data':
					this.top.updateDataset(evt);
				break;

				
				case 'stop':
					this.top.stop();
				break;

				
				default:
					console.log('Warning: Invalid event type: '+type);
			}

		}

		return null;
	}

	canPerformEvent({type, timestamp}){

		const noActiveEventStream = this.list.length === 0 || this.top.fineshed;

		if(!type || !timestamp)
			throw new Error(`All events it is required the type and timestamp.`);

		if( (type === "start" && !noActiveEventStream) )

			throw new Error(`Cannot open a event stream while the current one is not done.`);

		else if( (type === "data" || type === "span" || type === "stop") && noActiveEventStream )

			throw new Error(`Cannot procces the data, span or a stop event ` +
					 `without event stream.`);

		return null;
	}

	getList(){
		if(this.list.length > 0)
			return this.list;
		return [new EventStream({})];
	}
}