export const Navbar = () => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex flex-wrap space-x-3 text-sm font-medium">
        <li className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-1 text-gray-800">
            <svg
              className="h-4 w-4 shrink-0 fill-gray-500"
              aria-hidden="true"
              viewBox="0 0 256 256"
            >
              <path d="M184 32H72A16 16 0 0056 48V224a8.1 8.1.0 004.1 7 7.6 7.6.0 003.9 1 7.9 7.9.0 004.2-1.2L128 193.4l59.7 37.4a8.3 8.3.0 008.2.2 8.1 8.1.0 004.1-7V48A16 16 0 00184 32z"></path>
            </svg>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="flex items-center space-x-3">
          <div
            aria-hidden="true"
            className="h-4 w-px rotate-12 rounded-full bg-gray-300"
          ></div>
          <a href="#" className="flex items-center space-x-1 text-gray-400">
            <svg
              className="h-4 w-4 shrink-0 fill-gray-300"
              aria-hidden="true"
              viewBox="0 0 256 256"
            >
              <path d="M2e2 32H163.7a47.8 47.8.0 00-71.4.0H56A16 16 0 0040 48V216a16 16 0 0016 16H2e2a16 16 0 0016-16V48A16 16 0 002e2 32zm-72 0a32.1 32.1.0 0132 32H96a32.1 32.1.0 0132-32z"></path>
            </svg>
            <span>Optimiser</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
