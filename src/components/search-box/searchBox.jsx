import React, { Component } from "react";
import proxify from "proxify-url";
import axios from "axios"; // workaround to use proxify for goodreads api to resolve cors issue from frontend
import "./searchBox.css";
import ENV from "../../constants";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { searchKey: "", lastSearchKey: "" };
    this.searchBoxRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.runAxios = this.runAxios.bind(this);
  }

  componentDidMount() {
    this.searchBoxRef.current.focus();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.submitSearch();
    }
  }

  runAxios(proxifyUrlBookTitle, callback) {
    axios
      .get(proxifyUrlBookTitle)
      .then(response => {
        callback(response);
      })
      .catch(e => {});
  }

  submitSearch() {
    if (this.state.searchKey.trim().length !== 0) {
      if (
        this.state.lastSearchKey === "" ||
        this.state.lastSearchKey !== this.searchBoxRef.current.value
      ) {
        this.setState({
          lastSearchKey: this.searchBoxRef.current.value
        });
        const proxifyUrlBookTitle = proxify(
          encodeURI(ENV.TITLE_API + ENV.KEY + "&q=" + this.state.searchKey),
          { inputFormat: "xml" }
        );
        this.props.isSearching(true);
        this.runAxios(proxifyUrlBookTitle, response => {
          this.props.isSearching(false);
          let searchResult = JSON.parse(response.request.response).query.results
            .GoodreadsResponse.search.results.work;
          if (searchResult === undefined) {
            this.props.setSearchResults([]);
          } else {
            this.props.setSearchResults(searchResult);
          }
        });
      }
    } else {
      this.setState({
        searchKey: ""
      });
      this.searchBoxRef.current.focus();
    }
  }

  render() {
    return (
      <p className="search-box-wrapper">
        <input
          type="text"
          className="search-box"
          name="searchKey"
          value={this.state.searchKey}
          ref={this.searchBoxRef}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          id="search-key"
        />
        <button
          className="submit-search"
          id="click-to-search"
          onClick={this.submitSearch}
        >
          <i className="fa fa-search" />
        </button>
      </p>
    );
  }
}

export default SearchBox;
