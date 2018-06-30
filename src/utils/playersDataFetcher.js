var Utils = require('./utils');
var Config = require('./config');

var instance = null;

class PlayersDataFetcher {
    constructor() {
        if (instance) {
            return instance;
        }

        this.fetchedPlayers = {};

        instance = this;
    }

    fetch(playerID, callback) {
        if (this.fetchedPlayers.hasOwnProperty(playerID)) {
            callback(this.fetchedPlayers[playerID]);

            return;
        }

        Utils.fetchFromAPI(`${ Config.baseUrl }/player/${ playerID }`, 'GET', response => {
            this.fetchedPlayers[playerID] = response;
            callback(response);
        });
    }
}

module.exports = PlayersDataFetcher;