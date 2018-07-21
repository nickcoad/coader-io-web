import React, { Component } from "react";
import Articles from "./components/Articles";
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import Api from "./services/Api";
import ArticleEditor from "./components/ArticleEditor";

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: {
        loading: true,
        list: []
      }
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

  handleArticleCreating = newArticle => {
    let articles = [newArticle, ...this.state.articles.list];
    newArticle.creating = true;
    this.setState({ articles: { list: articles } });
  };

  handleArticleCreated = newArticle => {
    let articles = [...this.state.articles.list];
    let article = articles.filter(_ => _.id === newArticle.id)[0];
    article.creating = false;
    this.setState({ articles: { list: articles } });
  };

  handleArticleDeleting = deletingArticle => {
    let index = this.state.articles.list.indexOf(deletingArticle);
    console.log(index);

    let articles = [...this.state.articles.list];

    articles[index].deleting = true;

    this.setState({ articles: { list: articles } });
  };

  render() {
    let articles = [...this.state.articles.list].sort((a, b) => {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;

      return 0;
    });

    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">
            coader<span className="text--secondary">.io</span>
          </h1>
        </header>
        <main className="app__main">
          <ArticleEditor
            onArticleCreating={this.handleArticleCreating}
            onArticleCreated={this.handleArticleCreated}
          />
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
