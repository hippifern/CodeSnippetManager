export const Button = ({
  text = "text",
  img = "",
  color = "text-emerald-600 border-emerald-600 hover:bg-emerald-500 hover:text-black",
}: {
  text: string;
  img?: string;
  color?: string;
}) => {
  return (
    <button
      className={`flex items-center ${color} border  py-2 px-6 gap-2 rounded inline-flex items-center`}
    >
      <span className="text-sm">{text}</span>
      <img src="" alt="" />
    </button>
  );
};
