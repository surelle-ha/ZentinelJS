const { Server } = require("socket.io");
let io = null;

function initSocket(server) {
	io = new Server(server, {
		cors: {
			origin: "*", 
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
        console.log(`[System] Connected Users: ${io.engine.clientsCount}`);
	});

	return io;
}

function useSocket() {
	if (!io) {
		throw new Error("Socket.io not initialized!");
	}
	return io;
}

module.exports = { initSocket, useSocket };
