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

      axios.post(url, newArticle).then(response => {
        console.log("Article created.");
        resolve({  data:response.data, article: newArticle });
      });
    });
  }

  deleteArticle = deleteArticle => {
    return new Promise((resolve, reject) => {
      console.log("Deleting article...");

      const url = `${this.API_URL}/api/articles/${deleteArticle.id}`;

      axios.delete(url).then(function(response) {
        console.log("Article deleted.");
        resolve({  data:response.data, article: deleteArticle });
      });
    });
  };

  authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
      console.log("Authenticating...");

      const url = `${this.API_URL}/api/authenticate/`;

      axios.post(url, { username, password }).then(function(response) {
        console.log("Authenticated.");
        resolve(response.data);
      });
    });
  };
}
