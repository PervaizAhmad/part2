import React from "react";
import './HomePage.css';
import books from '../../../assets/books.jpg';
import Papers from "../../Papers/Papers";

/**
 * This home page component displays an image and a qoute,
 * as well as a randomly selected paper.
 * 
 * @author Pervaiz Ahmad w18014333
 */
class Home extends React.Component {

  render() {
    return (
      <div className="homeContainer">
        <img src={books} className="mainImg" alt="An open book with a pair of folded glasses on top." />
        <div className="quoteBlock">
          <h1 className="quote">Research is turning the unknown into reality.</h1>
          <p className="quoteAuthor">Steven Magee</p>
        </div>
        <p className='creditAuthor'>Photo by <a className='adjustHighlight' href="https://unsplash.com/@alfonsmc10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alfons Morales</a> on <a className='adjustHighlight' href="https://unsplash.com/s/photos/books?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
        <Papers randonPaper={true} />
      </div>
    )
  }
}

export default Home;