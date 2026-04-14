import logo from "../assets/logo.svg";

export const Item = ({
  selectSnippet,
  title,
  dateAdded,
  selectedSnippetId,
  id,
}: {
  selectSnippet: () => void;
  title: string;
  dateAdded: Date;
  selectedSnippetId: number;
  id: number;
}) => {
  return (
    <div
      className={`item flex justify-between p-1 w-full h-full ${selectedSnippetId === id ? "bg-emerald-300" : ""} rounded-lg`}
      onClick={selectSnippet}
    >
      <div className={`text-content border-l-3 border-emerald-300 px-1`}>
        <h2 className="text-md">{title}</h2>
        <p className="text-sm text-gray-500">
          date added: {dateAdded.getDate()}
        </p>
      </div>
      <div className="icons flex flex-col h-full items-end">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};
