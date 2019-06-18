const Dfa1 = require('./dfa');
const Dfa2 = require('./dfa2');

const { tokens, states, transitions } = require('./statesAndTransitions');

const vendingMachine = new Dfa2();


vendingMachine.setTokens(tokens);
vendingMachine.setStates(states);
vendingMachine.setTransitions(transitions);

console.log(vendingMachine.processInput([40, 20]));
console.log('------------------------------------------------------------\n');
console.log(vendingMachine.processInput([20, 20]));
console.log('------------------------------------------------------------\n');
console.log(vendingMachine.processInput([20, 20, 20]));
console.log('------------------------------------------------------------\n');
console.log(vendingMachine.processInput([40, 40, 40]));
