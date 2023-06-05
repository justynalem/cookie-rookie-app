import "./Overlay.scss";

export const Overlay = ({
  isOpen,
  text,
}: {
  isOpen: boolean;
  text?: string;
}) => {
  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div>
        <img src="loading-animation.gif" />
      </div>
      {text ? <p className="overlay__text">{text}</p> : null}
    </div>
  );
};
