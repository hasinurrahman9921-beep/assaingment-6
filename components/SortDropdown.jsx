'use client';

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 font-medium">Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-[#13161c] border border-gray-800 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#ccff00]"
      >
        <option value="default">Default</option>
        <option value="duration">Duration (Low to High)</option>
        <option value="calories">Calories (High to Low)</option>
        <option value="rating">Rating (Highest First)</option>
      </select>
    </div>
  );
}