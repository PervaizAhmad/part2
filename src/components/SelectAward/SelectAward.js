import React from "react";

/**
 * A dropdown list for selecting papers by award
 * 
 * The dropdown options are hardcoded in because
 * the way this API endpoint functions, there is
 * only 2 possible options: papers with awards
 * or papers without any awards.
 * 
 * There is an option for custom which uses
 * conditional rendering to display a dropown
 * for selecting papers with specific awards.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class SelectAward extends React.Component {

  render() {
    return (
      <label>
        Awards:
        <select value={this.props.award} onChange={this.props.handleAwardSelect}>
          <option value="">All papers</option>
          <option value="none">No awards</option>
          <option value="all">All awards</option>
          <option value="custom">Custom Select</option>
        </select>
      </label>
    )
  }
}

export default SelectAward;