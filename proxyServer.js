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
function getAccountInfo(puuid, region) {
    return axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))

}
function getChampionMastery(puuid, region) {
    return axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${API_KEY}`)
        .then(response => response.data)

        .catch(err => console.error(err))
}

function getGameModesStats(id, region) {
    return axios.get(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))

}

function getMatchList(puuid) {
    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}
function getMatch(id) {
    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}
function getMatchTimeline(id) {
    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${id}/timeline?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.error(err))
}

function getTopPlayers(region) {
  return axios.get(`https://${region}.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(err => console.error(err))
}

function getSummonerInfoById(region, id) {
  return axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${id}?api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(err => console.error(err))
}

function getNick(puuid) {
  return axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${API_KEY}`)
    .then(response => response.data)
    .catch(err => console.error(err))
}

async function createMatchListWithFullInfo(PUUID) {
    const matchList = await getMatchList(PUUID);
    const matchInfoPromises = matchList.map(id => getMatch(id));
    return Promise.all(matchInfoPromises);
}
function createPlayerGameStats(matchList, puuid) {
    return matchList.map((item) => {
        const playerIndex = item.metadata.participants.indexOf(puuid)
        const playerInfo = {...item.info.participants[playerIndex]};
        playerInfo.matchID = item.metadata.matchId;
        return playerInfo;
    })
}

function getGoldDifference(frames) {
    return frames.map(frame => calculateGoldDifference(frame.participantFrames))
}

function calculateGoldDifference(participantFrames) {
    let sumFirstFive = 0;
    let sumLastFive = 0;

    for (let i = 1; i < 6; i++) {
        sumFirstFive += participantFrames[i].totalGold;
        sumLastFive += participantFrames[i + 5].totalGold;
    }

    return sumFirstFive - sumLastFive;
}

function getChampionNames(data) {
  return data.info.participants.map(player => player.championName)
}
function trimArray(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

function cteateTeamData(data) {
    return [trimArray(data.playersData.slice(0,5)), trimArray(data.playersData.slice(5))]
}

function reformatTimelineData(data) {
    return data.info.participants.map(item => {
        return {
            ...item,
            frames: getAllItemsInTimestamp(data, item.participantId)

        }
    })
}
function getAllItemsInTimestamp(data, id) {
    return data.info.frames.map(item =>
        item.events.filter(event =>
            event.participantId === id && event.type === "ITEM_PURCHASED"
        )
    ).filter(array => array.length > 0);
}

app.get('/:region/summoner/:userId', async (req, res) => {
    try {
        const nick = req.params.userId.split("+").join('/');
        const region = req.params.region
        const PUUID = await getPUUID(nick);
        const accountInfo = await getAccountInfo(PUUID, region);
        const [championMastery, gameModesStats, matchList] = await Promise.all([
            getChampionMastery(PUUID, region),
            getGameModesStats(accountInfo.id, region),
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
app.get('/:region/match/:id', async (req, res) => {
    try {
        const matchId = req.params.id
        const region = req.params.region
        const [matchInfo, matchTimeline] = await Promise.all( [getMatch(matchId), getMatchTimeline(matchId)])
        const playerStatsPromises = matchInfo.info.participants.map(async playerStat => {
            const accountInfo = await getAccountInfo(playerStat.puuid, region)
            playerStat.rank = await getGameModesStats(accountInfo.id, region)
            return playerStat
        })
        matchInfo.info.participants = await Promise.all(playerStatsPromises)
        const goldDifference = getGoldDifference(matchTimeline.info.frames)
        const matchChampions = getChampionNames(matchInfo)

        const kills = {
            playersData: matchInfo.info.participants.map(player => player.kills),
            teamData: [matchInfo.info.teams[0].objectives.champion.kills, matchInfo.info.teams[1].objectives.champion.kills],
            name: 'championKill'
        }

        const goldEarned = {
            playersData: matchInfo.info.participants.map(player => player.goldEarned),
            teamData: [],
            name: 'goldEarned'
        }
        goldEarned.teamData = cteateTeamData(goldEarned)

        const wardsPlaced = {
            playersData: matchInfo.info.participants.map(player => player.wardsPlaced),
            teamData: [],
            name: 'wardsPlaced'
        }
        wardsPlaced.teamData = cteateTeamData(wardsPlaced)

        const creepStat = {
            playersData: matchInfo.info.participants.map(player => player.totalAllyJungleMinionsKilled + player.totalMinionsKilled),
            teamData: [],
            name: 'creepStat'
        }
        creepStat.teamData = cteateTeamData(creepStat)


        return res.json({
            matchInfo,
            matchTimeline,
            goldDifference,
            matchChampions,
            dataForGraphs: [kills, goldEarned, wardsPlaced, creepStat],
            playersItemsFrame: reformatTimelineData(matchTimeline)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/:region/topPlayers', async (req, res) => {
  try {
    const region = req.params.region
    let topPlayersList = await getTopPlayers(region)
    topPlayersList = await Promise.all(topPlayersList.slice(0, 15).map(async item => {
      const summonerInfo = await getSummonerInfoById(region, item.summonerId)
      const nickInfo = await getNick(summonerInfo.puuid)
      return {
        ...item,
        nickName: nickInfo.gameName + "#" + nickInfo.tagLine,
        icon: summonerInfo.profileIconId
      }
    }))
    return res.json(
      topPlayersList
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.listen(4000, function() {
    console.log('Proxy server started on port 4000')
});