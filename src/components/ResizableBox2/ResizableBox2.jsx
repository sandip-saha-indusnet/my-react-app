import { useState, useRef, useCallback, useEffect } from "react";

const ResizableBox2 = () => {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;

      setSize((prevSize) => ({
        width: Math.max(100, prevSize.width + deltaX),
        height: Math.max(100, prevSize.height + deltaY),
      }));

      startPosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach and cleanup event listeners
  const handleListeners = useCallback(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Update listeners when dragging state changes
  useEffect(() => {
    handleListeners();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleListeners, handleMouseMove, handleMouseUp]);

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const boxStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: "#EBF8FF",
    border: "1px solid #90CDF4",
    borderRadius: "8px",
    padding: "16px",
    position: "relative",
    cursor: isDragging ? "nwse-resize" : "default",
  };

  const contentStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3182CE",
  };

  const handleStyle = {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "16px",
    height: "16px",
    backgroundColor: "#3182CE",
    borderBottomLeftRadius: "4px",
    cursor: "nwse-resize",
  };

  return (
    <div style={containerStyle}>
      <div ref={boxRef} style={boxStyle}>
        <div style={contentStyle}>Resizable Content</div>
        <div style={handleStyle} onMouseDown={handleMouseDown} />
      </div>
    </div>
  );
};

export default ResizableBox2;
