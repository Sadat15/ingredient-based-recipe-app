import BackgroundImage from '../img/background-image.png' 

function SearchBarBackground () {
  
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <div className=" text-center search-background">
          <div style={{backgroundImage: `url(${BackgroundImage})`}}>
            <br /><br /><br />
            <form>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-8">
                  <input type="text" class="input-field form-control" placeholder="Search for a recipe"></input>
                </div>
                <div class="col-1">
                  <button className="add-button mx-2 btn btn-primary" style={{backgroundColor: '#20577b', borderColor: '#20577b'}}>
                    Add 
                  </button>
                </div>
                <div class="col-1">
                  <button className="add-button mx-2 btn btn-primary" style={{backgroundColor: '#20577b', borderColor: '#20577b'}}>
                    Search
                  </button>
                </div>
                <div class="col-1"></div>
              </div>
            </form>
         

            
            
            <br /><br /><br />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBarBackground