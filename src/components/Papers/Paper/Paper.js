import React from "react";
import "./Paper.css";

/**
 * This is the paper component which defines how a single
 * paper is displayed. It uses conditional rendering to
 * display the details of the paper when the title is clicked.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class Paper extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      display: false,
      authors: []
    }
  }

  componentDidMount() {
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/authors?paper_id=" + this.props.paper.paper_id
    this.fetchAuthors(url)
  }

  componentWillUnmount() {
    // changing flag to false so state doesnt
    // try to update on an unmounted component
    this._isMounted = false;
  }

  fetchAuthors = (url) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        // Only set state when component is mounted
        if (this._isMounted) {
          this.setState({ authors: data.results })
        }
      })
      .catch((err) => {
        if (err.message === 'No Content') {
          this.searchErr = true
          if (this._isMounted) {
            this.setState({ results: [] })
          }
          console.log('Status 204: No Content');
        } else {
          console.log("something went wrong ", err)
        }
      });
  }

  handleClick = () => {
    this.setState({ display: !this.state.display })
  }

  render() {
    let details = "";

    if (this.state.display) {
      details =
        <div>
          <p>{this.props.paper.paper_abstract}</p>
          <p><strong>Authors: </strong>|{this.state.authors.map((author, i) => (<span key={i + author.author_id}>| {author.first_name + ' ' + author.middle_name + ' ' + author.last_name} |</span>))}|</p>
          <p><a href={this.props.paper.paper_doi}>DOI of Paper</a></p>
          <p><a href={this.props.paper.paper_preview}>Paper Preview Video</a></p>
          <p><a href={this.props.paper.paper_video}>Paper Full Video</a></p>
          <p>{this.props.paper.award_type_name}</p>
        </div>
    }

    return (
      <div className="paper">
        <p onClick={this.handleClick}>{this.props.paper.paper_title}</p>
        {details}
      </div>
    )
  }
}

export default Paper;
