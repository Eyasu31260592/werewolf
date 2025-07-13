import React from 'react'

const ItalianMafiaCard = ({info}) => {
 return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full border border-gray-700 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Card Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6 text-green-400 tracking-wide">
        Italian Mafia
      </h2>

      {/* Card Image/Icon - Using a placeholder image for demonstration */}
      {/* You can replace this with a custom SVG or image asset for your game */}
      <div className="mb-6 flex justify-center">
        <img
          src="https://placehold.co/200x200/2d3748/cbd5e0?text=Mafia" // Placeholder image
          alt="Italian Mafia Icon"
          className="w-40 h-40 rounded-full border-4 border-green-500 shadow-lg object-cover"
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
          A powerful crime family that seeks to dominate the village. The Italian Mafia collaborates with the Japanese Mafia to eliminate the townspeople and take over.
        </p>
      </div>

      {/* Abilities Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Ability:</h3>
        <p className="text-gray-300 leading-relaxed italic">
          Each night, the Italian Mafia, in coordination with the Japanese Mafia, chooses one player to kill. They also have a unique ability to "extort" a player, preventing them from using their night ability for one night.
        </p>
      </div>

      {/* Alignment Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Alignment:</h3>
        <p className="text-red-400 font-bold text-lg">
          Mafia (Evil)
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
          The number of Mafia members equals or exceeds the number of remaining Town members.
        </p>
      </div>
    </div>
  );
}

export default ItalianMafiaCard