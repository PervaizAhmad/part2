import React from "react";
import "./Paper.css";

class Paper extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    handleClick = () => {
        this.setState({display:!this.state.display})
    }

    render() {
        let details = "";

        if (this.state.display) {
            details = <div>
                <p>{this.props.paper.paper_abstract}</p>
                <p>{this.props.paper.paper_doi}</p>
                <p>{this.props.paper.paper_video}</p>
                <p>{this.props.paper.paper_preview}</p>
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