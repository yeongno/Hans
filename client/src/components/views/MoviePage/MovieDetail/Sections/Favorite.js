// import Axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
        }
      });
    }
  };
  return (
    <div>
      <br />
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite  " : "Add to Favorite  "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
