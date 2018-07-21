import axios from "axios";

export default class Api {
  constructor() {
    this.API_URL = "https://localhost:44325";
  }
  getArticles = () => {
    return new Promise((resolve, reject) => {
      console.log("Fetching articles...");

      const url = `${this.API_URL}/api/articles`;

      axios.get(url).then(function(response) {
        console.log("Articles fetched.");
        resolve(response.data);
      });
    });
  };

  createArticle = newArticle => {
    return new Promise((resolve, reject) => {
      console.log("Saving article...");

      const url = `${this.API_URL}/api/articles`;

      axios.post(url, newArticle).then(function(response) {
        console.log("Article saved.", response);
        resolve(response.data);
      });
    });
  };

  deleteArticle = deleteArticle => {
    return new Promise((resolve, reject) => {
      console.log("Deleting article...");

      const url = `${this.API_URL}/api/articles/${deleteArticle.id}`;

      axios.delete(url).then(function(response) {
        console.log("Article deleted.");
        resolve(response.data);
      });
    });
  };
}
