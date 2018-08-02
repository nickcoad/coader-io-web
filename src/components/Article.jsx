import React, { Component } from "react";
import RelativeTime from "react-relative-time";
import Button from "./forms/Button";

export default class Article extends Component {
  handleArticleDelete = () => {
    if (this.props.handleArticleDelete)
      this.props.handleArticleDelete(this.props.article);
  };

  render() {
    let { article } = this.props;

    let articleClasses = "article ";
    if (article.creating) articleClasses += "article--creating";
    if (article.deleting) articleClasses += "article--deleting";

    return (
      <div className={articleClasses}>
        <div className="article__header">
          <h1>{article.title}</h1>
          <span className="article__header-timestamp">
            {
              article.creating
                ? (<React.Fragment>Posting...</React.Fragment>) 
                : (<React.Fragment>Posted <RelativeTime value={article.created_at} titleFormat="D/MM/YYYY @ H:m"/></React.Fragment>)
            }
          </span>
        </div>
        <div
          className="article__content"
          dangerouslySetInnerHTML={{ __html: article.content_html }}
        />
        <div className="article__footer">
          <Button
            label="Delete"
            appearance="danger"
            onClick={this.handleArticleDelete}
          />
        </div>
      </div>
    );
  }
}
