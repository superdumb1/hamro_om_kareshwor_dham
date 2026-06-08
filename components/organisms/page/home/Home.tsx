import React from 'react'

const Homes = () => {
  return (
    <div>
        {/* Main Content Area */}
        
        {/* 1. Hero Section */}
        <section className="relative bg-stone-900 text-white py-16 px-4 text-center overflow-hidden">
          {/* Optional overlay background decor */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/40 to-stone-900/90 z-0" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-orange-400 font-semibold tracking-widest uppercase text-xs sm:text-sm block mb-2">
              Welcome to 
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-amber-100">
              Om Kareshwor Siwalaya
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              A sacred sanctuary for worship, peace, and community gathering in Jyamirgadhi. Join us in preserving our heritage.
            </p>
          </div>
        </section>

        {/* 2. Quick Info / Daily Timings Grid */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-950 font-serif border-b border-stone-100 pb-2 mb-4 flex items-center gap-2">
              <span className="text-orange-600">☀️</span> Daily Mandir Timings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">Morning Darshan</p>
                <p className="text-stone-500 mt-0.5">5:00 AM - 11:30 AM</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">Maha Aarti</p>
                <p className="text-stone-500 mt-0.5">6:30 AM & 6:45 PM</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">Evening Darshan</p>
                <p className="text-stone-500 mt-0.5">4:00 PM - 8:35 PM</p>
              </div>
            </div>
          </div>
        </section>

    </div>
  )
}

export default Homes