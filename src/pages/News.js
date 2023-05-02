import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";
import { fireEvent } from "@testing-library/react";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [auteur, setAuteur] = useState("");
  const [contenu, setContenu] = useState("");
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3003/articles")
  //     .then((res) => setNewsData(res.data));
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(" test !");
    if (contenu.length < 100) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3003/articles", {
          auteur,
          contenu,
          date: Date.now(),
        })
        .then(() => {
          setError(false);
          setAuteur("");
          setContenu("");
          getData();
        });
    }
  };

  return (
    <div className="news-container">
      <Logo />
      <Navigation />
      <h1> News </h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuteur(e.target.value)}
          type="text"
          placeholder="Nom"
          value={auteur}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid $color-1" }}
          onChange={(e) => setContenu(e.target.value)}
          placeholder="Message"
          value={contenu}
        ></textarea>
        {error && <p> Veuillez ecrire un minimun de 100 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>

      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};
export default News;