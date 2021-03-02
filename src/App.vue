<template>
<div class="flex flex-col h-screen">
  <header class="p-2 bg-cyan-50 text-cyan-900 text-xs md:text-sm text-center print:hidden">
    This app is currently in beta testing. If you have
    <a href="/faqs/#errors" class="underline">experienced an error please
    let me know</a>.
  </header>

  <main class="flex flex-col md:flex-row flex-grow">

      <aside class="flex flex-grow flex-col 3xl:flex-row md:w-6/12 lg:w-4/12 text-sm print:hidden">
          <div class="3xl:w-7/12 p-3 lg:p-5 bg-gray-800 text-white relative overflow-hidden" :class="{ 'flex-grow': games.length == 0 }">
              <div class="relative z-10">
                <logo />

                <div class="mb-4 pb-3 border-b border-blue-gray-600">
                    <p class="mb-4">Paste your PGN into the box below. It will be formatted and ready to be printed. Use the display options to fine tune what is printed. <a class="underline py-4 text-cyan-400" href="/faqs/">Checkout the about page for more details.</a></p>
                    <textarea class="p-2 w-full rounded text-gray-900" v-model="PGN"></textarea>
                    <button class="mb-3" @click="setPGN(0)">clear</button>
                </div>

                <div>
                    <h3 class="text-lg font-bold text-cyan-400">Example PGNs</h3>
                    <p class="mb-4">Use these examples to try the app.</p>
                    <div>
                      <a class="mb-3 p-3 cursor-pointer border border-blue-gray-700 hover:bg-blue-gray-700 block" @click="setPGN(1)">
                        <div class="font-bold lg:text-lg leading-tight">The Opera House Game</div>
                        <div class="text-blue-gray-400">Single game with comments</div>
                      </a>
                    </div>
                    <div>
                      <a class="mb-3 p-3 cursor-pointer border border-blue-gray-700 hover:bg-blue-gray-700 block" @click="setPGN(2)">
                        <div class="font-bold lg:text-lg leading-tight">Spassky - Fischer World Championship 1972</div>
                        <div class="text-blue-gray-400">Multiple games without comments</div>
                      </a>
                    </div>
                </div>
              </div>
          </div>

          <div class="flex-grow 3xl:w-5/12 p-3 lg:p-5 bg-gray-100" v-if="games.length">
              <h3 class="mb-1 text-lg font-bold">Layout</h3>

              <div class="flex mb-6">
                <button class="p-3 w-1/2 text-center border bg-white rounded-l-md" @click="columnise(1)" :class="{ 'bg-cyan-500 text-white' : options.layout == 1 }">
                  <i class="fas fa-align-justify"></i>
                </button>

                <button class="p-3 w-1/2 text-center border-t border-r border-b bg-white rounded-r-md" @click="columnise(2)" :class="{ 'bg-cyan-500 text-white' : options.layout == 2 }">
                  <i class="fas fa-align-justify mr-1"></i><i class="fas fa-align-justify"></i>
                </button>
              </div>

              <h3 class="mb-1 text-lg font-bold">Include</h3>
              <ol class="mb-6">
                  <li class="mb-2">
                    <label class="flex cursor-pointer select-none align-top">
                      <input type="checkbox" v-model="options.title" class="mr-1 mt-1">
                      <span class="leading-snug">Game title</span>
                    </label>
                  </li>
                  <li class="mb-2">
                    <label class="flex cursor-pointer select-none align-top">
                      <input type="checkbox" v-model="options.meta" class="mr-1 mt-1">
                      <span class="leading-snug">Game meta</span>
                    </label>
                  </li>
                  <li class="mb-2">
                    <label class="flex cursor-pointer select-none align-top">
                        <input type="checkbox" v-model="options.comments.column" class="mr-1 mt-1">
                        <span class="leading-snug">Comments column</span>
                    </label>
                  </li>
                  <li class="mb-2">
                    <label class="flex cursor-pointer select-none align-top">
                      <input type="checkbox" v-model="options.comments.text" class="mr-1 mt-1">
                      <span class="leading-snug">Comments text</span>
                    </label>
                  </li>
              </ol>

              <h3 class="mb-1 text-lg font-bold">Games</h3>
              <ol class="mb-6">
                <li class="mb-2" v-for="game in games" v-bind:key="game">
                    <label class="flex cursor-pointer select-none align-top">
                        <input type="checkbox" v-model="game.print" class="mr-1 mt-1">
                        <span class="leading-snug">{{ game.meta.Event }}</span>
                    </label>
                </li>
              </ol>

                <button class="p-3 w-full text-center border bg-white rounded-md" onclick="javascript:window.print()">
                  <i class="fas fa-print"></i> Print
                </button>
          </div>
      </aside>

      <section id="games" class="md:flex flex-col flex-grow md:w-6/12 lg:w-8/12 bg-white relative" :class="{ 'hidden' : games.length == 0 }">
          <div class="p-3 lg:p-5 bg-white relative z-10" v-if="games.length">
            <div class="text-xs text-gray-600 border-b pt-2 pb-4 mb-4 print:hidden" :class="{ 'lg:hidden' : options.layout == 1, 'xl:hidden': options.layout == 2 }">
                <p>Scroll left-to-right to see the contents of the table. When printed the table will fit the width of the paper.</p>
            </div>
            <div>
              <game v-for="(game, i) in games" v-bind:key="game.id" :game="game" :options="options" :pageBreak="(i + 1) !== games.length" />
            </div>
          </div>
      </section>
  </main>
</div>
</template>

<script>
import Game from './components/Game.vue'
import Logo from './components/Logo.vue'
import { PGN } from './pgn/PGN.js'

export default {
  components: {
    Game,
    Logo,
  },
  methods: {

    columnise(totalColumns) {
      this.options.layout = totalColumns

      this.games.forEach((game) => {
        let totalRows = Math.ceil(game.moves.length / totalColumns)

        let moves = Array.from({ length: totalRows * totalColumns }, (v, i) => {
          return game.moves[i] || { number: i + 1 };
        });

        let columns = Array.from({ length: Math.ceil(moves.length / totalRows) }, (v, i) =>
          moves.slice(i * totalRows, i * totalRows + totalRows)
        );

        game.rows = Array.from({ length: totalRows }, (_, i) => {
          return Array.from({ length: totalColumns }, (_, n) => {
              return columns[n][i]
          });
        });

        game.print = true
      })
    },

    setPGN(i) {
      if (i == 0) this.PGN = ''
      if (i == 1) this.PGN = PGN.example(0)
      if (i == 2) this.PGN = PGN.example(1)
    },
  },

  watch: {
    /**
     * PGN files may contain move than one game
     * A game may contain variations
     * A game may contain comments
     * The move notation may either be one continuous string or
     * broken by new lines (\n)
    */
    PGN(input) {
      this.games = PGN.parser(input)
      this.columnise(1)
    }
  },

  data() {
    return {
      PGN: '',
      games: [],
      options: {
        layout: 1,
        meta: true,
        title: true,
        comments: {
          column: true,
          text: true,
        },
      },
    }
  }
}
</script>

<style scoped>
  textarea {
      height: 80px;
  }
  @media screen and (min-height: 400px) {
      textarea {
          height: 160px;
      }
  }
  @media screen and (min-height: 600px) {
      textarea {
          height: 260px;
      }
  }
  @media screen and (min-height: 800px) {
      textarea {
          height: 360px;
      }
  }

  @media screen {
    #games::before {
      content: 'PrintPGN';
      display: block;
      font-size: 60px;
      font-weight: 900;
      left: 50%;
      margin-left: -150px;
      margin-top: -50px;
      opacity: 0.10;
      position: absolute;
      text-align: center;
      top: 50%;
      width: 300px;
    }
  }
</style>
