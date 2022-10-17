export function getState(state) {
    return {
        stateStore: state
    };
};

export function setState(dispatch) {
    return {
        setStateDate: (value) => dispatch({ type: 'SET', data: value }),
    };
};

export function getToken(state) {
    return {
        token: state.auth.token
    };
};