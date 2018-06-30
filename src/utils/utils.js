module.exports = {
    sortPlayersByPosition: playersList => {
        var sortedPlayers = { 
            fw: [], 
            mf: [], 
            df: [], 
            gk: [] 
        };

        for (var playerID in playersList) {
            sortedPlayers[playersList[playerID].position.toLowerCase()].push(playersList[playerID]);
        }

        return sortedPlayers;
    },
    translatePositons: position => {
        var positions = {
            gk: 'Goalkeeper',
            df: 'Defender',
            mf: 'Midfielder',
            fw: 'Forward'
        };

        return positions[position];
    },
    fetchFromAPI: (url, method, callback) => {
        fetch(url, {
            method: method
        }).then(response => response.json()).then(callback);
    },
    hashPassword: password => {
        return btoa(password);
    },
    trimPlayerName: name => {
        var splittedName = name.split(' ');

        return splittedName.map((partialName, index) => (index === splittedName.length - 1) ? partialName : (partialName[0])).join('. ');
    },
    objectToArray: object => {
        var array = [];

        for (var key in object) {
            array.push(object[key]);
        }

        return array;
    },
    parseInt: number => {
        return parseInt(number, 10);
    },
    sortArrayByKey: (array, key) => {
        return array.sort((item1, item2) => item1[key] < item2[key] ? -1 : (item1[key] > item2[key] ? 1 : 0));
    } 
};