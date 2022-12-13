import { DECREMENT, ACTIVE_ID } from "./types";
import store from "../store";

let timeInterval;

const getRandomID = (id) => {
  const randomNum = Math.floor(Math.random() * 12 + 1);

  if (randomNum === id) {
    getRandomID(id);
  }

  return randomNum;
};

const decrement =
  (stop = false) =>
  (dispatch) => {
    if (!stop) {
      timeInterval = setInterval(() => {
        const state = store.getState();

        dispatch({ type: DECREMENT });
        dispatch({
          type: ACTIVE_ID,
          payload: getRandomID(state.game.activeID),
        });
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }
  };

const increaseSpeed = (speed) => (dispatch) => {
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    const state = store.getState();

    dispatch({ type: DECREMENT });
    dispatch({
      type: ACTIVE_ID,
      payload: getRandomID(state.game.activeID),
    });
  }, speed);
};

const allActions = {
  decrement,
  increaseSpeed,
};

export default allActions;