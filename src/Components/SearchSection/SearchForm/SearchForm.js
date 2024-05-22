import { useRef, useContext } from "react";
import { EnteredFieldsContext } from "../../../Contexts/EnteredFieldsContext";
import "./SearchForm.css"
const SearchForm = () => {
  const {
    setEnteredTitle,
    setEnteredAuthor,
    rateValue,
    setRateValue,
    setSubjectValue,
    setSearched,
    showValue, setShowValue
  } = useContext(EnteredFieldsContext);

  let title = useRef();

  let author = useRef();

  let subject = useRef();
  
  function handleClick() {
    const titleValue = title.current.value;
    const authorValue = author.current.value;
    const subjectVal = subject.current.value;

    if (titleValue) {
      setEnteredTitle(titleValue);
    }
    if (authorValue) {
      setEnteredAuthor(authorValue);
    }
    if (subjectVal) {
      setSubjectValue(subjectVal);
    }
    if (titleValue || authorValue || subjectVal) {
      console.log(
        "title: " +
          titleValue +
          " author: " +
          authorValue +
          " subject " +
          subjectVal
      );
    }
    setSearched(true);
  }

  const handleChange = (event) => {
    setRateValue(event.target.value);
  };

  const handleShowChange = (event) => {
    setShowValue(event.target.value);
  };
  return (
    <section className="inputForm">
      <label htmlFor="title">Title of book</label>
      <input id="title" type="text" ref={title} placeholder="Title of the book" />
      <label htmlFor="author" >Author</label>
      <input id="author" type="text" ref={author} placeholder="Author" />
      <label htmlFor="subject">Subject, genre etc.</label>
      <input id="subject" type="text" ref={subject} placeholder="Subject" />
      <label htmlFor="range">Starting rating</label>
      <input id="range"
        type="range"
        min="0"
        max="5"
        step="1"
        onChange={handleChange}
        value={rateValue}
      />
      <label>{rateValue}</label>
      <label>Amount of books to show</label>
      <input
        type="range"
        min="1"
        max="15"
        step="1"
        onChange={handleShowChange}
        value={showValue}
      />
      <label>{showValue}</label>
      <div>
        <button onClick={handleClick} className="buttonSearch"> Search </button>
      </div>
    </section>
  );
};

export default SearchForm;
