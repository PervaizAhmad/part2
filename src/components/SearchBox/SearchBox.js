import React from "react";

/**
 * This defines the search box which is modularised so that
 * it is usable for different search functionalities.
 * 
 * The lable and placeholder of the searchbox use props to
 * output different text to make it custom. The input calls
 * a handleSearch anonymous function passed down as a prop
 * by the parent using the onChange attribute. This means
 * the functionality of this search is handled in the parent
 * component and therefore can be reused with different
 * functionlities in other components.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class SearchBox extends React.Component {

    render() {
           return (
               <label>
                   Search {this.props.type}
                   <input type='text' placeholder={this.props.type + '...'} value={this.props.search} onChange={this.props.handleSearch} />
               </label>
           )
       }
   }
   
export default SearchBox;