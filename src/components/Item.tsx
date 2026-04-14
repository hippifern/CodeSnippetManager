export const Item = ({
  selectSnippet,
  title,
  dateAdded,
  language,
  selectedSnippetId,
  id,
}: {
  selectSnippet: () => void;
  title: string;
  dateAdded: Date;
  language;
  selectedSnippetId: number;
  id: number;
}) => {
  return (
    <div
      className={`item flex justify-between p-1 w-full h-full ${selectedSnippetId === id ? "bg-emerald-300" : ""} rounded-lg cursor-pointer`}
      onClick={selectSnippet}
    >
      <div className={`text-content border-l-3 border-emerald-300 px-1`}>
        <h2 className="text-md">{title}</h2>
        <p className="text-sm text-gray-500">
          date created: {dateAdded.getDay()}
          {"-"}
          {dateAdded.getMonth()}
          {"-"}
          {dateAdded.getFullYear()}
        </p>
      </div>
      <p
        className={`px-3 rounded-2xl ${selectedSnippetId === id ? "bg-white" : "bg-emerald-300"} h-fit`}
      >
        {language}
      </p>
    </div>
  );
};
