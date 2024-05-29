/* eslint-disbale */
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import data from "./data.js";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Detail.js";
import axios from "axios";
import Cart from "./Cart.js";
import { useQuery } from "react-query";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let result = useQuery(
    "작명",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        return a.data;
      }),
    {
      staleTime: 2000,
    }
  );

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Home{" "}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/1");
              }}
            >
              {" "}
              Detail{" "}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event/one");
              }}
            >
              {" "}
              eventOne{" "}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              {" "}
              cart{" "}
            </Nav.Link>
          </Nav>
          <Nav.Link className="ms-auto">
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav.Link>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="row">
                {shoes.map(function (a, i) {
                  return <Card shoe={a} idx={i + 1}></Card>;
                })}
              </div>
            </div>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes}></Detail>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문시 양파즙 서비스!</div>} />
        </Route>
      </Routes>
      <button
        onClick={() => {
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((결과) => {
              let copy = [...shoes, ...결과.data];
              setShoes(copy);
            })
            .catch(() => {
              console.log("실패함");
            });
        }}
      >
        버튼
      </button>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Card(props) {
  return (
    <div>
      <div className="col-md-4">
        <img
          src={"https://codingapple1.github.io/shop/shoes" + props.idx + ".jpg"}
          width="80%"
        />
        <h4>{props.shoe.title}</h4>
        <p>{props.shoe.content}</p>
        <p>{props.shoe.price}</p>
      </div>
    </div>
  );
}

export default App;
