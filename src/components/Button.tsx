export const Button = ({
  text = "text",
  img = "",
}: {
  text: string;
  img?: string;
}) => {
  return (
    <button className="flex items-center text-emerald-600 border border-emerald-600 py-2 px-6 gap-2 rounded inline-flex items-center">
      <span className="text-sm">{text}</span>
      <img src="" alt="" />
    </button>
  );
};
