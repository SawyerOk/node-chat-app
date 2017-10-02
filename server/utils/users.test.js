const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
        {
            id : '1',
            name : 'Ivan',
            room : 'Luna'
        },
        {
            id : '2',
            name : 'Moogi',
            room : 'Lich'
        },
        {
            id : '3',
            name : 'Helen',
            room : 'Luna'
        }
    ];
    });

    
    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id : '123',
            name : 'Mike',
            room : 'Billy Talent Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    
    it('should retuen names for Luna room', ()=>{
        var result = users.getUsersList('Luna');
        expect(result).toEqual(['Ivan', 'Helen']);
    });

    it('should return names for Lich room', ()=>{
        var result = users.getUsersList('Lich');
        expect(result).toEqual(['Moogi']);
    });

    it('should remove the user by id', ()=>{
        var id = '2';
        var result = users.removeUser(id);
        expect(result.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not romevi user with wrong id', ()=>{
        var id = '212';
        var result = users.removeUser(id);
        expect(result).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user with id', ()=>{
        var id = '2';
        var result = users.getUser(id);
        expect(result.id).toBe(id);
    });

    it('should not find user with wrong id', ()=>{
        var id = '24';
        var result = users.getUser(id);
        expect(result).toNotExist();
    });

    it('should find user by name', ()=>{
        var name = "Moogi";
        var result = users.userExist(name);
        expect(result).toBeTruthy;
    });
    
});