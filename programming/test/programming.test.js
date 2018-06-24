const expect = require('chai').expect
const Person = require('../programming')

describe('Test ADD Class Person', () => {
    let person
    beforeEach(() => {
        person = new Person('A')
    })
    it('person should have name = A and length = 0', () => {
        expect(person.name).to.be.equal('A')
    })
    it('person friends.length = 0', () => {
        expect(person.friends.length).to.be.equal(0)
    })
})

describe('Test add Friends', () => {
    let personA, personB, personC
    beforeEach(() => {
        personA = new Person('A')
        personB = new Person('B')
        personC = new Person('C')
        personA.addFriends([personB,personC])
        personB.addFriends([personC])
    })
    it('person A should have friend B and C and friend.length = 2', () => {
        expect(personA.friends[0].name).to.be.equal('B')
        expect(personA.friends[1].name).to.be.equal('C')
        expect(personA.friends.length).to.be.equal(2)
    })
    it('person B should have friend A,C and friend.length = 2', () => {
        expect(personB.friends[0].name).to.be.equal('A')
        expect(personB.friends[1].name).to.be.equal('C')
        expect(personB.friends.length).to.be.equal(2)
    })
})

describe('Test friendOfFriends', () => {
    let personA, personB, personC, personD
    beforeEach(() => {
        personA = new Person('A')
        personB = new Person('B')
        personC = new Person('C')
        personD = new Person('D')
        personA.addFriends([personB,personD])
        personB.addFriends([personC,personD])
    })
    it('friendOfFriends A should have only C', () => {
        expect(personA.friendsOfFriends()[0]).to.be.equal('C')
    })
    it('friendOfFriends B should have length = 0', () => {
        expect(personB.friendsOfFriends().length).to.be.equal(0)
    })
    it('friendOfFriends C should have friend A,D and length = 2', () => {
        expect(personC.friendsOfFriends().includes('A')).to.be.equal(true)
        expect(personC.friendsOfFriends().includes('D')).to.be.equal(true)
        expect(personC.friendsOfFriends().length).to.be.equal(2)
    })
})