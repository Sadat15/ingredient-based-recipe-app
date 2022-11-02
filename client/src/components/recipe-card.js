// import foodData from '../foodData' 
import '../App.css';

function RecipeCard(props) {
  console.log(props)
  return (
    <div className="container">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <a href={'/recipes/' + props.id}>
            <div className="Recipe-card card" style={{width: '18 rem'}}>
            <img src={props.img} className="card-img-top" alt="..."></img>
              <div className="card-body">
                  <h5 className="card-title Recipe-card-header">{props.name}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </a>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
    
  )
}

export default RecipeCard


