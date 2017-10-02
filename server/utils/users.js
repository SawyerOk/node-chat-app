
class Users {
    constructor(){
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUsersList(room){
        var users = this.users.filter((user)=> user.room === room);
        var usersName = users.map((user)=> user.name);
        return usersName;
    }

    getUser(id){
        var user = this.users.filter((user) => user.id === id )[0];
        return user;
    }
    
    userExist(name){
        var user = this.users.filter((user) => user.name === name)[0];
        if(user){
            return true;
        }
       return false;
    }

    removeUser(id){
        var user = this.getUser(id);
        if (user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    
}


module.exports = {Users};
