export const Button = ({
  text = "text",
  svg = (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      className="w-6 h-6 ml-2"
    >
      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  ),
}: {
  text: string;
  svg: any;
}) => {
  return (
    <button className="flex items-center text-emerald-600 border border-emerald-600 py-2 px-6 gap-2 rounded inline-flex items-center">
      <span>{text}</span>
      {svg}
    </button>
  );
};
