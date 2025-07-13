import React from 'react'

const DoctorCard = () => {
 return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full border border-gray-700 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Card Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-300 tracking-wide">
        Doctor
      </h2>

      {/* Card Image/Icon - Using a placeholder image for demonstration */}
      {/* You can replace this with a custom SVG or image asset for your game */}
      <div className="mb-6 flex justify-center">
        <img
          src="https://placehold.co/200x200/2d3748/cbd5e0?text=Doctor" // Placeholder image
          alt="Doctor Icon"
          className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-lg object-cover"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback also fails
            e.target.src = "https://placehold.co/200x200/2d3748/cbd5e0?text=Error"; // Fallback
          }}
        />
      </div>

      {/* Description Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Description:</h3>
        <p className="text-gray-300 leading-relaxed">
          A skilled healer who can protect one player each night from dying. The Doctor cannot protect themselves two nights in a row.
        </p>
      </div>

      {/* Abilities Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Ability:</h3>
        <p className="text-gray-300 leading-relaxed italic">
          Each night, choose one player to protect. That player cannot be killed by Werewolves or other night killers that night.
        </p>
      </div>

      {/* Alignment Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Alignment:</h3>
        <p className="text-green-400 font-bold text-lg">
          Town (Good)
        </p>
      </div>

      {/* Winning Condition Section */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Winning Condition:</h3>
        <p className="text-gray-300 leading-relaxed">
          Eliminate all Werewolves and other opposing evil factions.
        </p>
      </div>
    </div>
  );
}

export default DoctorCard