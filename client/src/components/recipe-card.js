function RecipeCard(props) {
  console.log(props)
  return (
      <div className="card mb-4 box-shadow">
        <a href={'/recipes/' + props.id}>
          <img src={props.img} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title Recipe-card-header">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="card-footer text-muted">
              
            </div>
        </a>
      </div>
  )
}

export default RecipeCard




