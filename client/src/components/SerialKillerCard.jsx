import React from 'react'

const SerialKillerCard = ({info}) => {
   return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full border border-gray-700 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Card Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6 text-purple-400 tracking-wide">
        Serial Killer
      </h2>

      {/* Card Image/Icon - Using a placeholder image for demonstration */}
      {/* You can replace this with a custom SVG or image asset for your game */}
      <div className="mb-6 flex justify-center">
        <img
          src="https://placehold.co/200x200/2d3748/cbd5e0?text=Killer" // Placeholder image
          alt="Serial Killer Icon"
          className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-lg object-cover"
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
          A lone psychopath with a thirst for blood, the Serial Killer acts independently, choosing one victim each night. They win if they are the last person alive.
        </p>
      </div>

      {/* Abilities Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Ability:</h3>
        <p className="text-gray-300 leading-relaxed italic">
          Each night, choose one player to kill.
        </p>
      </div>

      {/* Alignment Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Alignment:</h3>
        <p className="text-red-400 font-bold text-lg">
          Neutral (Evil)
        </p>
      </div>

       {
        info.mate ? 
        <p className='text-center mb-3 font-mono text-red-700'>you kill with {info.mateInfo.name.split(" ")[0]}</p> 
        : 
        <p className='text-center mb-3 font-mono text-red-700'>you are killing alone tonight alone</p>
      }

      {/* Winning Condition Section */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Winning Condition:</h3>
        <p className="text-gray-300 leading-relaxed">
          Be the last player alive.
        </p>
      </div>
    </div>
  );
}

export default SerialKillerCard