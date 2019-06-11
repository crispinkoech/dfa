const tokens = [20, 40];

const states = [{
    state: 0,
    startingState: true,
}, {
    state: 1,
}, {
    state: 2,
}, {
    state: 3,
    acceptState: true,
}];

const transitions = [{
    state: 0,
    input: 20,
    nextState: 1,
}, {
    state: 0,
    input: 40,
    nextState: 2,
}, {
    state: 1,
    input: 20,
    nextState: 2,
}, {
    state: 1,
    input: 40,
    nextState: 3,
}, {
    state: 2,
    input: 20,
    nextState: 3,
}, {
    state: 2,
    input: 40,
    nextState: 1,
}, {
    state: 3,
    input: 20,
    nextState: 1,
}, {
    state: 3,
    input: 40,
    nextState: 2,
}];

module.exports = { tokens, states, transitions };