import EventStringParser from './index';

/**
 * @desc Crash cause fields timestamp and type
 * are mandatory for all events.
*/
it('Crash cause theres no type or timestamp', () => {
	try{
		const str = `
			{timestamp: 456321, group: ['a', 'b', 'c'], select: ['a', 'b']}
			{type: 'data', timestamp: 456321, a: 1, b: 2}
			{type: 'stop', timestamp: 456321}
		`;
		const eventStringParser = new EventStringParser(str);
		eventStringParser.process();
	}catch(err){
		expect(err.message).toBe('All events it is required the type and timestamp.');
	}
});

/**
 * @desc Crash cause it is a invalid json
*/
it('Crash cause its a invalid json between a and b', () => {
	try{
		const str = `
			{type: 'start', timestamp: 456321, group: ['a', 'b', 'c'], select: ['a', 'b']}
			{type: 'data', timestamp: 456321, a: 1 b: 2}
			{type: 'stop', timestamp: 456321}
		`;
		const eventStringParser = new EventStringParser(str);
		eventStringParser.process();
	}catch(err){
		expect(err.message).toMatch(/JSON5: invalid character/);
	}
});


it('Converts JSON String to a dataset array', () => {
	const str = `
		{type: 'start', timestamp: 456321, group: ['a', 'b', 'c'], select: ['d', 'e']}
		{type: 'span', timestamp: 456321, begin: 454, end: 9999}
		{type: 'data', timestamp: 456321, d: 8, e: 7, a: 'zh', b: 'y', c: 'w'}
		{type: 'data', timestamp: 456321, d: 1, e: 2, a: 'z', b: 'y', c: 'w'}
		{type: 'stop', timestamp: 456321}
	`;
	const eventStringParser = new EventStringParser(str);
	eventStringParser.process();
	expect(eventStringParser.getList()).toHaveLength(1);
});