export const Item = () => {
  return (
    <div className="item flex justify-between p-1 items-center w-full">
      <div className="text-content border-l-3 border-emerald-300 px-2">
        <h2 className="text-md">Title of Item</h2>
        <p className="text-sm text-gray-500">date added</p>
      </div>
      <div className="icons">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          className="w-4 h-4 ml-2"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          className="w-4 h-4 ml-2"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </div>
    </div>
  );
};
