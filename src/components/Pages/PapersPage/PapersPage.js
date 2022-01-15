import React from "react";
import Papers from "../../Papers/Papers";
import SearchBox from "../../SearchBox/SearchBox";
import SelectAward from "../../SelectAward/SelectAward";
import SelectAwardType from "../../SelectAwardType/SelectAwardType";

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
      awardTypeId: "",
      titleSearch: "",
      readingList: "",
      page: 1
    }

    this.handleAwardSelect = this.handleAwardSelect.bind(this)
    this.handleAwardTypeSelect = this.handleAwardTypeSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
  }

  handleAwardSelect = (e) => {
    this.setState({ award: e.target.value, page: 1 })
  }

  handleAwardTypeSelect = (e) => {
    this.setState({ awardTypeId: e.target.value, page: 1 })
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

  handleReadingList = (e) => {
    this.setState({ readingList: e.target.value, page: 1 })
  }

  render() {
    let awardFilter = ''
    let readingListFilter = ''

    if (localStorage.getItem('loginToken') !== null) {
      readingListFilter = (
        <label>
          Show Only Reading List:
          <select value={this.state.readingList} onChange={this.handleReadingList}>
            <option value="">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
      )
    }

    if (this.state.award === 'custom') {
      awardFilter = (
        <div>
          <SelectAward
            award={this.state.award}
            handleAwardSelect={this.handleAwardSelect} />
          <SelectAwardType
            awardTypeId={this.state.awardTypeId}
            handleAwardTypeSelect={this.handleAwardTypeSelect} />
        </div>

      )
    } else {
      awardFilter = (
        <SelectAward
          award={this.state.award}
          handleAwardSelect={this.handleAwardSelect} />
      )
    }

    console.log(this.state.readingList);

    return (
      <div>
        {readingListFilter}
        <SearchBox
          search={this.state.titleSearch} type={'Title'}
          handleSearch={this.handleSearch} />
        {awardFilter}
        <Papers
          award={this.state.award}
          awardTypeId={this.state.awardTypeId}
          titleSearch={this.state.titleSearch}
          readingList={this.state.readingList}
          page={this.state.page}
          handleNextClick={this.handleNextClick}
          handlePreviousClick={this.handlePreviousClick} />
      </div>
    )
  }
}

export default PapersPage;
