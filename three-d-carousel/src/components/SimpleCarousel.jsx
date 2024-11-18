import React, { useEffect } from "react";
import "./SimpleCarousel.css";

const SimpleCarousel = () => {
  useEffect(() => {
    let radius = 240;
    const autoRotate = true;
    const rotateSpeed = -60;
    const imgWidth = 120;
    const imgHeight = 170;

    const odrag = document.getElementById("drag-container");
    const ospin = document.getElementById("spin-container");
    const aImg = ospin.getElementsByTagName("img");
    const aVid = ospin.getElementsByTagName("video");
    const aEle = [...aImg, ...aVid];

    ospin.style.width = `${imgWidth}px`;
    ospin.style.height = `${imgHeight}px`;

    const ground = document.getElementById("ground");
    ground.style.width = `${radius * 3}px`;
    ground.style.height = `${radius * 3}px`;

    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${(i * (360 / aEle.length))}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = `transform 1s`;
        aEle[i].style.transitionDelay = delayTime || `${(aEle.length - i) / 4}s`;
      }
    }

    function applyTransform(obj) {
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    }

    function playSpin(yes) {
      ospin.style.animationPlayState = yes ? "running" : "paused";
    }

    let sX, sY, nX, nY, desX = 0, desY = 0, tX = 10, tY = 10;

    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    document.onpointerdown = (e) => {
      clearInterval(odrag.timer);
      e = e || window.event;
      sX = e.clientX;
      sY = e.clientY;

      document.onpointermove = (e) => {
        e = e || window.event;
        nX = e.clientX;
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;
      };

      document.onpointerup = () => {
        odrag.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);

        document.onpointermove = document.onpointerup = null;
      };
    };

    document.onwheel = (e) => {
      e = e || window.event;
      const d = e.deltaY / 20 || -e.detail;
      radius += d;
      init(1);
    };

    setTimeout(init, 1000);
  }, []);

  return (
    <div id="drag-container">
      <div id="spin-container">
        {Array.from({ length: 7 }).map((_, idx) => (
          <img
            key={idx}
            src="https://imgs.search.brave.com/314NNoTppLFWYnVIHn17TNNuo_OWhZlLNRaze9U7sYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWF1dGlmdWwtZ2ly/bC1zdGFuZHMtcGFy/a184MzUzLTUwODQu/anBnP3NlbXQ9YWlz/X2h5YnJpZA"
            alt="beautiful girl"
          />
        ))}
        <video controls autoPlay loop>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <p>3D Carousel</p>
      </div>
      <div id="ground"></div>
    </div>
  );
};

export default SimpleCarousel;
