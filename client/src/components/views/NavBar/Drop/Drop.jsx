import drop from "./Drop.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Drop() {
  const navigate = useNavigate();

  const goPost = () => {
    navigate("/postList");
  };
  const goMovie = () => {
    navigate("/movie");
  };
  const goFavorite = () => {
    navigate("/favorite");
  };
  return (
    <div>
      <ul className={drop.main_menu}>
        <li className={drop.item}>
          <div className={drop.item__name}>상진규</div>
          <div className={drop.item__contents}>
            <div className={drop.contents__menu}>
              <ul className={drop.drop_inner}>
                <li>
                  <h4>01</h4>
                  <ul>
                    <li>01</li>
                    <li>02</li>
                    <li>03</li>
                  </ul>
                </li>
                <li>
                  <h4>02</h4>
                  <ul>
                    <li>01</li>
                    <li>02</li>
                    <li>03</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={drop.item}>
          <div className={drop.item__name}>이영노</div>
          <div className={drop.item__contents}>
            <div className={drop.contents__menu}>
              <ul className={drop.drop_inner}>
                <li>
                  <h4>게시글</h4>
                  <ul>
                    <li onClick={goPost}>게시글</li>
                    <li onClick={goMovie}>무비</li>
                    <li onClick={goFavorite}>Favorite Page</li>
                  </ul>
                </li>
                <li>
                  <h4>채팅하기</h4>
                  <ul>
                    <li>01</li>
                    <li>02</li>
                    <li>03</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={drop.item}>
          <div className={drop.item__name}>이지원</div>
          <div className={drop.item__contents}>
            <div className={drop.contents__menu}>
              <div className={drop.drop_inner}>소통하기1</div>
            </div>
          </div>
        </li>
        <li className={drop.item}>
          <div className={drop.item__name}>소통하기4</div>
          <div className={drop.item__contents}></div>
        </li>
        <li className={drop.item}>
          <div className={drop.item__name}>소통하기5</div>
          <div className={drop.item__contents}></div>
        </li>
        <li className={drop.item}>
          <div className={drop.item__name}>소통하기6</div>
          <div className={drop.item__contents}></div>
        </li>
      </ul>
    </div>
  );
}
