

class Person {
    constructor(name){
        this.name = name
        this.friends = []
    }

    friendsOfFriends(){
        const friendOfThis = this.friends.map(person => person.name)
        let friendOfFriends = []
        this.friends.forEach(person => {
            person.friends.forEach(friendPerson => {
                friendOfThis.includes(friendPerson.name) || 
                friendOfFriends.includes(friendPerson.name) || 
                (friendPerson.name == this.name) ? 
                '' : friendOfFriends.push(friendPerson.name)
            })
        })
        return friendOfFriends
    }

    addFriends(arrFriends){
        arrFriends.forEach(person => {
            this.friends.push(person)
            person.friends.push(this)
        })
    }
}

// const a = new Person('A')
// const b = new Person('B')
// const c = new Person('C')
// const d = new Person('D')
// a.addFriends([b,d])
// b.addFriends([c,d])
// console.log(a.friendsOfFriends())

module.exports = Person;