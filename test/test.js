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
const yalla = require('../src/js/yalla.js');

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

        describe('Message', function() {
            it('should reject if ticket number is not found', function() {
                return expect(fetchTicket(546556513)).to.be.rejectedWith('did not get 200 from Groove');
                return expect(fetchTicket('foo')).to.be.rejectedWith('did not get 200 from Groove');
            });
            it('should be an object', function() {
                return expect(ticketExists).to.eventually.be.an('object');
            });
            it('should have a message count property', function() {
                return expect(ticketExists).to.eventually.have.property('messageCount');
            });
            it('should have an email property', function() {
                return expect(ticketExists).to.eventually.have.property('email');
            });

            let messageCount, customerEmail;

            fetchTicket(1667).then(function(result) {
                messageCount = result.messageCount;
                customerEmail = result.email;
            });

            it('should have the message count be a number', function() {
                return expect(messageCount).to.be.a('number');
            });
            it('should have the email be a string', function() {
                return expect(customerEmail).to.be.a('string');
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

        let emailInDb = checkForEmail({ messageCount: 1, email: 'kfarhang0@gmail.com' });
        let emailNotInDb = checkForEmail({ messageCount: 1, email: 'ammillerbernd@gmail.com' });

        it('should successfully connect to the database', function() {
            return expect(emailInDb).to.not.be.rejectedWith('could not connect to db');
            return expect(emailNotInDb).to.not.be.rejectedWith('could not connect to db');
        });
        it('should succesfully query the database', function() {
            return expect(emailInDb).to.not.be.rejectedWith('error querying DB');
            return expect(emailNotInDb).to.not.be.rejectedWith('error querying DB');
        });
        it('should always return the message object', function() {
            return expect(emailInDb).to.eventually.be.an('object');
            return expect(emailNotInDb).to.eventually.be.an('object');
        });
        describe('Message', function() {
            it('should always contain email, messageCount and manager properties', function() {
                return expect(emailInDb).to.eventually.have.all.keys('email', 'messageCount', 'manager');
                return expect(emailNotInDb).to.eventually.have.all.keys('email', 'messageCount', 'manager');
            });
            it('should set the manager to Kia if the email was not in the database', function() {
                return expect(emailInDb).to.eventually.have.property('manager', 'uMpU6Mn4GwXc2');
            });
        });
    });
});

describe('Yalla', function() {
    it('should exist', function() {
        expect(yalla).to.not.be.undefined;
    });
    describe('sendPriority', function() {

        const sendPriority = yalla.sendPriority;

        it('should exist', function() {
            expect(sendPriority).to.not.be.undefined;
        });

        let send = sendPriority({ email: 'kfarhang0@gmail.com', manager: 'uMpU6Mn4GwXc2' });

        it('should successfully connect to Yalla', function() {
            return expect(send).to.not.be.rejectedWith('error connecting to Yalla');
        });
        it('should get a 200 from Yalla', function() {
            return expect(send).to.not.be.rejectedWith('did not get 200 from Yalla');
        });
        it('should return true when the priority is succesfully added', function(){
        	return expect(send).to.eventually.equal(true);
        });
    });
})
