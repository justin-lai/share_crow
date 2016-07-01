export default store => next => action => {
  const { type } = action;
  if (type === 'INIT') {
    try {
      const storedState = JSON.parse(
        localStorage.getItem('SHARE_CROW')
      );
      if (storedState) {
        store.dispatch({
          type: 'RESET_STATE',
          payload: storedState,
        });
      }

      return;
    } catch (e) {
      // Unable to load or parse stored state, proceed as usual
    }
  }

  next(action);
};
