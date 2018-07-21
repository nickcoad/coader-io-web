import React, { Component } from "react";
import Article from "./Article";
import LoadingSpinner from "./LoadingSpinner";

export default class Articles extends Component {
  render() {
    let { articles, loading, handleArticleDelete } = this.props;
    return (
      <React.Fragment>
        {loading && <LoadingSpinner />}

        {!loading && (
          <div className="articles">
            {articles.map((article, i) => {
              return (
                <Article
                  key={i}
                  article={article}
                  handleArticleDelete={handleArticleDelete}
                />
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}
