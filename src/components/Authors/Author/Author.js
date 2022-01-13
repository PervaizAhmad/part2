import React from "react";
import Papers from "../../Papers/Papers";
import "./Author.css";

class Author extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    handleClick = () => {
        this.setState({ display: !this.state.display })
    }

    render() {
        let details = "";

        if (this.state.display) {
            details = <div>
                <Papers authorId={this.props.author.author_id} />
            </div>
        }

        return (
            <div className="author">
                <p onClick={this.handleClick}>{this.props.author.first_name} {this.props.author.middle_name} {this.props.author.last_name}</p>
                {details}
            </div>
        )
    }
}

export default Author;