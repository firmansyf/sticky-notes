import React, { useState } from "react";
import pin from "../assets/pin.png";

const Name = () => {
  return (
    <>
      {" "}
      <h3> Qoutes </h3>{" "}
    </>
  );
};

export default function StickyApp() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  // drag content

  const drag = (e) => {
    const content = document.getElementsByClassName("content")[0];

    content.style.position = "absolute";
    content.style.zIndex = 1000;

    document.body.append(content);

    const moveAt = (pageX, pageY) => {
      content.style.left = pageX - content.offsetWidth / 2 + "px";
      content.style.top = pageY - content.offsetHeight / 2 + "px";
    };

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);

    content.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      content.onmouseup = null;
    };
  };

  const dragstart = () => {
    const content = document.getElementsByClassName("content")[0];

    content.ondragstart = function () {
      return false;
    };
  };

  // End Content

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, value]);

    setValue("");
  };

  return (
    <>
      <section>
        <div className="inputan">
          <Name />
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder=' "Qoutes" '
            />
            {/* <button> Add </button> */}
          </form>
        </div>
      </section>
      <main>
        {items.map((item, index) => {
          return (
            <div className="content" onMouseDown={drag} onDragStart={dragstart}>
              <img src={pin} width={45} height={45} alt="iya" />
              <span key={index}>" {item} "</span>
            </div>
          );
        })}
      </main>
    </>
  );
}
