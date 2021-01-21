Vue.createApp({
    data() {
        return {
            pgn: '',
            games: [],
        }
    },
    watch: {
        pgn(input) {
            this.processGame(input);
        },
    },
    methods: {
        processGame(input)
        {
            let lines = input.split(/\n/);

            let game = this.newGame();

            lines.forEach(line => {

                // Does the line contain meta data
                if (line.match(/^\[.*\]$/)) {
                    let matches = line.match(/^\[(\S*)\s"(.*)"\]$/);

                    if (matches) {
                        game.meta[matches[1]] = matches[2];
                    }
                }
                // Does the line contain the moves
                else if (line.match(/^\d+\..*$/)) {

                    let variationStart = 0;
                    let variationEnd = 0;
                    let variation = '';

                    [...line].forEach((char) => {
                        if (char === '(') {
                            variationStart++;
                        }

                        if (variationStart > 0) {
                            variation += char;
                        }

                        if (char === ')') {
                            variationEnd++;

                            if (variationStart === variationEnd) {
                                game.variations.push(variation);

                                variationStart = 0;
                                variationEnd = 0;
                                variation = '';
                            }
                        }

                    });

                    game.variations.forEach((v) => {
                        line = line.replace(v, '');
                    });

                    game.moves = line.replace(/\d+\.\.\./g, '')
                        .replace(/\s{2}/g, '')
                        .split(/\d+\.\s/)
                        .filter((move) => {
                            return /^\S/.test(move)
                        })
                        .map((move) => {
                            let m = move.split(/\s+/)
                            return { white: m[0], black: m[1] }
                        })

                    this.games.push(game);

                    console.log(game);

                    game = this.newGame();
                }

            });
        },

        newGame() {
            return {
                meta: {},
                moves: [],
                variations: [],
            };
        }
    },
    mounted() {
    }
}).mount('#game')
