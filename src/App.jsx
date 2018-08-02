import React, { Component } from "react";
import Articles from "./components/Articles";
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import Api from "./services/Api";
import ArticleEditor from "./components/ArticleEditor";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: {
        loading: true,
        list: []
      },
      token: null
    };
  }

  componentDidMount = () => {
    // Get articles
    const api = new Api();
    api.getArticles().then(this.articlesLoaded);
  };

  articlesLoaded = articles => {
    this.setState({ articles: { loading: false, list: articles } });
  };

  handleLogin = token => {
    this.setState({ token });
  };

  handleLogout = token => {
    this.setState({ token: null });
  };

  handleArticleCreating = newArticle => {
    let articles = [newArticle, ...this.state.articles.list];
    newArticle.creating = true;
    this.setState({ articles: { list: articles } });
  };

  handleArticleCreated = response => {
    // Remove the newly created article from the list
    let articles = this.state.articles.list.filter(_ => _ != response.article);

    // Update the newly created article
    response.article.id = response.data.id;
    response.article.created_at = response.data.created_at;
    response.article.updated_at = response.data.updated_at;
    response.article.creating = false;

    // Create a new list with the new article included
    let newArticles = [response.article, ...articles];

    // Update state
    this.setState({ articles: { list: newArticles } });
  };

  handleArticleDeleting = deletingArticle => {
    let index = this.state.articles.list.indexOf(deletingArticle);
    console.log(index);

    let articles = [...this.state.articles.list];

    articles[index].deleting = true;

    this.setState({ articles: { list: articles } });
    
    const api = new Api();
    api.deleteArticle(deletingArticle).then(this.handleArticleDeleted);
  };

  handleArticleDeleted = response => {
    // Remove the deleted article from the list
    let articles = this.state.articles.list.filter(_ => _ != response.article);
    this.setState({ articles: { list: articles }});
  }

  render() {
    let articles = [...this.state.articles.list].sort((a, b) => {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;

      return 0;
    });

    return (
      <div className="app">
        <header className="app__header">
          <div className="app__header-inner">
            <h1 className="app__title">
              coader<span className="text--secondary">.io</span>
            </h1>
          </div>
        </header>
        <main className="app__main">
          <NavBar
            isLoggedIn={this.state.token !== null}
            handleLogout={this.handleLogout}
            handleLogin={this.handleLogin}
          />
          {this.state.token && (
            <ArticleEditor
              onArticleCreating={this.handleArticleCreating}
              onArticleCreated={this.handleArticleCreated}
            />
          )}
          <Articles
            articles={articles}
            loading={this.state.articles.loading}
            handleArticleDelete={this.handleArticleDeleting}
          />
        </main>
      </div>
    );
  }
}

export default App;
