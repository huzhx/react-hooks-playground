import React, { useState, useEffect, useRef, useCallback } from 'react';
import Name from './Name';
import ColorPicker from './ColorPicker';
import RefreshButton from './RefreshButton';
import randomColor from 'randomcolor';
import Canvas from './Canvas';

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);

  const headerRef = useRef({ offsetHeight: 0 });

  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="app">
      <header ref={headerRef} style={{ borderTop: `10px solid ${activeColor}` }}>
        <div className="app">
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker colors={colors} activeColor={activeColor} setActiveColor={setActiveColor} />
          <RefreshButton cb={getColors} />
        </div>
      </header>
      {activeColor && <Canvas color={activeColor} height={window.innerHeight - headerRef.current.offsetHeight} />}
    </div>
  );
}
