export const Button = ({
  text = "text",
  img = "",
  color = "text-emerald-600 border-emerald-600 hover:bg-emerald-500 hover:text-black",
  onClick = () => {},
}: {
  text: string;
  img?: string;
  color?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${color} border  py-2 px-6 gap-2 rounded inline-flex items-center cursor-pointer`}
    >
      <span className="text-sm">{text}</span>
      <img src="" alt="" />
    </button>
  );
};
