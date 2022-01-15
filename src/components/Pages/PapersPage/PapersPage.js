import React from "react";
import Papers from "../../Papers/Papers";
import SearchBox from "../../SearchBox/SearchBox";
import SelectAward from "../../SelectAward/SelectAward";

/**
 * This component displays the Papers component as well as filters
 * to search for more specific papers.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class PapersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            award: "",
            titleSearch: "",
            page: 1
        }

        this.handleAwardSelect = this.handleAwardSelect.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
    }

    componentDidMount() {
        let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers?award=all"

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                // Getting all awards and award_ids from API
                // and storing it in an array
                let arr = []
                data.results.forEach(p => {
                    let diff = true;
                    arr.forEach(award => {
                        if (p.award_type_name === award) {
                            diff = false;
                        }
                    })
                    if (diff) {
                        arr.push(p.award_type_id, p.award_type_name)
                    }
                })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            });
    }

    handleAwardSelect = (e) => {
        this.setState({ award: e.target.value, page: 1 })
    }

    handleSearch = (e) => {
        this.setState({ titleSearch: e.target.value, page: 1 })
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
                    search={this.state.titleSearch} type={'Title'}
                    handleSearch={this.handleSearch} />
                <SelectAward
                    award={this.state.award}
                    handleAwardSelect={this.handleAwardSelect} />
                <Papers
                    award={this.state.award}
                    titleSearch={this.state.titleSearch}
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick} />
            </div>
        )
    }
}

export default PapersPage;