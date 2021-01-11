import React, { useState, useEffect, useRef } from 'react';
import useWindowSize from '../hooks/useWindowSize';

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const ctx = useRef();

  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d');
  }, []);

  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  const handleMouseMove = (event) => {
    const coords = [event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop];
    if (drawing) {
      ctx.current.lineTo(...coords);
      ctx.current.stroke();
    }
    if (props.handleMouseMove) {
      props.handleMouseMove(...coords);
    }
  };

  const handleStartDrawing = (event) => {
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = props.color;
    ctx.current.beginPath();
    ctx.current.moveTo(event.clientX - canvasRef.current.offsetLeft, event.clientY - canvasRef.current.offsetTop);
    setDrawing(true);
  };

  const handleStopDrawing = () => {
    ctx.current.closePath();
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={props.width || width}
      height={props.height || height}
      onMouseDown={handleStartDrawing}
      onMouseUp={handleStopDrawing}
      onMouseOut={handleStopDrawing}
      onMouseMove={handleMouseMove}
    />
  );
}
