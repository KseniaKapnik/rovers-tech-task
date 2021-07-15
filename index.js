const prompt = require('prompt');
const Headings = require('./headings').Headings;
const Moving = require('./moving').Movings;

const inputSchema = {
    properties: {
        square: {
            description: 'Enter the square of the plateau [x y]',
            pattern: /^[\d]+\s[\d]+$/,
            message: 'Square must in format [x y]',
            required: true,
            default: '5 5',
        },
        rovers: {
            description: 'Enter the rover coordinates heading and moves (to exit press ^C)',
            type: 'array',
            required: true,
            minItems: 1,
        },
    },
};


function parseInput({square, rovers}) {
    try {
        const parsedSquare = square.split(' ');

        const parsedRoversArr = [];
        rovers.forEach((rover) => {
            const parsedRover = rover.split(' ');
            const headingString = parsedRover[2];
            const moves = parsedRover[3] ? parsedRover[3].split('') : [];
            if (!Headings.validateHeadingString(headingString) || !Moving.validateMoves(moves)) {
                throw new Error('rovers data is invalid');
            }

            parsedRoversArr.push({
                x: parsedRover[0],
                y: parsedRover[1],
                heading: Headings.getHeading(headingString),
                moves,
            });
        });

        return {
            square: {
                x: parsedSquare[0],
                y: parsedSquare[1],
            },
            rovers: parsedRoversArr,
        };
    } catch (e) {
        throw e;
    }
}

function moveRovers(rovers, square) {
    rovers.forEach((rover) => {
        rover.moves.forEach((move) => {
            const newPosition = Moving.makeMove(move, rover, square);
            rover.x = newPosition.x;
            rover.y = newPosition.y;
            rover.heading = newPosition.heading;
        });
    });
}

function logRoverPosition(rover) {
    const stringHeading = Headings.getHeadingString(rover.heading);
    console.log(`${rover.x} ${rover.y} ${stringHeading}`);
}

prompt.start();

prompt.get(inputSchema, function (err, result) {
    if (err) {
        return onErr(err);
    }
    console.log('Input received');
    console.log('\n\nStart parsing input data');
    const parsedData = parseInput(result);
    const square = parsedData.square;
    const rovers = parsedData.rovers;
    console.log('\nData was parsed successfully');
    console.log('\nStart moving rovers');
    moveRovers(rovers, square);
    console.log('Moving was Ended');
    console.log('\nRovers new positions are');
    rovers.forEach((rover) => {
        logRoverPosition(rover);
    });
    console.log('\nFinish');

});

function onErr(err) {
    console.log(err);
    return 1;
}
