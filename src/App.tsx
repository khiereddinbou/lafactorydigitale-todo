import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { InitialStateType } from "./redux/slice";
import SignInUp from "./pages/SignInUp";

function App() {
  const user = useSelector((state: InitialStateType) => state.user);
  return (
    <div className="App bg-black">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <SignInUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
