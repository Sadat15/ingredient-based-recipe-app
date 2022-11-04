import { Link } from "react-router-dom";

function RecipeCard({ id, name, img }) {
  return (
    <div className="card mb-4 box-shadow" key={id}>
      <Link to={`/recipe/${id}`} style={{ textDecoration: "none" }}>
        {/* <a href={'/recipe/' + props.id} style={{textDecoration: 'none'}}> */}
        <img src={img} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5
            className="card-title Recipe-card-header"
            style={{ color: "#be1045" }}
          >
            {name}
          </h5>
          <p className="card-text" style={{ color: "#21709c" }}>
            X ingredients missing
          </p>
          <p className="card-text" style={{ color: "#21709c" }}>
            Buy missing ingredients for
          </p>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between align-items-center">
          <div>Rating</div>
          <div></div>
        </div>
        {/* </a> */}
      </Link>
    </div>
  );
}

export default RecipeCard;
