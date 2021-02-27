import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CardMusic from "../../components/cardMusic/CardMusic";
import "./homePage.css";

const HomePage = () => {
  const [albums, setAlbums] = useState([
    { title: "Epic", description: "Example music album" }
  ]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container-home">
        <CardMusic albums={albums} />
      </div>
    </>
  );
};

export default HomePage;
