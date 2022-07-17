import { Row } from "antd";
import React from "react";
import { Routes } from "react-router-dom";
import post from "../components/Post.module.css";
export default function Post(){
 
  return(
            <div>
                <div className = {post.body}>
                  <Row>
                    <h3 className ="text-center"> 게시글 </h3>
                    <div className={post.userName}>a</div>
                  </Row>
                    <div className = "card-body">
                            <div className = "row">      
                                <label> Title </label> 
                                <input type="text" />
                            </div>
                            <div className = "row">
                                <label> Contents </label>
                                <br></br>
                                <textarea readOnly/> 
                            </div >
                    </div>
                </div>

            </div>
        );

}