import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CardMusic from "../../components/cardMusic/CardMusic";

const HomePage = () => {
  const [albums, setAlbums] = useState([
    { title: "Epic", description: "Example music album" }
  ]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 style={{ marginTop: 60, marginLeft: 15 }}></h1>

      <CardMusic albums={albums} />
    </>
  );
};

export default HomePage;
