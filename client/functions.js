NodeRP.Client = {};

NodeRP.Client.GetPOS = function() {
	let pos = GetEntityCoords(PlayerPedId(), false);
	let coords = JSON.stringify(pos);
	
	return coords;
};

NodeRP.Client.GetPlayers = function(ids) {
	if(ids != null) {
		if (NetworkIsPlayerActive(ids)) {
			let myid = GetPlayerServerId(ids);
			
			return myid;
		}
	}
}

NodeRP.Client.Notify = function(msg) {
	SetNotificationTextEntry('STRING');
	AddTextComponentSubstringWebsite(msg);
	DrawNotification(false, true);
};

RegisterNetEvent('NodeRP.Client.Notify');
onNet("NodeRP.Client.Notify", (msg) => {
   NodeRP.Client.Notify(msg);
});

NodeRP.Test = function() {
	return "hello";
};

RegisterCommand("testcmd", async (source, args) => {
	emit('chat:addMessage', { args: [ "BEFORE QUERY" ], color: [255, 97, 97] });
	
	con.query('SELECT * FROM players', function (err, result, fields) {
		if(err) throw err;
		
		emit('chat:addMessage', { args: [ "HELLO" ], color: [255, 97, 97] });
	});
});

NodeRP.Client.PlayerSpawned = function(pos) {
	NodeRP.Client.Notify("YE");
	NodeRP.Client.Notify(pos);
};