import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import { useParams } from "react-router-dom";
import MainImage from "../Sections/Mainimage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../../commons/GridCards";
import { Row } from "antd";
import Favorite from "./Sections/Favorite";

export default function MovieDetail(props) {
  let movieId = useParams().movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, []);
  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div style={{ width: "85%", margin: "1rem auto" }}>
      <div>
        {/* header */}
        {Movie && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
          />
        )}
        {/* body */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>

        {/* movieInfo */}
        <MovieInfo movie={Movie} />

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((Casts, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      Casts.profile_path
                        ? `${IMAGE_BASE_URL}w500${Casts.profile_path}`
                        : null
                    }
                    characterName={Casts.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}
