import { combineReducers } from "redux";
// eslint-disable-next-line
import gamePlay from "./gamePlay";

export default combineReducers({
  game: gamePlay,
});