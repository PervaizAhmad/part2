import React from "react";
import Author from "./Author/Author";
import "./Authors.css";

/**
 * This is the Authors page which calls the authors API endpoint
 * and returns a list of all authors. The list is divided into pages
 * and buttons allow the user to navigate between these pages with a
 * page number indicator which also states the total number of pages.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class Authors extends React.Component {

  searchErr = false

  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  componentDidMount() {
    const url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/authors"
    this.fetchData(url)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fNameSearch !== this.props.fNameSearch) {
      const url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/authors"
      this.fetchData(url)
    }
  }

  fetchData = (url) => {
    if (this.props.fNameSearch !== undefined && this.props.fNameSearch !== "") {
      url += "?first_name=" + this.props.fNameSearch
      this.searchErr = false
    }

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ results: data.results })
      })
      .catch((err) => {
        if (err.message === 'No Content') {
          this.searchErr = true
          this.setState({ results: [] })
          console.log('Status 204: No Content');
        } else {
          console.log("something went wrong ", err)
        }
      });
  }

  render() {
    let noData = '';
    let results = this.state.results;

    if (results.length === 0 || this.searchErr) {
      noData = 'No Data'
    }

    let buttons = ''

    if (this.props.page !== undefined) {
      const pageSize = 10
      let pageMax = this.props.page * pageSize
      let pageMin = pageMax - pageSize

      buttons = (
        <div>
          <p>Page {this.props.page} of {Math.ceil(results.length / pageSize)}</p>
          <button className="linkButton" onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
          <button className="linkButton" onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(results.length / pageSize)}>Next</button>
        </div>
      )

      results = results.slice(pageMin, pageMax)
    }


    return (
      <div className="authorsContainer">
        <div className="authors">
          {noData}
          {results.map((author, i) => (<Author key={i + author.author_id} author={author} />))}
        </div>
        {buttons}
      </div>
    )
  }
}

export default Authors;
