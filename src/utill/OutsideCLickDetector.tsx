import React, { useRef, useEffect } from "react";

interface PropsType {
  children: React.ReactNode;
  onClickOutside: () => void;
  className?: string;
}

const OutsideClickDetector = ({
  children,
  onClickOutside,
  className,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default OutsideClickDetector;
