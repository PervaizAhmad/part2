import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import Paper from "../Papers/Paper/Paper";
import "./ReadingList.css";

class ReadingList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: [],
      readinglist: []
    }
  }

  componentDidMount() {
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
    this.fetchPapers(url)

    let loginUrl = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/reading_list"
    this.fetchLoginData(loginUrl)

  }

  fetchPapers = (url) => {
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
        console.log("something went wrong ", err)
      });
  }

  fetchLoginData = (url) => {
    let formData = new FormData();

    formData.append('token', this.props.token)

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ readinglist: data.results })
        this.props.setReadingList(this.state.readinglist)
      })
      .catch((err) => {
        console.log("something went wrong ", err)
        this.props.handleLogoutClick()
      });
  }

  render() {
    return (
      <div>
        {this.state.results.map((paper, i) => (
          <div className="readingListPaper" key={i + paper.paper_id}>
            <div className="checkBox"><CheckBox readinglist={this.state.readinglist} paper_id={paper.paper_id} /></div>
            <div className="paperElement"><Paper paper={paper} /></div>
          </div>
        )
        )}
      </div>
    )
  }
}

export default ReadingList;