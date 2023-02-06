import SearchIcon from 'public/svg/SearchIcon.svg';

export default function SearchBar() {
  return (
    <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 overflow-hidden">
      <input
        type="text"
        className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-0"
      />
      <SearchIcon className="h-12 p-4 hover:bg-yellow-500" />
    </div>
  );
}
