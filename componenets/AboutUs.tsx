import Image from 'next/image';

export default function AboutUs() {
  return (
    <section id="aboutUs" className="py-16 px-6 bg-gray-50 overflow-hidden relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Title Card */}
        <div className="col-span-1 sm:col-span-2 bg-green-700 text-white rounded-xl p-8 relative overflow-hidden animate-slide-in-left">
          <h2 className="text-3xl font-serif mb-4">Rooted in Nature,<br/>Crafted with Care</h2>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-0 left-0 animate-pulse" />
          <div className="absolute w-20 h-20 bg-white/10 rounded-full bottom-0 right-0 animate-pulse delay-2000" />
        </div>

        {/* Image Card */}
        <div className="col-span-1 sm:col-span-2 h-72 rounded-xl overflow-hidden relative animate-fade-in">
          <Image 
            src="https://i.pinimg.com/736x/0d/17/a7/0d17a77d7ae2c14a82ccd84982679863.jpg" 
            alt="Organic face mask application" 
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute w-20 h-20 top-5 right-5 bg-contain bg-no-repeat animate-float" style={{ backgroundImage: `url('/leaf.png')` }} />
        </div>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-xl relative animate-float-up delay-200">
          <div className="w-14 h-14 bg-green-200 absolute -top-4 -left-4 opacity-70 animate-spin-slow clip-hexagon" />
          <h3 className="text-xl font-serif text-green-900 mb-3">Our Mission</h3>
          <p className="text-gray-700">To bring you the purest organic ingredients in every jar, for skin that glows with health.</p>
        </div>

        {/* Process Card */}
        <div className="bg-white p-6 rounded-xl relative animate-float-up delay-400">
          <div className="w-16 h-16 border-4 border-dashed border-green-700 rounded-full absolute -bottom-4 -right-4 animate-spin-slow" />
          <h3 className="text-xl font-serif text-green-900 mb-3">Handcrafted Process</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Ethically sourced ingredients</li>
            <li>Small batch production</li>
            <li>Zero waste packaging</li>
          </ul>
        </div>

        {/* Quote Card */}
        <div className="col-span-1 sm:col-span-2 bg-yellow-100 p-6 rounded-xl relative animate-slide-in-right delay-600">
          <blockquote className="italic text-lg text-green-900 border-l-4 border-green-700 pl-4 mb-4">
            "Nature provides everything we need for radiant skin - we just need to use it wisely."
          </blockquote>
          <p className="text-right text-sm text-green-800">- Sarah K., Founder</p>
          <div className="absolute w-24 h-1 bg-gradient-to-r from-green-800 to-transparent bottom-4 right-4 opacity-50" />
        </div>
      </div>
    </section>
  );
}
