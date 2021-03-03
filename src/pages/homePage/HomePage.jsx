import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CardMusic from "../../components/cardMusic/CardMusic";
import Loading from "../../components/loading/Loading";
import "./homePage.css";

const HomePage = () => {
  const [albums, setAlbums] = useState([
    { title: "Epic", description: "Example music album" }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-home">
        <Loading loading={loading} />
        <CardMusic albums={albums} />
      </div>
    </>
  );
};

export default HomePage;
