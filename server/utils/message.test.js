var expect = require('expect');
var {generateMessage} = require('./message');

describe('genereate message', ()=>{
    it('should generate correct message object', ()=>{
        var text = "Hello world";
        var from = "Newman";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});