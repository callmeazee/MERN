import Card from "../shared/Card";
import Button from "../shared/Button"; // Imported your shared button component


const Friends = () => {
  // Mock dataset representation to easily tie into backend data payloads later
  const friendsList = Array(20).fill({
    name: "John Alex",
    role: "Full Stack Developer",
    image: "/images/man1.png", // Safe image pointer path mapping
  });

  return (
    <div className="space-y-6">
      {/* DIRECTORY HEADER METRICS ROW */}
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-medium text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {friendsList.length}
          </span>{" "}
          active connections
        </p>
      </div>

      {/* DYNAMIC RESPONSIVE GRID CONFIGURATION */}
      {/* Mobile: 1 Column | Small Tablets: 2 Columns | Large Laptops: 3 Columns | Ultra-wide: 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {friendsList.map((friend, idx) => (
          <Card
            key={idx}
            noPadding
            className="hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center p-5 text-center">
              {/* Profile Image Wrapper Frame */}
              <div className="relative mb-3.5 p-1 rounded-full bg-slate-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                {friend.image ? (
                  <img
                    src={friend.image}
                    alt={`${friend.name} profile`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm bg-white"
                    onError={(e) => {
                      // Fallback if image asset route doesn't exist
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  // Fallback sleek placeholder if target asset path is null
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                    JA
                  </div>
                )}
                {/* Active Live Status Dot */}
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
              </div>

              {/* Text Block Node Layout */}
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none truncate w-full">
                {friend.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1 mb-4 truncate w-full max-w-40">
                {friend.role}
              </p>

              {/* INTEGRATED SHARED COMPONENT BUTTON */}
              {/* Replaces raw markup with your modular design system element. 
                  w-full expands it cleanly to fit the lower card panel width parameters perfectly on mobile */}
              <Button
                type="danger"
                icon="user-minus-line"
                className="w-full text-xs py-2 rounded-xl justify-center font-semibold bg-rose-500/50 hover:bg-rose-500 hover:text-white text-rose-500 border border-rose-100 shadow-none hover:scale-100"
                onClick={() =>
                  alert(`Unfriend handler clicked for item index: ${idx}`)
                }>
                Unfriend
              </Button>
            </div>
     
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Friends;
