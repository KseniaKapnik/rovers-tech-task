const headingStrings = {
    N: 'N',
    E: 'E',
    S: 'S',
    W: 'W',
};
const cardinalPoints = {
    N: new Date((new Date()).setHours(0)),
    E: new Date((new Date()).setHours(6)),
    S: new Date((new Date()).setHours(12)),
    W: new Date((new Date()).setHours(18)),
};

class Headings {

    static getHeadingString(heading) {
        const hours = heading.getHours();
        switch (hours) {
            case 0:
                return headingStrings.N;
            case 6:
                return headingStrings.E;
            case 12:
                return headingStrings.S;
            case 18:
                return headingStrings.W;
        }
    }

    static getHeading(headingString) {
        return cardinalPoints[headingString];
    }

    static moveRight(heading) {
        const newHours = heading.getHours() + 6;
        heading.setHours(newHours);
        return heading;
    }

    static moveLeft(heading) {
        const newHours = heading.getHours() - 6;
        heading.setHours(newHours);
        return heading;
    }

    static validateHeadingString(headingString) {
        const values = Object.keys(headingStrings);
        return values.indexOf(headingString) !== -1;
    }

}

module.exports.headingStrings = headingStrings;
module.exports.Headings = Headings;
