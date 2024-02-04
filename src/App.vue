<script setup lang="ts">
import ExploreBlock from './components/ExploreBlock.vue'
import SocialButtons from './components/SocialButtons.vue'
</script>

<template>
  <main class="w-full h-full">
    <div class="w-[413px] h-full bg-[#611818]" />
    <ExploreBlock />
    <SocialButtons />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
