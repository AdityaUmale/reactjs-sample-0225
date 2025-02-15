export default function FloatingAddButton() {
  return (
    <button 
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#2B4172] rounded-full flex items-center justify-center shadow-lg hover:bg-[#3a5491] transition-colors"
      title="Add new task"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 text-white" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 4v16m8-8H4" 
        />
      </svg>
    </button>
  );
}