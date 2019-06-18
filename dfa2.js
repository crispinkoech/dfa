const iceCreams = require('./extras');

class DFA {
    constructor() {
        // Use Arrays or Sets or Maps?
        this.tokens = new Set();
        this.states = new Set();
        this.transitions = new Set();

        this.startingState = null;
    }

    setTokens(tokenArray) {
        const dfa = this;
        tokenArray.forEach(token => dfa.tokens.add(token));
    }

    setStates(statesArray) {
        const dfa = this;
        statesArray.forEach(({ state, startingState = false, acceptState = false }) => {
            const action = acceptState ? 'accept' : 'reject';
            dfa.states.add({ state, action });
            if (startingState) {
                dfa.startingState = { state, action };
            }
        });
    }

    setTransitions(transitionsArray) {
        const dfa = this;
        transitionsArray.forEach(({ state, input, nextState }) => dfa.transitions.add({ state, input, nextState}));
    }

    changeState(inputToken, currentState) {
        const dfa = this;
        if (!dfa.tokens.has(inputToken)) throw new Error(`Invalid Token: ${inputToken}`);

        const found = [...dfa.transitions].find(({ state, input }) => state === currentState && input === inputToken);
        if (!found) {
            throw new Error(`Couln't find a transition for input token ${inputToken} from state ${currentState}`);
        }

        return { tokenValue: inputToken, nextState: found.nextState };
    }

    processInput(inputString = []) {
        try {
            const dfa = this;

	        console.log(`Input String: ${inputString}\n`);

            const { total, state: resultingState } = inputString.reduce(({ total, state }, token) => {
                const { tokenValue, nextState } = dfa.changeState(token, state);

		        console.log(`State: ${state} | Value: ${total}`);
		        console.log(`Input: ${token} => Move to State: ${nextState}\n`);

                return {
                    total: total + tokenValue,
                    state: nextState
                };
            }, { total: 0, state: dfa.startingState.state });

	        console.log(`State: ${resultingState} | Value: ${total}`);

            const { action } = [...dfa.states].find(({ state }) => state === resultingState);

            if (action === 'accept') {
                return {
                    action,
                    Amount: total,
                    result: iceCreams(total),
                };
            } else {
                return {
                    action,
                    Amount: total,
                    result: 'Input rejected',
                };
            }
        } catch (err) {
            return { action: 'reject', message: err.message };
        }
    }
}

module.exports = DFA;
