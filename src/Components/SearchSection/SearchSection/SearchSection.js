import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import { EnteredFieldsContext } from "../../../Contexts/EnteredFieldsContext";
import ModalHint from "../../ModalHint/ModalHint";
import './SearchSection.css'
const SearchSection = () => {

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [searched, setSearched] = useState(false);
  const [rateValue, setRateValue] = useState(1);
  const [showValue, setShowValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <button className="hint" onClick={()=> setIsModalOpen(true)}>?</button>
      {isModalOpen && <ModalHint closeModal={() => setIsModalOpen(false)} >
        <div>
          <p>Зліва - панель пошуку</p>
          <p>Знаходити книги можна за автором, назвою чи темою або комбінувати</p>
          <p>Start Rating - поріг оцінки, від якої будуть показані результати</p>
          <p>Amount of books to show - скільки книг буде показано в результаті. Макс- 15</p>
          <p>Щоб додати книгу до свого списку - натисніть кноку "Add"</p>
          <p></p>
        </div>
      
    </ModalHint>}
      <EnteredFieldsContext.Provider
        value={{
          enteredTitle,
          setEnteredTitle,
          enteredAuthor,
          setEnteredAuthor,
          searched,
          setSearched,
          rateValue,
          setRateValue,
          subjectValue,
          setSubjectValue,
          showValue, setShowValue,
        }}
      >
        <div className="panel">
        <SearchForm />
        <SearchResults />
        </div>
        
       
        
      </EnteredFieldsContext.Provider>
      
    </>
  );
};

export default SearchSection;
