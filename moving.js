const Headings = require('./headings').Headings;
const headingStrings = require('./headings').headingStrings;
const allowedMoves = ['M', 'R', 'L'];

class Moving {
    static validateMoves(moves) {
        let valid = true;
        moves.forEach((move) => {
            if (allowedMoves.indexOf(move) === -1) {
                valid = false;
            }
        });

        return valid;
    }

    static moveForward(rover, square) {
        const newPosition = {
            x: rover.x,
            y: rover.y,
        };
        const headingString = Headings.getHeadingString(rover.heading);
        switch (headingString) {
            case headingStrings.N: {
                if (newPosition.y + 1 <= square.y) {
                    newPosition.y++;
                }
                break;
            }
            case headingStrings.E: {
                if (newPosition.x + 1 <= square.x) {
                    newPosition.x++;
                }
                break;
            }
            case headingStrings.S: {
               if (newPosition.y - 1 >= 0) {
                    newPosition.y--;
                }
                break;
            }
            case headingStrings.W: {
                if (newPosition.x - 1 >= 0) {
                    newPosition.x--;
                }
                break;
            }
        }
        return newPosition;
    }


    static makeMove(move, rover, square) {
        switch (move) {
            case 'M': {
                const newPosition = Moving.moveForward(rover, square);
                rover.x = newPosition.x;
                rover.y = newPosition.y;
                break;
            }
            case 'R': {
                rover.heading = Headings.moveRight(rover.heading);
                break;
            }
            case 'L': {
                rover.heading = Headings.moveLeft(rover.heading);
                break;
            }

        }
        return rover;
    }
}

module.exports.Movings = Moving;
