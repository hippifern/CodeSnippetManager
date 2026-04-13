export const ContentBlock = ({ children, flex = "flex-1" }) => {
  return (
    <div className={`border-l-4 border-emerald-300 ${flex} p-2`}>
      <div className="p-2 h-full rounded-xl">{children}</div>
    </div>
  );
};
