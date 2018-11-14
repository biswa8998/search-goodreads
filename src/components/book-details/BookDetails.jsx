import React, { Component } from 'react';
import './BookDetails.css';

class BookDetails extends Component {
    render(){
        return(
            <div className="book-detail-wrapper">
                {
                    (this.props.searchResults.length === 0 )? '': (this.props.searchingDetail)?<h2 className="text-center">Searching...</h2>:(this.props.bookDetails===null)?'':
                    <div>
                        
                    </div>
                }
            </div>
        );
    }
}

export default BookDetails;