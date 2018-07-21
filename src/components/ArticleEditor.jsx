import React, { Component } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import Button from "./Button";
import Api from "../services/Api";

export default class ArticleEditor extends Component {
  converter = Showdown.Converter;
  constructor(props) {
    super(props);
    this.state = {
      mdeState: null
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    });
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState: mdeState });
  };

  handleSubmitClick = () => {
    const api = new Api();
    const { onArticleCreating, onArticleCreated } = this.props;
    const { markdown, html } = this.state.mdeState;

    const newArticle = {
      title: this.state.articleTitle,
      content_html: html,
      content_markdown: markdown,
      category_id: "ce3c1c0f-78eb-44ee-a6c7-dc0e6f6f9a10"
    };

    onArticleCreating(newArticle);
    api.createArticle(newArticle).then(onArticleCreated);
  };

  handleArticleTitleChange = event => {
    this.setState({ articleTitle: event.target.value });
  };

  render() {
    return (
      <div className="article-editor">
        <input type="text" onChange={this.handleArticleTitleChange} />
        <ReactMde
          onChange={this.handleValueChange}
          editorState={this.state.mdeState}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
        <Button label="Submit" onClick={this.handleSubmitClick} />
      </div>
    );
  }
}
