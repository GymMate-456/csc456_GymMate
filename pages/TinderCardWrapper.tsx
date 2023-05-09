import React from "react";
import dynamic from "next/dynamic";

const TinderCard = dynamic(() => import("react-tinder-card"), {
  ssr: false,
});

interface TinderCardWrapperProps {
  className?: string;
  key: string;
  preventSwipe: string[];
  onSwipe?: (direction: string) => void;
}

const TinderCardWrapper: React.FC<TinderCardWrapperProps> = (props) => {
  const { children, className, key, preventSwipe, onSwipe } = props;
  return (
    <div>
      <TinderCard
        className={className}
        key={key}
        preventSwipe={preventSwipe}
        onSwipe={onSwipe}
      >
        {children}
      </TinderCard>
    </div>
  );
};

export default TinderCardWrapper;
