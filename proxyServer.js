require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = process.env.VITE_APP_API_KEY;
function getPUUID(nick) {
    return axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nick}?api_key=${API_KEY}`)
        .then(response => response.data.puuid)
        .catch(err => console.error(err))
}
function getAccountInfo(puuid) {
    return axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))

}
function getChampionMastery(puuid) {
    return axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}

function getGameModesStats(id) {
    return axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))

}

function getMatchList(puuid) {
  return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(err => console.error(err))
}
async function createMatchListWithFullInfo(PUUID) {
  const matchList = await getMatchList(PUUID);
  const matchInfoPromises = matchList.map(id => {
    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`)
      .then(response => response.data)
      .catch(err => {
        console.error(err)
      });
  });
  return Promise.all(matchInfoPromises);
}
function createPlayerGameStats(matchList, puuid) {
  const playerGameStats = []
  matchList.forEach((item) => {
    const playerIndex = item.metadata.participants.indexOf(puuid)
    const playerInfo = {...item.info.participants[playerIndex]};
    playerInfo.matchID = item.info.gameId;
    playerGameStats.push(playerInfo)
  })
  return playerGameStats
}
app.get('/summoner/:userId', async (req, res) => {
    try {
        const nick = req.params.userId.split("+").join('/');
        const PUUID = await getPUUID(nick);
        const accountInfo = await getAccountInfo(PUUID);
        const [championMastery, gameModesStats, matchList] = await Promise.all([
            getChampionMastery(PUUID),
            getGameModesStats(accountInfo.id),
            createMatchListWithFullInfo(PUUID)
        ]);

        const playerPerformances = createPlayerGameStats(matchList, PUUID);

        return res.json({
            accountInfo,
            championMastery,
            gameModesStats,
            matchList,
            playerPerformances
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.listen(4000, function() {
    console.log('Proxy server started on port 4000')
});