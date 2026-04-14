export const ContentBlock = ({ children, flex = "flex-1" }) => {
  return (
    <div className={` ${flex}`}>
      <div className="mx-2 h-full rounded-xl">{children}</div>
    </div>
  );
};
