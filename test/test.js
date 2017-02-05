// process.on('unhandledRejection', (err, p) => {
//   console.log('An unhandledRejection occurred');
//   console.log(`Rejected Promise: ${p}`);
//   console.log(`Rejection: ${err}`);
// });

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const groove = require('../src/js/groove.js');
const database = require('../src/js/database.js');

describe('Groove', function() {
    it('should exist', function() {
        expect(groove).to.not.be.undefined;
    });
    describe('Fetch Ticket', function() {
        const fetchTicket = groove.fetchTicket;
        it('should exist', function() {
            expect(fetchTicket).to.not.be.undefined;
        });

        let ticketExists = fetchTicket(1667);

        describe('Ticket', function() {
        	it('should reject if ticket number is not found', function(){
        		return expect(fetchTicket(546556513)).to.be.rejectedWith('did not get 200 from Groove');
        		return expect(fetchTicket('foo')).to.be.rejectedWith('did not get 200 from Groove');
        	});
            it('should be an object', function() {
                return expect(ticketExists).to.eventually.be.an('object');
            });
            it('should have a message count property', function() {
                return expect(ticketExists).to.eventually.have.property('message_count');
            });
            it('should have a customer link property', function() {
            	return expect(ticketExists).to.eventually.have.deep.property('.links.customer.href');
            })

            let messageCount, customerLink;

            fetchTicket(1667).then(function(result){
            	messageCount = result.message_count;
            	customerLink = result.links.customer.href;
            });

            it('should have the message count be a number', function(){
            	return expect(messageCount).to.be.a('number');
            });
            it('should have the customer link be a string', function(){
            	return expect(customerLink).to.be.a('string');
            });
        });
    });
});

describe('Database', function() {
    it('should exist', function() {
        expect(database).to.not.be.undefined;
    });
    describe('Check For Email', function() {
        const checkForEmail = database.checkForEmail;

        it('should exist', function() {
            expect(checkForEmail).to.not.be.undefined;
        });

        let stringInDb = checkForEmail('kfarhang0@gmail.com');
        let stringNotInDb = checkForEmail('ammillerbernd@gmail.com');

        it('should successfully connect to the database', function() {
            return expect(stringInDb).to.not.be.rejectedWith('could not connect to db');
            return expect(stringNotInDb).to.not.be.rejectedWith('could not connect to db');
        });
        it('should succesfully query the database', function() {
            return expect(stringInDb).to.not.be.rejectedWith('error querying DB');
            return expect(stringNotInDb).to.not.be.rejectedWith('error querying DB');
        });
        it('should return an empty array if the email is not in the database', function() {
            return expect(stringNotInDb).to.eventually.be.empty;
        });
        it('should return an array of objects if the email is in the database', function() {
            return expect(stringInDb).to.eventually.not.be.empty;

            for (let i = 0; i < stringInDb.length; i++) {
                return expect(stringInDb[i].to.eventually.be.an('object'));
            }
        });

        describe('Object', function() {

            let object, manager;

            stringInDb.then(function(result) {
                object = result[0];
                manager = object.mgr;
            });

            it('should have only the mgr property', function() {
                return expect(object).to.have.all.keys('mgr');
                return expect(object).to.not.have.all.keys('mgr', 'foo');
            });

            it('should contain a string for the mgr property', function() {
                return expect(manager).to.be.a('string');
            });
        });

    });
});
