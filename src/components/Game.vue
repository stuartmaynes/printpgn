<template>
  <div class="game overflow-hidden overflow-x-auto mt-20 print:mt-0 print:m-0 print:min-w-full" v-if="game.print">
    <div :class="{ 'min-w-500px': options.layout == 1, 'min-w-800px': options.layout == 2 }">
      <h2 class="font-bold mb-2 inline-block text-xl print:text-sm" v-if="options.title" contenteditable>{{ game.meta.Event }}</h2>

      <table class="text-sm w-full table-fixed print:min-w-full mb-4 print:leading-snug" v-if="options.meta">
        <tr>
          <td class="border print:border-gray-300 w-70px p-3 print:p-1">
            <h6 contenteditable class="font-bold text-lg leading-snug print:text-sm">White</h6>
            <p contenteditable>{{ game.meta.White }}</p>
          </td>
          <td class="border print:border-gray-300 w-70px p-3 print:p-1">
            <h6 contenteditable class="font-bold text-lg leading-snug print:text-sm">Black</h6>
            <p contenteditable>{{ game.meta.Black }}</p>
          </td>
          <td class="border print:border-gray-300 w-70px p-3 print:p-1">
            <h6 contenteditable class="font-bold text-lg leading-snug print:text-sm">Date</h6>
            <p contenteditable>{{ game.meta.Date }}</p>
          </td>
        </tr>
      </table>

      <table class="text-sm w-full table-fixed print:min-w-full print:leading-snug">
          <tr v-for="row in game.rows" v-bind:key="row" class="align-top">
              <template v-for="move in row" v-bind:key="move">
                <td class="border print:border-gray-300 w-50px p-3 print:p-1 font-bold text-center">{{ move.number }}.</td>
                <td class="border print:border-gray-300 w-70px p-3 print:p-1">{{ move.white }}</td>
                <td class="border print:border-gray-300 w-70px p-3 print:p-1">{{ move.black }}</td>
                <td class="border print:border-gray-300 p-3 print:p-1" contenteditable v-if="options.comments.column">
                  <template v-if="options.comments.text">{{ move.comment }}</template>
                </td>
              </template>
          </tr>
      </table>
      <div class="text-2xs pt-3 text-gray-200 hidden print:block" :class="{ 'break' : pageBreak }">Printed at printPGN.com</div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'

export default {
  components: {
    Logo,
  },
  props: {
    game: Object,
    options: Object,
    pageBreak: Boolean,
  },
}
</script>

<style scoped>
@media print {
  .break { page-break-after: always; }
}

.min-w-500px {
  min-width: 500px;
}

.min-w-800px {
  min-width: 800px;
}

@media screen {
  .game:first-child {
    margin-top: 2rem !important;
  }
}
</style>
