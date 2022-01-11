import React from "react";
import './HomeStyles.css';
import books from '../../assets/books.jpg';

class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="homeContainer">
        <img src={books} className="mainImg" alt="An open book with a pair of folded glasses on top." />
        <p className='creditAuthor'>Photo by <a className='adjustHighlight' href="https://unsplash.com/@alfonsmc10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alfons Morales</a> on <a className='adjustHighlight' href="https://unsplash.com/s/photos/books?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
      </div>
    )
  }
}

export default Home;