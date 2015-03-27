/*global module,process*/
var NodeGit = require('node-gitter'),
	math = require('mathjs');

module.exports = {
	_nodeGit: new NodeGit('30fd3323f63af340da084cd5955ce7e809bfeb90'),
	_regExp: /calc[0-9\*\/\-()\. +]+/g,
	_room: {},

	init: function (roomName) {
		this._nodeGit.rooms
			.join(roomName)
			.then(this._onRoomJoin.bind(this))
			.fail(this._onRoomJoinFail);
	},

	_onRoomJoin: function (room) {
		this._room = room;

		console.log('You feel a strange smell. It seems that bot has joined to the room');
		room.listen().on('message', this._parseMessage.bind(this));
		console.log('Bot has started to read each message and send all suspicious ones to the FBI');
	},

	_onRoomJoinFail: function () {
		console.log('Bot is running around in circles and can\'t find the door. It seems that you specified a wrong room');
		process.exit(1);
	},

	_sendMessage: function(mathExp) {
		this._room.send(mathExp + '=' + math.eval(mathExp));
	},

	_parseMessage: function (msg) {
		var item;

		while ((item = this._regExp.exec(msg.text)) !== null) {
			try {
				this._sendMessage(item[0].replace('calc', '').trim());
				console.log('Bot has successfully calculated math expression and been waiting for a cookie');
			} catch (e) {
				console.log('Bot can\'t calculate ' + item[0].replace('calc', '').trim() + '. Bot was drinking beer with bot-dudes when he had that lesson at school');
			}
		}
	}
};
