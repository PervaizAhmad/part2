import React from "react";

class Paper extends React.Component {

    render() {
        return(
            <div>
                <p>{this.props.paper.paper_title}</p>
                <p>{this.props.paper.paper_abstract}</p>
                <p>{this.props.paper.paper_doi}</p>
                <p>{this.props.paper.paper_video}</p>
                <p>{this.props.paper.paper_preview}</p>
                <p>{this.props.paper.award_type_name}</p>
            </div>
        )
    }
}

export default Paper;