const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = 'RGAPI-de722be0-3084-4e26-8551-4c94fc568be1';
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

function getRank(id) {
    return axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}

function getMatchList(puuid) {
    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}
app.get('/summoner/:userId', async (req, res) => {
    const nick = req.params.userId.split("+").join('/')
    const PUUID = await getPUUID(nick)
    const accountInfo = await getAccountInfo(PUUID)
    const championMastery = await getChampionMastery(PUUID)
    const rankInfo = await getRank(accountInfo.id)
    const matchList = await getMatchList(PUUID)
    return res.json({
        accountInfo,
        championMastery,
        rankInfo
    })
})
app.listen(4000, function() {
    console.log('Proxy server started on port 4000')
});