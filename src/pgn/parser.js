function newGame() {
    return {
        meta: {},
        moves: [],
        variations: [],
    }
}

export function parser(png) {
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

    let games = []
    let game  = newGame()

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
    let input = `${png.trim()}\n`

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
                games.push(game)
                game = newGame()
            }
        })

    return games
}
