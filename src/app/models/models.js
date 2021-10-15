import _ from 'lodash'

export class Board{
    constructor({id= null, columns= [], owners = []} = {}) {
        this.id = id;
        this.columns = columns;
        this.owners = owners;
    }
}

export class Column{
    constructor({id= null, title= null, background= null, tasks= []} = {}) {
        this.id = id;
        this.title = title;
        this.background = background;
        this.tasks = tasks;
    }
}

export class Task{
    constructor({id= null, tags= [], links= [], title= null, date = new Date(), description= null, owners= []} = { }) {
        this.id = id;
        this.tags = tags;
        this.links = links;
        this.title = title;
        this.date = date;
        this.description = description;
        this.owners = owners;

    }
    toggleTag(tag){
        this.tags = _.xor(this.tags, [tag]);
    }
    removeOwner(owner){
        this.owners = _.xor(this.owners, [owner]);
    }
    addOwner(owner){
        if (!this.owners.includes(owner)){
            this.owners.push(owner)
        }
    }

}

export class Owner {
    constructor({id= null, avatar= null, name= null, surname= null} = {}) {
        this.id = id;
        this.avatar = avatar;
        this.name = name;
        this.surname = surname;
    }

}