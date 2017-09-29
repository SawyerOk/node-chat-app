var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('genereate message', ()=>{
    it('should generate correct message object', ()=>{
        var text = "Hello world";
        var from = "Newman";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generate LocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Newman';
        var latitude = 54;
        var longitude = 32;
        var url = 'https://www.google.com/maps?q=54,32';
        var result = generateLocationMessage(from, latitude, longitude);

        expect(result).toInclude({from, url});
    });
});