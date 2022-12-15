import { useEffect } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../actions/actions";
import { GAME_ON, RESET, SHOW_MODAL } from "../actions/types";
import { db, auth } from "../firebase";
import Modal from "./Modal";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import fail from "../images/missclick.png";
import Trophy from "./Trophy";
import SpotifyDashBoard from "./SpotifyDashBoard";

const Board = () => {
  const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  const code = new URLSearchParams(window.location.search).get("code")
  const dispatch = useDispatch();
  console.log(auth);
  const { activeID, time, score, gameOn, showModal, showPopUp } = useSelector(
    (state) => state.game
  );

  const start = () => {
    dispatch(allActions.decrement(false, activeID));
    dispatch({ type: GAME_ON });
    dispatch({ type: RESET });
  };

  useEffect(() => {
    if (time === 0) {
      dispatch(allActions.decrement(true));
      dispatch({ type: GAME_ON });
      submit();
    }
    // eslint-disable-next-line
  }, [time]);

  useEffect(() => {
    if (score >= 15) {
      dispatch(allActions.increaseSpeed(600));
    } else if (score >= 10) {
      dispatch(allActions.increaseSpeed(700));
    }
    // eslint-disable-next-line
  }, [score]);

  const submit = async () => {
    await addDoc(collection(db, "leaderBoard"), {
      score,
      timestamp: serverTimestamp(),
      user: auth.currentUser.displayName,
      userImg: auth.currentUser.photoURL,
    });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  
  const spotify = () => {
     window.location=AUTH_URL;
    console.log("Spotify started");
    
  };

  return (
    <div style={styles.main}>
      {showModal && <Modal />}
      <img style={styles.img} src={auth.currentUser.photoURL} alt='user' />
      <h1>{auth.currentUser.displayName}</h1>
      <h1>Time: {time}</h1>
      <h1>Score: {score}</h1>
      <button onClick={start} className={`${gameOn ? "hide" : null} btn`}>
        Start
      </button>

      <button onClick={signOutUser} className={`${gameOn ? "hide" : null} btn`}>
        Sign Out
      </button>

      <button
        onClick={() => dispatch({ type: SHOW_MODAL })}
        className={`${gameOn ? "hide" : null} btn`}
      >
        LeaderBoard
      </button>
      

      {code!= null &&
      <div>
      <SpotifyDashBoard code={code}/>
      </div>}
      <button 
      onClick={ spotify} className={`${gameOn ? "hide" : null} btn`}>
        Spotify
      </button>
      
      
      <div className='board__container'>
        <Trophy id={1} />
        <Trophy id={2} />
        <Trophy id={3} />
        <Trophy id={4} />
        <Trophy id={5} />
        <Trophy id={6} />
        <Trophy id={7} />
        <Trophy id={8} />
        <Trophy id={9} />
        <Trophy id={10} />
        <Trophy id={11} />
        <Trophy id={12} />
      </div>
      <img
        style={!showPopUp ? styles.popup : styles.showPopUp}
        src={fail}
        alt='fails'
      />
    </div>
  );
};

const styles = {
  main: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    width: 500,
    height: 400,
    display: "flex",
    flexWrap: "wrap",
  },
  start_button: {
    backgroundColor: "#FCBC5C",
    marginBottom: "1rem",
    border: "1px solid white",
    width: "15%",
    padding: "1rem",
    cursor: "pointer",
    borderRadius: "100px 100px",
    color: "#fff",
  },
  popup: {
    height: 300,
    width: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    transition: "transform 1s",
    transform: `translateY(100%)`,
  },
  showPopUp: {
    height: 300,
    width: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    transition: "transform 1s",
  },
  img: {
    borderRadius: 50,
    height: 100,
    width: 100,
    border: "4px solid #FCBC5C",
    marginTop: 40,
  },
};

export default Board;