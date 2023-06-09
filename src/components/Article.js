import React, { useState } from "react";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = ({ article }) => {
  // console.log(article);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      auteur: article.auteur,
      contenu: editedContent,
      date: article.date,
    };

    axios.put("http://localhost:3003/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.auteur}</h3>
        <em> Posté le {dateParser(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.contenu}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.contenu}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}> Valider </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
