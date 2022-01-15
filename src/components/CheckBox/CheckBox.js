import React from "react";

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { checked: false }
  }

  componentDidMount = () => {
    this.props.readinglist.forEach(element => {
      if (element.paper_id === this.props.paper_id) {
        this.setState({ checked: true })
      }
    })
  }

  addToList = () => {
    // console.log('add')
    // this.setState({ checked: !this.state.checked })
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/reading_list"

    let formData = new FormData()
    formData.append('token', localStorage.getItem('loginToken'))
    formData.append('add', this.props.paper_id)

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if ((response.status === 200) || (response.status === 204)) {
          this.setState({ checked: true })
        } else {
          throw Error(response.statusText)
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err)
      });
  }

  removeFromList = () => {
    // console.log('remove')
    // this.setState({ checked: !this.state.checked })
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/reading_list"

    let formData = new FormData();
    formData.append('token', localStorage.getItem('loginToken'));
    formData.append('remove', this.props.paper_id);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if ((response.status === 200) || (response.status === 204)) {
          this.setState({ checked: false })
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err)
      });
  }

  handleOnChange = () => {
    // console.log(this.state.checked);
    // this.setState({ checked: !this.state.checked })
    if (this.state.checked) {
      this.removeFromList()
    } else {
      this.addToList()
    }
  }

  render() {
    return (
      <input
        type="checkbox"
        id="viewlist"
        name="viewlist"
        value="film"
        checked={this.state.checked}
        onChange={this.handleOnChange}
      />
    )
  }
}

export default CheckBox;