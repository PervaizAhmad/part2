import React from "react";
import Authors from "../../Authors/Authors";
import SearchBox from "../../SearchBox/SearchBox";

/**
 * This component displays the Authors component
 * with a search box to filter the results.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class AuthorsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fNameSearch: "",
            page: 1
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
    }

    handleSearch = (e) => {
        this.setState({ fNameSearch: e.target.value, page: 1 })
    }

    handleNextClick = () => {
        this.setState({ page: this.state.page + 1 })
    }

    handlePreviousClick = () => {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        return (
            <div>
                <SearchBox
                    search={this.state.fNameSearch}
                    type={'First Name'} handleSearch={this.handleSearch} />
                <Authors
                    fNameSearch={this.state.fNameSearch}
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick} />
            </div>
        )
    }
}

export default AuthorsPage;