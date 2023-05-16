import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Home.css";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getCharacters();
  }, [page]);

  const getCharacters = async () => {
    try {
      const response = await axios.get(
        `https://localhost:8000/api/characters?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data["hydra:member"],
      ]);
      setTotalPages(response.data["hydra:totalItems"]);
    } catch (error) {
      console.error(error);
    }
  };

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>Home page</h1>
      <p>Bonjour {user && user.email}</p>
      <button className="logout-button" onClick={handleLogout}>
        Déconnexion
      </button>
      <p>Liste des personnages Rick et Morty</p>
      <InfiniteScroll
        dataLength={characters.length}
        next={goToNextPage}
        hasMore={page < totalPages}
        loader={
          <p>
            <i>Chargement...</i>
          </p>
        }
      >
        <div className="row">
          {characters.map((character, index) => (
            <div className="col-3 card" key={index}>
              <p className="card-title">{character.name}</p>
              <p className="card-badge">{character.status}</p>
              <img
                className="card-image"
                src={character.image}
                alt={character.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;