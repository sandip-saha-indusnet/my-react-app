import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./resizable-box.scss";
import { resizeTypes } from "./constants";

const ResizableBox = forwardRef(function ResizableBox(
  {
    component: Tag = "div",
    defaultWidth = "auto",
    defaultHeight = "auto",
    enable = { right: true, bottom: true },
    minWidth = 10,
    minHeight = 10,
    onResizeStart = () => false,
    onResizeStop = () => false,
    onSizeChange = () => false,
    className,
    children,
  },
  ref
) {
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizingType, setResizingType] = useState(null);
  const resizeBoxRef = useRef();
  const offsetRef = useRef();
  const onResizeStopRef = useRef(onResizeStop);
  const onSizeChangeRef = useRef(onSizeChange);

  useEffect(() => {
    // latest/callback ref pattern
    onResizeStopRef.current = onResizeStop;
    onSizeChangeRef.current = onSizeChange;
  }, [onResizeStop, onSizeChange]);

  const resizeHandles = useMemo(
    () => ({
      right: {
        calculateOffset(e) {
          return e.clientX - resizeBoxRef.current.getBoundingClientRect().right;
        },
        resizing(e) {
          const newWidth =
            e.clientX -
            resizeBoxRef.current.getBoundingClientRect().left -
            offsetRef.current;

          if (newWidth > minWidth) {
            setSize((prevSize) => ({ ...prevSize, width: newWidth }));
          }
        },
      },
      bottom: {
        calculateOffset(e) {
          return (
            e.clientY - resizeBoxRef.current.getBoundingClientRect().bottom
          );
        },
        resizing(e) {
          const newHeight =
            e.clientY -
            resizeBoxRef.current.getBoundingClientRect().top -
            offsetRef.current;

          if (newHeight > minHeight) {
            setSize((prevSize) => ({ ...prevSize, height: newHeight }));
          }
        },
      },
    }),
    [minWidth, minHeight]
  );

  const startResize = (type) => (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingType(type);
    offsetRef.current = resizeHandles[type].calculateOffset(e);
    onResizeStart(type);
  };

  const handleResize = useCallback(
    (e) => {
      if (isResizing) {
        resizeHandles[resizingType].resizing(e);

        const typeSize =
          resizingType === resizeTypes.right ? size.width : size.height;
        onSizeChange({ type: resizingType, size: typeSize });
      }
    },
    [
      isResizing,
      resizingType,
      resizeHandles,
      onSizeChange,
      size.width,
      size.height,
    ]
  );

  const stopResize = useCallback(() => {
    setIsResizing(false);
    setResizingType(null);
    offsetRef.current = null;
    onResizeStopRef.current();
  }, []);

  useEffect(() => {
    /* there's no need to keep the event listeners attached all the time
    only adding the listener when dragging start and removing when dragging ends */
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", stopResize);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResize);
    }
    // attached event listeners should get removed upon component unmount
    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, handleResize, stopResize]);

  return (
    <Tag
      className={`resizable-box ${className}`}
      ref={(element) => {
        resizeBoxRef.current = element;
        if (!ref) return;
        if (typeof ref === "function") {
          ref(element);
        } else {
          ref.current = element;
        }
      }}
      style={{
        minWidth: size.width,
        minHeight: size.height,
        height: size.height,
      }}
    >
      {children}
      {enable.right && (
        <div
          className={`resizable-box__handle resizable-box__handle-right ${
            resizingType === resizeTypes.right ? "active" : ""
          }`}
          onMouseDown={startResize(resizeTypes.right)}
        ></div>
      )}
      {enable.bottom && (
        <div
          className={`resizable-box__handle resizable-box__handle-bottom ${
            resizingType === resizeTypes.bottom ? "active" : ""
          }`}
          onMouseDown={startResize(resizeTypes.bottom)}
        ></div>
      )}
    </Tag>
  );
});

export default ResizableBox;
