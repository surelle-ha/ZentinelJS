const { useSocket } = require("../../config/socket");
module.exports = function (app) {
	var Utility = {
		name: "Notification",
	};

	Utility.send = (Title, Content) => {
		const socket = useSocket();
		socket.emit("notification", { title: Title, content: Content });
	};

	return Utility;
};
