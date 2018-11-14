import React, { Component } from 'react';
import proxify from 'proxify-url';
import axios from 'axios';  // workaround to use proxify for goodreads api to resolve cors issue from frontend
import './searchBox.css';
import ENV from '../../constants';


class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state={searchKey:'',lastSearchKey: ''};
        this.searchBoxRef=React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        this.searchBoxRef.current.focus();
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.submitSearch();
        }
    }

    submitSearch(){
        if(this.state.searchKey.length !== 0){
            if(this.state.lastSearchKey==='' || this.state.lastSearchKey !== this.searchBoxRef.current.value){
                this.setState({
                    lastSearchKey: this.searchBoxRef.current.value
                });
                const proxifyUrlBookTitle=proxify(encodeURI(ENV.TITLE_API+ENV.KEY+'&q='+this.state.searchKey), { inputFormat: "xml" });
                this.props.isSearching(true);
                axios.get(proxifyUrlBookTitle)
                .then(response => {
                    this.props.isSearching(false);
                    let searchResult = JSON.parse(response.request.response).query.results.GoodreadsResponse.search.results.work;
                    if(searchResult === undefined){
                        this.props.setSearchResults([]);
                    }else{
                        this.props.setSearchResults(searchResult);
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }

    render(){
        return (
            <p className="search-box-wrapper">
                <input type="text" className="search-box" name="searchKey" value={this.state.searchKey} ref={this.searchBoxRef} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <button className="submit-search" onClick={this.submitSearch}><i className="fa fa-search"></i></button>
            </p>
        );
    }
}

export default SearchBox;