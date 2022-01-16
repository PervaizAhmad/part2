import React from "react";
import Paper from "./Paper/Paper";
import "./Papers.css"

/**
 * This is the papers component which calls the papers
 * API endpoint and returns a list of all paers. The
 * returned papers are divided into pages and buttons
 * allow the user to navigate between these pages with
 * a page number indicator which also states the total 
 * number of pages.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class Papers extends React.Component {

  searchErr = false

  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  componentDidMount() {
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
    this.fetchData(url)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.award !== this.props.award) {
      let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
      this.fetchData(url)
    } else if (this.props.award !== 'custom' && prevProps.titleSearch !== this.props.titleSearch) {
      let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
      this.fetchData(url)
    } else if (this.props.award === 'custom' && prevProps.awardTypeId !== this.props.awardTypeId) {
      let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
      this.fetchData(url)
    } else if (prevProps.readingList !== this.props.readingList) {
      let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
      this.fetchData(url)
    }
  }

  fetchData = (url) => {
    if (this.props.authorId !== undefined) {
      url += "?author_id=" + this.props.authorId
    } else if (this.props.award !== undefined && this.props.award !== "" && this.props.award !== "custom") {
      url += "?award=" + this.props.award
    } else if (this.props.titleSearch !== undefined && this.props.titleSearch !== "") {
      url += "?title=" + this.props.titleSearch
      this.searchErr = false
    } else if (this.props.award === 'custom' && this.props.awardTypeId !== undefined && this.props.awardTypeId !== '') {
      url += "?award_id=" + this.props.awardTypeId
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
        if (this.props.randonPaper) {
          const randonPaperId = Math.floor(Math.random() * data.results.length) + 1
          this.setState({ results: [data.results[randonPaperId]] })
        } else {
          this.setState({ results: data.results })
        }
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

  /**
   * Returns true if the titleSearch prop is a substring
   * of the paper's title.
   * 
   * @param {any} paper The paper to be checked.
   * @returns           A boolean, whether the paper should be displayed
   */
  filterBySearch = (paper) => {
    return paper.paper_title.toLowerCase().includes(this.props.titleSearch.toLowerCase())
  }

  filterByReadingList = (paper) => {
    let displayPaper = false
    this.props.readingList.forEach(list => {
      if (list.paper_id === paper.paper_id) {
        displayPaper = true;
      }
    });

    if (displayPaper) {
      return true
    }
  }

  render() {
    let noData = ''

    if (this.state.results.length === 0 || this.searchErr) {
      noData = 'No Data'
    }

    let filteredResults = this.state.results

    if (filteredResults.length !== 0) {
      if (this.props.showReadingList &&
        this.props.readingList !== undefined &&
        this.props.readingList !== null) {
        filteredResults = filteredResults.filter(this.filterByReadingList)
      }
    }

    // If searching for title AND award
    if (this.props.titleSearch !== undefined &&
      this.props.titleSearch !== '' &&
      this.props.award !== undefined &&
      this.props.award !== '') {
      filteredResults = filteredResults.filter(this.filterBySearch)
    }

    let buttons = ''

    if (this.props.page !== undefined) {
      const pageSize = 10
      let pageMax = this.props.page * pageSize
      let pageMin = pageMax - pageSize

      buttons = (
        <div>
          <p>Page {this.props.page} of {Math.ceil(filteredResults.length / pageSize)}</p>
          <button className="linkButton" onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
          <button className="linkButton" onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
        </div>
      )

      filteredResults = filteredResults.slice(pageMin, pageMax)
    }

    return (
      <div className="papersContainer">
        <div className="papers">
          {noData}
          {filteredResults.map((paper, i) => (<Paper key={i + paper.paper_id} paper={paper} />))}
        </div>
        {buttons}
      </div>
    )
  }
}

export default Papers;
