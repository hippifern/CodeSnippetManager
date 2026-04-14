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
            <span>email@email.com</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
