import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { SCORE, SHOW_POP_UP } from "../actions/types";

const Trophy = ({ id }) => {
  const dispatch = useDispatch();

  const { activeID, gameOn, showPopUp } = useSelector((state) => state.game);
  const handleClick = (e) => {
    if (e.target.className === "box active") {
      dispatch({ type: SCORE });
      e.target.classList.remove("active");
    }
    if (e.target.className === "box false" && gameOn) {
      if (!showPopUp) {
        const audio = new Audio("/missclick.mp3");
        audio.play();
        dispatch({ type: SHOW_POP_UP });
        setTimeout(() => {
          dispatch({ type: SHOW_POP_UP });
        }, 600);
      }
    }
  };
  return (
    <div
      className={`box ${activeID === id && "active"}`}
      onClick={(e) => handleClick(e)}
    ></div>
  );
};

export default Trophy;