import "./App.css";
import Board from "./components/Board";
import Layout from "./components/Layout";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import loader from "./images/loading.gif";

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    const styles = {
      display: "flex",
      height: "100vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
    };
    return (
      <Layout>
        <div style={styles}>
          <img style={{ height: 200, width: 300 }} src={loader} alt='loader' />
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <p>Error: {error}</p>
      </Layout>
    );
  }

  return (
    <div className='App'>
      <Layout>{user ? <Board /> : <Login />}</Layout>
    </div>
  );
}

export default App;