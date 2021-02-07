<template>
  <div>
    <div v-for="game in games" v-bind:key="game.id" id="games">

      <div v-if="game.print">
        <h2 class="font-bold mb-2">{{ game.meta.Event }}</h2>

        <table class="w-full table-fixed">
          <tr v-for="row in game.rows" v-bind:key="row" class="align-top">
              <template v-for="move in row" v-bind:key="move">
                <td class="p-3 print:p-1 w-80px print:w-50px border print:border-gray-300 bg-gray-100 font-bold text-center">{{ move.number }}.</td>
                <td class="p-3 print:p-1 w-80px print:w-50px border print:border-gray-300">{{ move.white }}</td>
                <td class="p-3 print:p-1 w-80px print:w-50px border print:border-gray-300">{{ move.black }}</td>
                <td class="p-3 print:p-1 border print:border-gray-300" contenteditable v-if="print.comments.columns">
                  <template v-if="print.comments.values">{{ move.comment }}</template>
                </td>
              </template>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    games: Array,
    print: Object,
  },
}
</script>

<style scoped>
.c-number {
  width: 60px;
}
.c-move {
  width: 80px;
}
</style>
