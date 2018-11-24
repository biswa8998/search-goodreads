import React, { Component } from "react";
import "./BookDetails.css";

class BookDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            savedHeight: null
        };
    }
  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div
        className="book-detail-wrapper"
        style={{ height: this.props.calculatedHeights }}
        ref={wrapper => (this.wrapper = wrapper)}
      >
        {this.props.searchResults.length === 0 ? (
          ""
        ) : this.props.searchingDetail ? (
          <h2 className="text-center">Loading...</h2>
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
                      : '\u00A0'}
                  </p>
                <p className="author-names"><small>By: </small>
                  {this.props.bookDetails.authors.author instanceof Array
                    ? this.props.bookDetails.authors.author.map((ele, idx) => {
                        return (idx < this.props.bookDetails.authors.author.length-1)?`${ele.name}, `: ele.name;
                      })
                    : this.props.bookDetails.authors.author.name}
                </p>
                <p className="book-pages">{(this.props.bookDetails.num_pages)?`${this.props.bookDetails.num_pages}  Pages`:'No Page Information'}</p>
                <p className="various-ratings">
                    <span className="average-rating">{(this.props.bookDetails.average_rating)?`Avg. Rating: ${this.props.bookDetails.average_rating}`:'No Average Rating'}</span>
                    <span className="book-ratings">{(this.props.bookDetails.work.ratings_count.content)?`Ratings: ${this.formatNumber(this.props.bookDetails.work.ratings_count.content)}`:'No Ratings'}</span>
                    <span className="book-reviews">{(this.props.bookDetails.work.text_reviews_count.content)?`Ratings: ${this.formatNumber(this.props.bookDetails.work.text_reviews_count.content)}`:'No Reviews'}</span>
                </p>
              </div>
            </div>
            {
                (this.props.bookDetails.description)?<div className="book-descriptions" style={{ height: this.wrapper.clientHeight - 236 }} dangerouslySetInnerHTML={{ __html: this.props.bookDetails.description }}></div>
                :
                <div className="book-descriptions" style={{ height: this.wrapper.clientHeight - 236 }}>No description available</div>
            }
          </div>
        )}
      </div>
    );
  }
}

export default BookDetails;
