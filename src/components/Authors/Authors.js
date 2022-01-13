import React from "react";
import Author from "./Author/Author";

class Authors extends React.Component {

  constructor(props) {
    super(props)
    this.state = { results: [] }
    console.log("constructor")
  }

  componentDidMount() {
    const url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/authors"

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

  render() {
    console.log("render")
    console.log(this.state.results)

    let noData = '';

    if(this.state.results.length === 0) {
      noData = 'No Data'
    }

    return (
      <div>
        {noData}
        {this.state.results.map((author, i) => (<Author key={i} author={author} />))}
        {/* <p key={i}>{film.paper_title}</p> */}
      </div>
    )
  }
}

export default Authors;