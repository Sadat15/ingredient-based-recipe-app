function RecipeCard(props) {
  console.log(props)
  return (
      <div className="card mb-4 box-shadow">
        <a href={'/recipes/' + props.id} style={{textDecoration: 'none'}}>
          <img src={props.img} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title Recipe-card-header" style={{color: '#be1045'}}>{props.name}</h5>
            <p className="card-text" style={{color: '#21709c'}}>X ingredients missing</p>
            <p className="card-text" style={{color: '#21709c'}}>Buy missing ingredients for</p>
          </div>
          <div class="card-footer text-muted d-flex justify-content-between align-items-center">
            <div>Rating</div>
            <div></div>
            
          </div>
        </a>
      </div>
  )
}

export default RecipeCard




