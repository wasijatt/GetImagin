
'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const CustomCursor = ({ cursorContent }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0, rotation: 0 });

  const [cursorStyle, setCursorStyle] = useState({
    size: '10px',
    height: "10px",
    color: '#24CFA6',
  });
  const rafRef = useRef();

  // Track mouse position
  useEffect(() => {

    const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  useEffect(() => {

    const handlemouseover = (e) => {
      
     if(e.target.matches("img")){

        setCursorStyle({
          size: "100px",
          height: "100px",
          color: "#ffffff2c",
        })

      }
    }

    const handlemouseleave = () => {



      setCursorStyle({
        size: "10px",
        height: "10px",
        color: "#24CFA6",
      })
    

    }
    window.addEventListener('mouseover', handlemouseover);
    window.addEventListener('mouseout', handlemouseleave);
    return () => {
      window.removeEventListener('mouseover', handlemouseover);
      window.removeEventListener('mouseout', handlemouseleave);
    }
  }, []);
  // Animate cursor position and rotation
  useEffect(() => {
    let { x, y } = cursor;
    let rotation = 0;

    const animate = () => {
      x += (mouse.x - x) * 0.1;
      y += (mouse.y - y) * 0.1;
      const deltaX = mouse.x - x;
      const deltaY = mouse.y - y;
      rotation = (deltaX + deltaY) * 0.05;

      setCursor({ x, y, rotation });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [mouse.x, mouse.y]);

  return (
    <div className='hidden md:block'
      style={{
        left: cursor.x,
        top: cursor.y,
        // transition:"transform 0.8s ease-out, width 0.8s ease-out, height 0.8s ease-out, background-color 0.3s ease-out",
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        zIndex: 999,
        pointerEvents: 'none',
        transition: 'width .9s, height 0.8s, background 0.3s',
      }}
    >
      {cursorContent ? (
        <Image
          width={600}
          height={600}
          src={cursorContent}
          alt="GetImagin-Impact Inner Images"
          loading='lazy'
          quality={75}
          style={{
            width: 250,
            height: 250,
            borderRadius: 10,

            transform: ` rotate(${cursor.rotation}deg)`,
            objectFit: 'cover',
            pointerEvents: 'none',
            transition: ' .9s ease-out width 0.8s, height 0.8s, background 0.9s',
          }}
        />
      ) : (
        <div
          style={{
            width: cursorStyle.size,
            height: cursorStyle.height,
            background: cursorStyle.color,
            borderRadius: '50%',
            transition: ".9s ease",
            mixBlendMode: "difference",


          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;