<template>

  <div class="flex flex-col min-h-screen w-full">
    <header class="w-full">
      <p class="bg-blue-100 p-2 font-bold text-center text-sm text-blue-900 print:hidden">
        This app is currently in beta testing. If you have experienced an error please let me know.
      </p>
    </header>

    <section class="flex flex-grow flex-col md:flex-row">

      <aside class="flex flex-grow flex-col 3xl:flex-row md:w-4/12 lg:w-3/12 3xl:w-4/12 print:hidden">
        <sidebar @processed="notation" id="sidebar" class="flex-grow p-4 lg:p-6 bg-gray-800"/>
        <options :games="games" :print="print" class="flex-grow p-4 lg:p-6 bg-gray-100"/>
      </aside>

      <main class="flex-grow md:w-8/12 lg:w-9/12 3xl:w-8/12 p-4 lg:p-6 bg-white print:p-3">
        <h2 class="hidden print:block font-black text-gray-200 text-2xl leading-none mb-4">Print PGN</h2>
        <move-list :games="games" :print="print" class="w-full text-sm"/>
      </main>

    </section>
  </div>

</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Options from './components/Options.vue'
import MoveList from './components/MoveList.vue'

export default {
    components: {
      Sidebar,
      Options,
      MoveList,
    },

    data() {
        return {
          games: [],
          print: {
            columns: 1,
            comments: {
              columns: true,
              values: true,
            },
            variations: true,
          },
        }
    },

    methods: {

      chunk(arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      },

      columnise(totalColumns) {
        this.games.forEach((game) => {
          let totalRows = Math.ceil(game.moves.length / totalColumns)

          let moves = Array.from({ length: totalRows * totalColumns }, (v, i) => {
            return game.moves[i] || { number: i + 1 };
          });

          let columns = this.chunk(moves, totalRows)

          game.rows = Array.from({ length: totalRows }, (_, i) => {
            return Array.from({ length: totalColumns }, (_, n) => {
                return columns[n][i]
            });
          });

          game.print = true
        })
      },

      notation(data) {
        this.games = data
        this.columnise(this.print.columns)
      },

    },

    watch: {
      'print.columns': function(n) {
        this.columnise(n)
      }
    }
}
</script>

<style></style>
