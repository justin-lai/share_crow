export default store => next => action => {
  const state = store.getState();
  localStorage.setItem('SHARE_CROW', JSON.stringify(state));

  next(action);
};
