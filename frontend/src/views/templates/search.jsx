function Search() {

    return (
        <>   
        <div class='search'>
            <form action='' class='search__form'>
                <input type='text' class='search__form-input' placeholder='Search: '></input>
                <button class="search__form-btn" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
          </>
        )
    }
        
    export default Search