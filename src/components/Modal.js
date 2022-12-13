import "../App.css";
import { DB_SCORES, SHOW_MODAL } from "../actions/types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import ModalItem from "./ModalItem";

const Modal = () => {
  const dispatch = useDispatch();
  const { db_scores } = useSelector((state) => state.game);

  const getData = async () => {
    const messageRef = collection(db, "LeaderBoards");
    const q = query(messageRef, orderBy("score", "desc"), limit(10));
    const queryData = await getDocs(q);
    const data = [];
    queryData.forEach((doc) => {
      data.push(doc.data());
    });

    dispatch({ type: DB_SCORES, payload: data });
  };

  const closeModal = (e) => {
    e.target.className === "modal" && dispatch({ type: SHOW_MODAL });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={styles.container}
      className='modal'
      onClick={(e) => closeModal(e)}
    >
      <div className='modal-content' style={styles.modalContent}>
        <button
          style={styles.btn}
          className='btn'
          onClick={() => dispatch({ type: SHOW_MODAL })}
        >
          Close
        </button>
        {db_scores?.map((item, index) => (
          <ModalItem item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingTop: 100,
  },
  modalContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    padding: 20,
    margin: "auto",
    backgroundColor: "#fefefe",
    height: "80vh",
    borderRadius: 30,
    overflow: "auto",
  },
  btn: {
    alignSelf: "end",
  },
};

export default Modal;