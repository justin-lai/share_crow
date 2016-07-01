export default store => next => action => {
  const loaded = localStorage.getItem('SHARE_CROW_LOADED');
  if (loaded !== 'false') {
    const state = store.getState();
    localStorage.setItem('SHARE_CROW', JSON.stringify(state));
  }

  next(action);
};
