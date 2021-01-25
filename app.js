Vue.createApp({
    data() {
        return {
            pgn: '',
            games: [],
        }
    },
    watch: {
        pgn(input) {
            this.processInput(input)
        },
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
            const threeOrMoveNewlinesPattern = /\n{3,}/gm
            const endBracketTwoNewlinesPattern = /\]\n\n/gm
            const metaDataPattern = /^\[(\S*)\s"(.*)"\]$/
            const moveNumPattern  = /\d+\./
            const turnPattern = /(?<white>\S+\+*#*)\s(?:{(?<whiteComment>.+)})?\s?(?<black>\S+\+*#*)?\s?(?:{(?<blackComment>.+)})?/
            const openBracketPattern  = /^\(.+/
            const closeBracketPattern  = /^.+\)$/
            const blackToMovePattern  = /^\d+\.{3}$/

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
                .replace(threeOrMoveNewlinesPattern, '\n\n')
                .replace(endBracketTwoNewlinesPattern, ']\n')
                .split(/\n/)
                .forEach(line => {
                    if (metaDataPattern.test(line)) {
                        let matches = line.match(metaDataPattern)
                        game.meta[matches[1]] = matches[2]

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

                        mainLine.trim().split(moveNumPattern).forEach((move) => {
                            if (move.trim()) {
                                matches = move.trim().match(turnPattern)

                                for (key in matches.groups) {
                                    if (typeof matches.groups[key] === 'undefined') {
                                        matches.groups[key] = ''
                                    } else {
                                        matches.groups[key] = matches.groups[key].trim()
                                    }
                                }

                                game.moves.push(matches.groups)
                            }
                        })


                    } else {

                        if (game.moves.length) {
                            this.games.push(game)
                        }

                        game = this.newGame()
                    }
                })
        },

        newGame() {
            return {
                meta: {},
                moves: [],
                variations: [],
            }
        },
    },
    mounted() {
    }
}).mount('#game')
