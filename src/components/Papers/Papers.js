import React from "react";
import Paper from "./Paper/Paper";

class Papers extends React.Component {

  constructor(props) {
    super(props)
    this.state = { results: [] }
    console.log("constructor")
  }

  componentDidMount() {
    const url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"

    fetch(url)
      .then((response) => {
        return response.json()
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
    return (
      <div>
        {this.state.results.map((paper, i) => (<Paper key={i} paper={paper}/>))}
        {/* <p key={i}>{film.paper_title}</p> */}
      </div>
    )
  }
}

export default Papers;