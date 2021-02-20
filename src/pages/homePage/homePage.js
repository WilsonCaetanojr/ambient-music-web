import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import ModalPlayer from "../../components/player/player";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 style={{ marginTop: 60, marginLeft: 15 }}></h1>

      {openModal && (
        <ModalPlayer setOpenModal={setOpenModal} openModal={openModal} />
      )}
      <button
        style={{
          backgroundColor: "#2f2f33",
          width: "35%",
          maxWidth: 280,
          height: 100,
          borderRadius: 10,
          border: "solid 3px #232327",
          margin: 40,
          alignSelf: "center",
          justifySelf: "center"
        }}
        onClick={() => setOpenModal(true)}
      >
        <h2 style={{ color: "#d4d4e0" }}>Ambiente</h2>
      </button>

      <button
        style={{
          backgroundColor: "#2f2f33",
          width: "35%",
          maxWidth: 280,
          height: 100,
          borderRadius: 10,
          border: "solid 3px #232327",
          margin: 40,
          alignSelf: "center",
          justifySelf: "center"
        }}
        onClick={() => setOpenModal(true)}
      >
        <h2 style={{ color: "#d4d4e0" }}>Pacific</h2>
      </button>

      <button
        style={{
          backgroundColor: "#2f2f33",
          width: "35%",
          maxWidth: 280,
          height: 100,
          borderRadius: 10,
          border: "solid 3px #232327",
          margin: 40,
          alignSelf: "center",
          justifySelf: "center"
        }}
        onClick={() => setOpenModal(true)}
      >
        <h2 style={{ color: "#d4d4e0" }}>Exemplo 1</h2>
      </button>

      <button
        style={{
          backgroundColor: "#2f2f33",
          width: "35%",
          maxWidth: 280,
          height: 100,
          borderRadius: 10,
          border: "solid 3px #232327",
          margin: 40,
          alignSelf: "center",
          justifySelf: "center"
        }}
        onClick={() => setOpenModal(true)}
      >
        <h2 style={{ color: "#d4d4e0" }}>Exemplo 2</h2>
      </button>

      <button
        style={{
          backgroundColor: "#2f2f33",
          width: "35%",
          maxWidth: 280,
          height: 100,
          borderRadius: 10,
          border: "solid 3px #232327",
          margin: 40,
          alignSelf: "center",
          justifySelf: "center"
        }}
        onClick={() => setOpenModal(true)}
      >
        <h2 style={{ color: "#d4d4e0" }}>Exemplo 3</h2>
      </button>
    </>
  );
};

export default HomePage;
