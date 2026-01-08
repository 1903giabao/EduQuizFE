function AddButton({ onClick }) {
  return (
    <button
      className="w-20 p-2 flex gap-1 rounded-lg text-white text-lg text-semibold bg-gradient-to-r from-[#00adef] to-[#3871c1] hover:opacity-80"
      onClick={onClick}
    >
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div>Add</div>
    </button>
  );
}

export default AddButton;
