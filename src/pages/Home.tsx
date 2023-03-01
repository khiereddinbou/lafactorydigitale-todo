import Todos from "../components/Todos";
import TopBar from "../components/TopBar";

const Home = () => {
  return (
    <div className="home bg-black">
      <div className="container d-flex flex-column align-items-center">
        <TopBar />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
