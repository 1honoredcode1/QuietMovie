import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <Link to="/" className="max-md:flex-1">
        <h1
          className="
    relative inline-block text-3xl
    after:absolute after:left-0 after:-bottom-1
    after:h-0.5 after:w-full
    after:origin-left after:scale-x-0
    after:bg-linear-to-r after:from-primary after:to-white
    after:transition-transform after:duration-300
    hover:after:scale-x-100
  "
        >
          <span className="text-primary">Q</span>uietMovie
        </h1>
      </Link>
    </div>
  );
};

export default AdminNavbar;
