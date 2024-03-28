<template>
  <DownloadPageSpinner v-if="accountStore.isLoading"/>
  <section class="top-players" v-if="playersData">
    <div class="top-players__wrapper">
      <q-list separator class="player-list">
        <div class="title">{{$t('bestPlayers')}}</div>
        <q-item clickable v-ripple class="player" v-for="(player, index) of playersData" @click="goToSummonerPage(player.nickName)">
          <div class="player__position">{{index + 1}}</div>
          <q-img class="player__icon" :src="getProfileIconUrl(player.icon)"/>
          <div class="player__nick">{{player.nickName}}</div>
          <div class="rank">
            <img class="rank__emblem" :src="getEmblemImagePath(player.tier)" alt="emblem"/>
            <div class="rank__tier">{{$t(player.tier)}} - {{player.leaguePoints}} LP</div>
          </div>
          <div class="games">
            <div class="games__win">
              {{player.wins}} {{$t('wins')}}
            </div>
            <div class="games__lose">
              {{player.losses}} {{$t('losses')}}
            </div>
          </div>
        </q-item>
      </q-list>
     
    </div>
  </section>
</template>

<script setup >
import {getProfileIconUrl} from "~/services/getProfileIconUrl";
import {getEmblemImagePath} from "~/utils/getDataUtils/getEmblemImagePath";
import DownloadPageSpinner from "~/components/UI/DownloadPageSpinner.vue";

const router = useRouter()

const accountStore = useAccountStore()
const playersData = shallowRef(null)
onMounted(async () => {
  playersData.value = await accountStore.getTopPlayersInfo()
})
watch(()=>accountStore.region, async () => {
  playersData.value = await accountStore.getTopPlayersInfo()
})
function goToSummonerPage(nick) {
  router.push(`/summoner/${nick.replace('#', '+')}`)
}
</script>

<style scoped lang="sass">
.top-players
  font-family: "Helvetica Neue Bold", sans-serif
  
  &__wrapper
    max-width: 1200px
    padding: 50px
    margin: 0 auto
.title
  color: $blue-color
  margin: 20px auto
  font-size: 24px
.player-list
  width: 50em
  display: flex
  flex-direction: column
  margin: 20px auto
.player
  display: flex
  height: 90px
  align-items: center
  justify-content: space-around
  background-color: $content-bg-color
  transition: 0.6s all
  &:hover
    background-color: #303030
  &__position
    color: $gold-color
    font-size: 15px
  &__icon
    width: 48px
    height: 48px
    margin-left: 20px
    margin-right: 5px
  &__nick
    width: 12em
    color: $blue-color
.rank
  display: flex
  flex-direction: column
  align-items: center
  &__emblem
    width: 48px
    height: 48px
  &__tier
    color: #fff
    
.games
  &__win
    color: $green-text
    border-bottom: #849fbb 2px solid
  &__lose
    color: $red-text
</style>