class DFA {
    constructor() {
        // Use Arrays or Sets or Maps?
        this.tokens = new Set();
        this.states = new Set();
        this.transitions = new Set();

        this.startingState = null;
        this.currentState = null;
    }

    // Initializes acceptable tokens for a given DFA
    setTokens(tokenArray) {
        const dfa = this;
        tokenArray.forEach(token => dfa.tokens.add(token));
    }

    // Initializes the states that a DFA can be in at any given time
    setStates(statesArray) {
        const dfa = this;
        statesArray.forEach(({ state, startingState = false, acceptState = false }) => {
            const action = acceptState ? 'accept' : 'reject';
            dfa.states.add({ state, action });
            if (startingState) {
                dfa.startingState = { state, action };
                dfa.currentState = { ...dfa.startingState };
            }
        });
    }

    // Initializes the possible transitions, given currentState and current input
    setTransitions(transitionsArray) {
        const dfa = this;
        transitionsArray.forEach(({ state, input, nextState }) => dfa.transitions.add({ state, input, nextState}));
    }

    // Takes an input and transits to the next state, given the current state and the set
    // of transitions defined above. Updates the current state if a transition is found.
    changeState(inputToken) {
        const dfa = this;
        if (!dfa.tokens.has(inputToken)) throw new Error(`Invalid Token: ${inputToken}`);

        const found = [...dfa.transitions].find(({ state, input }) => state === dfa.currentState.state && input === inputToken);
        if (found) {
            dfa.currentState = [...dfa.states].find(({ state }) =>  state === found.nextState );
        } else {
            throw new Error(`Couln't find a transition for input token ${inputToken} from state ${dfa.currentState}`);
        }
    }

    // Processes a given input and either accepts it or rejects it.
    processInput(inputString = []) {
        const dfa = this;

        try {
            inputString.forEach(token => dfa.changeState(token));

            const result = dfa.currentState.action;

            // Reset current state to starting state after input has been exhausted
            dfa.currentState = { ...dfa.startingState };

            return { result };
        } catch (err) {
            dfa.currentState = { ...dfa.startingState };

            return { result: 'reject', message: err.message };
        }
    }
}

module.exports = DFA;