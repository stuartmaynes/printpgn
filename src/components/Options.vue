<template>
  <div id="print-options" v-if="games.length">
    <h2 class="font-bold mb-4">Print Options</h2>

    <ol class="mb-7">
      <li class="font-bold mb-1">Layout</li>
      <li class="flex">
        <label class="flex-grow text-center bg-white border rounded-l-md px-4 py-2" :class="{ 'bg-blue-500 text-white' : print.columns == 1 }">
          <input class="absolute invisible" type="radio" v-model="print.columns" v-bind:value="1"> 1
        </label>
        <label class="flex-grow text-center bg-white border-t border-b px-4 py-2" :class="{ 'bg-blue-500  text-white' : print.columns == 2 }">
          <input class="absolute invisible" type="radio" v-model="print.columns" v-bind:value="2"> 2
        </label>
      </li>
    </ol>

    <ol class="mb-6">
      <li class="font-bold mb-1">Print</li>
      <li>
        <label>
          <input type="checkbox" v-model="print.comments.columns">
          Comments column
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" v-model="print.comments.values">
          Comments text
        </label>
      </li>
    </ol>

    <ol>
      <li class="font-bold mb-1">Games</li>
      <li v-for="game in games" v-bind:key="game.id" class="mb-2">
        <label>
          <input type="checkbox" :value="game.id" v-model="game.print">
          {{ game.meta.Event }}
        </label>
      </li>
    </ol>
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

<style scoped></style>
