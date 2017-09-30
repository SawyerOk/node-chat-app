var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRreael String Testing', ()=>{
    it('should reject non-string value', ()=>{
        var name = 1234;
        var room = 323;
        var result = isRealString(name,room);
        expect(result).toBeFalsy;
        
    });

    it('should reject string with only spaces', ()=>{
        var name = '  ';
        var room = '';
        var result = isRealString(name, room);
        expect(result).toBeFalsy;
    });

    it('should allow string with non-space character', ()=>{
        var name = '  here we are ';
        var room = ' dummy text';
        var result = isRealString(name, room);
        expect(result).toBeTruthy;
    });
});