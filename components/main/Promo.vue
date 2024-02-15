<template>
  <div>
    <div class="video-bg">
      <video src="../../media/heroBg.webm" type="video/webm" autoplay muted loop></video>
      <div class="effects"></div>
      <div class="video-bg__content">
        <h2 class="slogan">{{ $t('slogan') }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.video-bg
  height: 100vh
  width: 100%
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center
  position: relative
  video
    position: absolute
    top: 0
    left: 0
    z-index: 1
    width: 100%
    height: 100vh
    object-fit: cover


.effects
  position: absolute
  object-fit: cover
  top: 0
  left: 0
  z-index: 2
  width: 100%
  height: 100vh
  background-color: rgba(0,0,0,0.3)
.video-bg__content
  z-index: 2
  color: #ffffff
  font-size: 40px
  display: flex
  justify-content: center
  flex-direction: column
.slogan
  font-family: "Helvetica Neue Bold", sans-serif
  color: #FFFFFF

</style>