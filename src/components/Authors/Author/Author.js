import React from "react";
import Papers from "../../Papers/Papers";
import "./Author.css";

/**
 * This is the Author component which defines how a single author
 * is displayed. It uses conditional rendering to display the papers
 * of that author when the author's name is clicked.
 * 
 * @author Pervaiz Ahmad w18014333 
 */
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