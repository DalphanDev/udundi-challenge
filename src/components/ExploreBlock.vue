<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue'
import IconClose from './icons/IconClose.vue'

import { ref, type Ref, nextTick, computed } from 'vue'
const plusSign: Ref<HTMLElement | null> = ref(null)
const exploreBlock: Ref<HTMLElement | null> = ref(null)

const svgOpacity = ref(1) // Start fully visible

const showSVG = ref(true)
const showDetails = ref(false)
const isTransforming = ref(false)

const plusCoords = ref({ left: 0, top: 0 })
const exploreBlockCoords = ref({ left: 0, top: 0 })

const leftShift = ref(0)
const topShift = ref(0)

// It seems that it grows from the middle. So we need to shift up relative to half of the height of the rectangle.
// For example the coordinate of where the rectangle would be without shifting would be the svg coordinate - half of the height of the rectangle.

const calcTransform = () => {
  nextTick(() => {
    if (exploreBlock.value && plusSign.value) {
      // Fetch the coordinates of the plus sign
      // console.log(plusSign.value)
      const { left: plusLeft, top: plusTop } = plusSign.value.getBoundingClientRect()
      // console.log(plusCoords.value.left, plusCoords.value.top)
      const { left: exploreLeft, top: exploreTop } = exploreBlock.value.getBoundingClientRect()

      plusCoords.value = { left: plusLeft, top: plusTop }
      exploreBlockCoords.value = { left: exploreLeft, top: exploreTop }

      console.log(plusCoords.value, exploreBlockCoords.value)

      // Now we need to calculate how much we should shift left and up by.

      leftShift.value = exploreBlockCoords.value.left - plusCoords.value.left
      topShift.value = exploreBlockCoords.value.top - plusCoords.value.top + 345 - 22
      console.log(leftShift.value, topShift.value)
    }
  })
}

const showDetailsClick = () => {
  // Save the coordinates of the plus sign
  const { left, top } = plusCoords.value
  plusCoords.value = { left, top }

  // Calculate the transform target coordinates
  calcTransform()

  isTransforming.value = true

  setTimeout(() => {
    showDetails.value = true
    svgOpacity.value = 0
    setTimeout(() => {
      showSVG.value = false
      isTransforming.value = false
      topShift.value = 0
    }, 500)
  }, 1000) // After transition finishes...
}

const hideDetailsClick = () => {
  showSVG.value = true
  svgOpacity.value = 1
  showDetails.value = false
  leftShift.value = 0
  topShift.value = 0
}

// Computed style for the exploreBlock
const exploreBlockStyle = computed(() => ({
  opacity: showDetails.value ? 1 : 0,
  visibility: showDetails.value ? 'visible' : 'hidden'
  // transition: 'opacity 0.5s ease, visibility 0.5s'
}))

// Computed style for the detailsBlock
const detailsBlockStyle = computed(() => ({
  opacity: showSVG.value ? 1 : 0,
  visibility: showSVG.value ? 'visible' : 'hidden'
  // transition: 'opacity 0.5s ease, visibility 0.5s'
}))
</script>

<template>
  <div
    ref="exploreBlock"
    :class="[
      'explore-block absolute top-[13%] bottom-0 left-0 ml-[140px] bg-[#FFF] w-[580px] h-[690px] shadow-explore flex flex-col gap-[27px] pl-[66px] pr-[72px] pt-[72px]'
      // showDetails ? 'explore-block-visible' : 'explore-block-hidden'
    ]"
    :style="exploreBlockStyle"
  >
    <button @click="hideDetailsClick" class="absolute top-6 right-6">
      <IconClose />
    </button>
    <h2 class="font-didot font-bold text-[66px] text-[#611818] leading-none">Explore</h2>
    <p class="font-lato text-[18px] text-[#282828] leading-tight tracking-[0.35px]">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur?
    </p>
    <button class="w-[235px] h-[55px] bg-gradient-to-r from-[#611818] to-[#A36754]">
      <p class="font-lato font-bold text-[18px] tracking-[1.693px] select-none">READ MORE</p>
    </button>
  </div>
  <div :style="detailsBlockStyle" class="absolute bottom-0 left-0 mb-[234px] ml-[187px]">
    <h1
      :class="{ fadeOut: isTransforming }"
      class="font-didot font-bold text-[224px] leading-[240px] select-none transition-all duration-1000 animate-explore"
    >
      Explore
    </h1>
    <div class="z-10 relative top-[-20px]">
      <button
        ref="plusSign"
        @click="showDetailsClick"
        class="flex gap-5 items-center align-middle transition-all will-change-transform h-[43px]"
      >
        <IconPlus
          :style="{ opacity: svgOpacity, transform: `translate(${leftShift}px, ${topShift}px)` }"
          class="transition-all duration-1000"
          :class="{ transformed: isTransforming }"
        />
        <div v-if="isTransforming" class="placeholder"></div>
        <p
          :class="{ fadeOut: isTransforming }"
          class="font-lato text-2xl tracking-[0.625px] transition-fadeOut duration-1000"
        >
          More Details
        </p>
      </button>
    </div>
  </div>
</template>

<style>
.transformed {
  position: absolute;
  /* We need to figure out how much we should shift left and up by */
  z-index: 20;
  width: 580px; /* New width for rectangle */
  height: 690px; /* New height for rectangle */
  background-color: #fff; /* New background color for rectangle */
  border-radius: 0; /* Rectangle shape */
}

.fadeOut {
  opacity: 0;
  visibility: hidden;
}

.fadeOutMargin {
  margin-left: calc(43px + 1.25rem);
}

.placeholder {
  width: 43px;
  height: 43px;
}

.explore-block-hidden {
  opacity: 0;
  visibility: hidden;
}

.explore-block-visible {
  opacity: 1;
  visibility: visible;
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

.animate-explore {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>
