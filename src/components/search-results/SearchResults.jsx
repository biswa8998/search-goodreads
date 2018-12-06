import React, { Component } from "react";
import proxify from "proxify-url";
import axios from "axios"; // workaround to use proxify for goodreads api to resolve cors issue from frontend

import "./SearchResult.css";
import ENV from "../../constants";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.isSearchingDetail(true);
    const proxifyUrlIsbn = proxify(
      encodeURI(
        ENV.ISBN_API + e.target.getAttribute("name") + "?key=" + ENV.KEY
      ),
      { inputFormat: "xml" }
    );
    axios
      .get(proxifyUrlIsbn)
      .then(response => {
        this.props.isSearchingDetail(false);
        console.log(response.data.query.results.GoodreadsResponse);
        let bookDetail = response.data.query.results.GoodreadsResponse.book;
        if (bookDetail === undefined) {
          this.props.setBookDetails(null);
        } else {
          this.props.setBookDetails(bookDetail);
        }
      })
      .catch(e => {});
  }

  render() {
    return (
      <div
        className="search-results-list"
        style={{ height: this.props.calculatedHeights }}
      >
        {this.props.searchResults.length === 0 && !this.props.searchingList ? (
          ""
        ) : this.props.searchingList ? (
          <h2 className="text-center" id="msg-searching">
            Searching...
          </h2>
        ) : (
          <ul className="search-result-ul">
            {this.props.searchResults.map((ele, idx) => {
              return (
                <li
                  className="search-result-li"
                  key={idx}
                  name={ele.best_book.id.content}
                  onClick={this.handleClick}
                >
                  {ele.best_book.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchResults;
