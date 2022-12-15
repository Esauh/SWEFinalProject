import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "../App.css";

const Login = () => {
  const onClick = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
  };
  return (
    <div style={styles}>
      <button className='btn' onClick={onClick}>
        Login with Google
      </button>
    </div>
  );
};

const styles = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center",
};

export default Login;