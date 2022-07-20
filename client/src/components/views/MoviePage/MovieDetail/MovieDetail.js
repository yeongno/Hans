import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import { useParams } from "react-router-dom";
import MainImage from "../Sections/Mainimage";
import MovieInfo from "./Sections/MovieInfo";

export default function MovieDetail(props) {
  let movieId = useParams().movieId;
  const [Movie, setMovie] = useState([]);
  let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

  let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  useEffect(() => {
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });
  }, []);
  return (
    <div>
      {/* header */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
        {/* movieInfo */}
        <MovieInfo movie={Movie} />

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}
