const ObjectID = require('mongodb').ObjectID;

function convertValueForDB(input) {
    var match;
    // var ISODateString = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
    var ISODateString = /^(\d{4}|\+\d{6})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})Z|([\-+])(\d{2}):(\d{2})$/;

    if (input instanceof ObjectID) {
        return input;
    }
    if (typeof input !== 'string') {
        return input;
    }
    try {
        // MongoDB's ObjectID constructor accepts number, 12-byte string or 24-byte
        // hex string. For LoopBack, we only allow 24-byte hex string, but 12-byte
        // string such as 'line-by-line' should be kept as string
        if (/^[0-9a-fA-F]{24}$/.test(input)) {
            return new ObjectID(input);
        } else if ((match = input.match(ISODateString))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                return new Date(milliseconds);
            }
        }
        return input;
    } catch (e) {
        return input;
    }
}

export function convertForDB(input) {
    if (typeof input !== 'object') return input;
    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;
        var value = input[key];
        if (typeof value === 'string') {
            input[key] = convertValueForDB(value);
        } else if (typeof value === 'object') {
            input[key] = convertForDB(value);
        }
    }
    return input;
}
