import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./App.css";
import { plusThing } from "./store";
import { useDispatch } from "react-redux";
function Detail(props) {
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);
  let [fade, setFade] = useState("");
  let dispatcher = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [탭]);

  let { id } = useParams();
  let shoe = props.shoes.find(function (x) {
    return x.id == id;
  });
  useEffect(() => {
    let watched = localStorage.getItem("watched");
    watched = JSON.parse(watched);
    watched.push(shoe.id);
    watched = new Set(watched);
    watched = Array.from(watched);
    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);

  return (
    <div className={"container start " + fade}>
      {alert == true ? (
        <div className="alert alert-warning"> 2초이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <button
            onClick={() => {
              dispatcher(plusThing({ id: 1, name: "Red Knit", count: 1 }));
            }}
            className="btn btn-danger"
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} shoes={props.shoes}></TabContent>
    </div>
  );
}
function TabContent({ 탭, shoes }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [탭]);
  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
export default Detail;
