export const Item = () => {
  return (
    <div className="item flex justify-between border-1 border-gray-500 p-1 rounded-md items-center w-full">
      <div className="text-content">
        <h2 className="text-lg">Title of Item</h2>
        <p className="text-md text-gray-500">date added</p>
      </div>
      <div className="icons">
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
      </div>
    </div>
  );
};
