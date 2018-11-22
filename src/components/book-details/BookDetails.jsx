import React, { Component } from "react";
import "./BookDetails.css";

class BookDetails extends Component {
  render() {
    return (
      <div
        className="book-detail-wrapper"
        style={{ height: this.props.calculatedHeights }}
      >
        {this.props.searchResults.length === 0 ? (
          ""
        ) : this.props.searchingDetail ? (
          <h2 className="text-center">Searching...</h2>
        ) : this.props.bookDetails === null ? (
          ""
        ) : (
          <div className="book-details">
            <div className="book-title-author-details">
              <div className="image-wrapper">
                <img
                  src={this.props.bookDetails.image_url}
                  className="book-image"
                  alt={this.props.bookDetails.id + ".jpg"}
                />
              </div>
              <div className="book-title-author">
                <h3 className="book-title">
                  {this.props.bookDetails.title.indexOf("(") !== -1
                    ? this.props.bookDetails.title.substring(
                        0,
                        this.props.bookDetails.title.indexOf("(")
                      )
                    : this.props.bookDetails.title}
                </h3>
                <p className="series">
                  {this.props.bookDetails.title.indexOf("(") !== -1
                    ? this.props.bookDetails.title.substring(
                        this.props.bookDetails.title.indexOf("(") + 1,
                        this.props.bookDetails.title.indexOf(")")
                      )
                    : ""}
                </p>
                <p className="author-names">
                  {typeof this.props.bookDetails.authors.author instanceof Array
                    ? this.props.bookDetails.authors.author.map(ele => {
                        return ele.name + "<br/>";
                      })
                    : this.props.bookDetails.authors.author.name}
                </p>
                <p className="various-ratings">Ratings and All</p>
              </div>
            </div>
            <div className="book descriptions">
              <p className="book-description-p" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BookDetails;
