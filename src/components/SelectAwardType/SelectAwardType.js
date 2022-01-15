import React from "react";

/**
 * A dropdown list for selecting papers by award type.
 * 
 * Generates the award type options based on the API
 * response.
 * 
 * Calls the handleAwardTypeSelect function passed down
 * as a prop to let the parent component define the
 * functionality of this select box.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class SelectAwardType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            awardTypes: [],
            awardIDs: []
        }
    }

    componentDidMount() {
        let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/papers?award=all"

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                // Getting all awards and award_ids from API
                // and storing it in an array
                let typeArr = []
                let idArr = []

                data.results.forEach(p => {
                    let toAdd = true;
                    typeArr.forEach(award => {
                        if (p.award_type_name === award) {
                            toAdd = false;
                        }
                    })
                    if (toAdd) {
                        typeArr.push(p.award_type_name)
                        idArr.push(p.award_type_id)
                    }
                    this.setState({awardTypes: typeArr})
                    this.setState({awardIDs: idArr})
                })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            });
    }

    render() {
        return (
            <label>
                Awards:
                <select value={this.props.award} onChange={this.props.handleAwardTypeSelect}>
                    <option value="">All papers</option>
                    {this.state.awardTypes.map((a, i) => (<option key={i} value={this.state.awardIDs[i]}>{this.state.awardTypes[i]}</option>))}
                </select>
            </label>
        )
    }
}

export default SelectAwardType;
