<template>
  <section class="runes">
    <div class="runes__wrapper">
      <q-card>
        <q-tabs
          v-model="rune"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>
        
        <q-separator />
        
        <q-tab-panels v-model="rune" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          
          
        </q-tab-panels>
      </q-card>
    </div>
  </section>
</template>

<script setup >
const rune = ref('')
</script>

<style scoped lang="sass">
.runes
  background: $secondary-bg-color
  padding-top: 80px
  padding-bottom: 40px
  color: #b41a7b
  font-family: "Helvetica Neue Bold", sans-serif
  
  &__wrapper
    margin: 0 auto
    max-width: 1282px
    min-height: 800px
</style>