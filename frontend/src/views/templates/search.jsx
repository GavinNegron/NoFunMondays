function Search() {

    return (
        <>   
        <div className='search'>
            <form action='' className='search__form'>
                <input type='text' className='search__form-input' placeholder='Search: '></input>
                <button className="search__form-btn" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
          </>
        )
    }
        
    export default Search