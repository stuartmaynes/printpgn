import { parser } from './parser.js'
import { examples } from './examples.js'

const PGN = {
    example: (i) => {
        return examples()[i]
    },
    parser: (input) => {
        return parser(input)
    },
}

export { PGN }
