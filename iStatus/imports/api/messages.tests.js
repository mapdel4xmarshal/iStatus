import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
 
import { Messages } from './messages.js'; 
 
if (Meteor.isServer) {
  describe('Messages', () => {
    describe('methods', () => {
      const userId = Random.id();
      const otherUserId = Random.id();
      let messageId;
 
      beforeEach(() => {
        Messages.remove({});
        messageId = Messages.insert({
          messageText: 'test message',
          createdAt: new Date(),
          ownedBy: userId,
          username: 'testuser',
        });
      });
 
       it('user can delete owned message', () => {
        // Find the internal implementation of the message method so we can
        // test it in isolation
        const deleteMessage = Meteor.server.method_handlers['messages.remove'];
 
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId : userId };
 
        // Run the method with `this` set to the fake invocation
        deleteMessage.apply(invocation, [messageId]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 0);
      });
        
      it('user can post message ', () => {
        const insertMessage = Meteor.server.method_handlers['messages.insert'];
        const invocation = { userId : userId, username : "anotherTestUser" };
 
        const initialMessagesCount = Messages.find().count();
          
        insertMessage.apply(invocation, ["This a test message."]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), initialMessagesCount + 1);
      });
        
     it('user can retrieve message list ', () => {  
        // Verify that the message list is populated
        assert.isAbove(Messages.find().count(), 0);
      });
        
     it('user can delete other user message ', () => {  
        const deleteMessage = Meteor.server.method_handlers['messages.remove'];
 
        const invocation = { userId : otherUserId };
        
        //keep track of message total before delete attempt
         const initialMessagesCount = Messages.find().count();
         
        deleteMessage.apply(invocation, [messageId]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), initialMessagesCount - 1);
      });
        
      it('User can post messages while logged out ', () => {  
        const insertMessage = Meteor.server.method_handlers['messages.insert'];
        const invocation = { };
 
        const initialMessagesCount = Messages.find().count();
          
        insertMessage.apply(invocation, ["This another test message."]);
 
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), initialMessagesCount + 1);
      });
    });
  });
    
}