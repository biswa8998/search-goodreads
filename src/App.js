import React, { Component } from "react";
import SearchBox from "./components/search-box/searchBox";
import SearchResults from "./components/search-results/SearchResults";
import BookDetails from "./components/book-details/BookDetails";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingList: false,
      searchingDetail: false,
      searchResults: [],
      bookDetails: null,
      calculatedHeights: 0
    };
    this.isSearchingList = this.isSearchingList.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.isSearchingDetail = this.isSearchingDetail.bind(this);
  }

  isSearchingList(arg) {
    this.setState({
      searchingList: arg
    });
  }

  isSearchingDetail(arg) {
    this.setState({
      searchingDetail: arg
    });
  }

  setSearchResults(arg) {
    this.setState({
      searchResults: arg
    });
  }

  setBookDetails(arg) {
    this.setState({
      bookDetails: arg
    });
  }

  componentDidMount() {
    this.setState({
      calculatedHeights: window.innerHeight - this.jumboEle.clientHeight - 34
    });
  }

  render() {
    return (
      <div className="app">
        <div
          className="jumbotron text-center"
          ref={jumboEle => (this.jumboEle = jumboEle)}
        >
          <h1>
            Search <strong>GoodReads</strong>
          </h1>
          <small>Enter Book's Title / Author's Name in the box</small>
          <SearchBox
            isSearching={this.isSearchingList}
            setSearchResults={this.setSearchResults}
          />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 no-padding">
              <h3 className="text-center">
                <u>Results</u>
              </h3>
              <SearchResults
                searchResults={this.state.searchResults}
                searchingList={this.state.searchingList}
                setBookDetails={this.setBookDetails}
                isSearchingDetail={this.isSearchingDetail}
                calculatedHeights={this.state.calculatedHeights}
              />
            </div>
            <div className="col-sm-8" style={{ paddingRight: "0px" }}>
              <h3 className="text-center">
                <u>Book Detail</u>
              </h3>
              <BookDetails
                bookDetails={this.state.bookDetails}
                searchingDetail={this.state.searchingDetail}
                searchResults={this.state.searchResults}
                calculatedHeights={this.state.calculatedHeights}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
