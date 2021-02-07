<template>
    <section>
      <h1 class="font-black text-white text-3xl leading-none mb-4">Print PGN</h1>
      <p class="mb-4 text-white">Paste your PGN into the box to print.</p>
      <textarea
          id="Print PGN"
          v-model="pgn"
          placeholder="Paste your PGN here."
          class="p-4 w-full h-96 rounded mb-4"
      >
      </textarea>
      <ol class="text-white">
        <li class="font-bold mb-2">Examples PGNs:</li>
        <li>
          <button @click="example">The Opera Game</button>
        </li>
      </ol>
    </section>
</template>

<script>
export default {

  data() {
    return {
      pgn: '',
      games: [],
    }
  },

  methods: {
    /**
     * PGN files may contain move than one game
     * A game may contain variations
     * A game may contain comments
     * The move notation may either be one continuous string or
     * broken by new lines (\n)
    */
    processInput(input)
    {
        this.games = [];

        const nonMetaLinesSplitByOneNewLinePattern = /([^\]\n])\n([^\n])/gm
        const threeOrMoreNewlinesPattern = /\n{3,}/gm
        const endBracketTwoNewlinesPattern = /\]\n\n/gm
        const metaDataPattern = /^\[(\S*)\s"(.*)"\]$/
        const moveNumPattern = /\d+\./
        const timeClickPattern = /{\[%clk.*?\].*?}/gm
        const criticalMovePattern = /{Critical\smove.}/igm
        const analysisPattern = /((=|∓|±)\s)?{(INACCURACY|MISTAKE|BLUNDER)\s?\(.+?\)}\s?.+?}.+?\)/gmi
        const turnPattern = /(?<white>\S+\+*#*)\s(?:{(?<commentBefore>.+)})?\s?(?<black>\S+\+*#*)?\s?(?:{(?<commentAfter>.+)})?/
        const openBracketPattern = /^\(.+/
        const closeBracketPattern = /^.+\)$/
        const blackToMovePattern = /^\d+\.{3}$/

        let game = this.newGame()

        /**
        * Clean the input into a consistent format and iterate through the
        * lines in order to create games from the input.
        *
        * Format
        * [key value] (meta data in square brackets)
        * 1... (moves, variations and commets as a single string)
        * \n (single empy line after moves)
        */

        // Ensure a newline is at the end of the string
        input = `${input.trim()}\n`

        input
            .replace(nonMetaLinesSplitByOneNewLinePattern, `$1 $2`)
            .replace(threeOrMoreNewlinesPattern, '\n\n')
            .replace(endBracketTwoNewlinesPattern, ']\n')
            .replace(timeClickPattern, '')
            .replace(analysisPattern, '')
            .replace(criticalMovePattern, '')
            .split(/\n/)
            .forEach(line => {
                line = line.trim()

                if (metaDataPattern.test(line)) {
                    let matches = line.match(metaDataPattern)
                    game.meta[matches[1]] = matches[2].replace(/\\/mg, '')

                } else if (moveNumPattern.test(line)) {

                    let mainLine = ''
                    let variation = ''
                    let brackets = 0

                    line.split(/\s/).forEach((str) => {

                        if (!str.trim()) { return }

                        if (openBracketPattern.test(str)) {
                            brackets++
                            variation += `${str} `
                        }

                        else if (closeBracketPattern.test(str)) {
                            brackets--
                            variation += `${str} `

                            if (brackets === 0) {
                                game.variations.push(variation.trim())
                                variation = ''
                            }
                        }

                        else if (brackets) {
                            variation += `${str} `

                        }

                        else if (!blackToMovePattern.test(str)) {
                            mainLine += `${str} `
                        }

                    })

                    mainLine.trim().split(moveNumPattern).forEach((move, i) => {
                        if (move.trim()) {
                            let matches = move.trim().match(turnPattern)

                            if (matches) {
                                for (let key in matches.groups) {
                                    if (typeof matches.groups[key] === 'undefined') {
                                        matches.groups[key] = ''
                                    } else {
                                        matches.groups[key] = matches.groups[key].trim().replace(/\\/, '')
                                    }

                                    matches.groups.comment = `${matches.groups.commentBefore} ${matches.groups.commentAfter}`.trim()
                                }

                                matches.groups.number = i

                                game.moves.push(matches.groups)
                            }
                        }
                    })


                } else if (game.moves.length) {
                    this.games.push(game)
                    game = this.newGame()

                }
            })

      this.$emit('processed', this.games)

    },

    newGame() {
        return {
            meta: {},
            moves: [],
            variations: [],
        }
    },

    example() {
      this.pgn = `[Event "The Opera House Game"]
[Site "Paris FRA"]
[Date "1858.??.??"]
[Round "?"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[Result "1-0"]
[EventDate "?"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "33"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 {This is a weak move already. — Fischer} 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 {Black is in what's like a zugzwang position here. He can't develop the [queen's] knight because the pawn is hanging, the bishop is blocked because of the queen. — Fischer} 9... b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 {And now for the memorable checkmating combination} 16. Qb8+!! Nxb8 17. Rd8# 1-0
      `
    }
  },

  watch: {
    pgn(input) {
      this.processInput(input)
    },
  },
}
</script>

<style scoped>
</style>
