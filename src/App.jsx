import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function AbramHillsHotel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slides = [
    {
      title: "The Art of African Hospitality",
      subtitle: "Experience Luxury Redefined",
      image: "/images/hero3.png"
    },
    {
      title: "Unparalleled Comfort & Service",
      subtitle: "Where Every Detail Matters",
      image: "/images/hero2.png"
    },
    {
      title: "Your Gateway to Excellence",
      subtitle: "Discover True Hospitality",
      image: "/images/hero1.png"
    }
  ];

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('Slides:', slides);
    console.log('Current slide:', currentSlide);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className={`${scrolled ? 'text-gray-900' : 'text-white'}`}>Abram Hills</span>
                <div className={`text-xs font-light tracking-widest ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>HOTEL & SPA</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#rooms" className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'} transition-colors`}>Rooms & Suites</a>
              <a href="#dining" className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'} transition-colors`}>Dining</a>
              <a href="#spa" className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'} transition-colors`}>Spa</a>
              <a href="#events" className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'} transition-colors`}>Events</a>
              <button className="bg-[#d97706] text-white px-6 py-2 hover:bg-amber-700 transition-colors">BOOK NOW</button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className={scrolled ? 'text-gray-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a href="#rooms" className="block py-2 text-gray-700 hover:text-gray-900">Rooms & Suites</a>
              <a href="#dining" className="block py-2 text-gray-700 hover:text-gray-900">Dining</a>
              <a href="#spa" className="block py-2 text-gray-700 hover:text-gray-900">Spa</a>
              <a href="#events" className="block py-2 text-gray-700 hover:text-gray-900">Events</a>
              <button className="w-full bg-amber-600 text-white px-6 py-2 hover:bg-amber-700 transition-colors">BOOK NOW</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              onError={(e) => {
                console.error('Failed to load image:', slide.image);
                e.target.style.backgroundColor = '#1f2937';
              }}
              onLoad={() => console.log('Image loaded:', slide.image)}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="text-white px-4">
                <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide drop-shadow-2xl">{slide.title}</h1>
                <p className="text-xl md:text-2xl font-light tracking-widest drop-shadow-lg">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all">
          <ChevronLeft className="text-black" size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all">
          <ChevronRight className="text-black" size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">Abram Hills Hotel<br />Koforidua, Ghana</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nestled in the picturesque hills of Koforidua, Abram Hills Hotel stands as a beacon of African hospitality and modern luxury. Our hotel combines contemporary elegance with warm, traditional service to create an unforgettable experience for every guest.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With world-class amenities, exquisite dining options, and spacious accommodations, we offer the perfect sanctuary for both business and leisure travelers seeking the finest hospitality Ghana has to offer.
            </p>
            <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all">
              HOTEL DETAILS
            </button>
          </div>
          <div>
            <img src="images/details.png" alt="Hotel" className="w-full h-96 object-cover shadow-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="p-6">
            <MapPin className="mx-auto mb-4 text-amber-600" size={40} />
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-600">E7-176-4958 Pipeline, Koforidua</p>
            <p className="text-gray-600">Eastern Region, Ghana</p>
          </div>
          <div className="p-6">
            <Phone className="mx-auto mb-4 text-amber-600" size={40} />
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p className="text-gray-600">+233 24 454 4741</p>
            <p className="text-gray-600">+233 53 363 3910</p>
          </div>
          <div className="p-6">
            <Mail className="mx-auto mb-4 text-amber-600" size={40} />
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-600">abramhillshotel@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Rooms & Suites */}
      <section id="rooms" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="images/rooms2.png" alt="Rooms" className="w-full h-96 object-cover shadow-xl" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-light mb-6 text-gray-900">Rooms & Suites</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Each of our elegantly appointed rooms and suites offers a serene retreat with stunning views, plush furnishings, and modern amenities. From our comfortable standard rooms to our luxurious presidential suite, every space is designed with your comfort in mind.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Star className="text-amber-600" size={20} />
                  <span className="text-gray-700">Deluxe Rooms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="text-amber-600" size={20} />
                  <span className="text-gray-700">Executive Suites</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="text-amber-600" size={20} />
                  <span className="text-gray-700">Presidential Suite</span>
                </div>
              </div>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all">
                VIEW ROOMS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dining */}
      <section id="dining" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">Restaurants & Bars</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Indulge in exceptional culinary experiences at our restaurants and bars. From authentic Ghanaian cuisine to international favorites, our talented chefs create memorable dining moments using the finest local and imported ingredients.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Main Restaurant</h3>
                  <p className="text-gray-600">All-day dining with international cuisine</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rooftop Bar & Lounge</h3>
                  <p className="text-gray-600">Cocktails with panoramic city views</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pool Bar</h3>
                  <p className="text-gray-600">Light meals and refreshing drinks</p>
                </div>
              </div>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all mt-8">
                VIEW MENUS
              </button>
            </div>
            <div>
              <img src="images/restaurants.png" alt="Dining" className="w-full h-96 object-cover shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Spa */}
      <section id="spa" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" alt="Spa" className="w-full h-96 object-cover shadow-xl" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-light mb-6 text-gray-900">Resense Spa</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                The Resense Spa offers three hours of blissful healing. We invite guests to discover a life-awakening spa experience that will nourish the skin, body, and mind through personalized treatments and holistic therapies designed to rejuvenate your senses.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our experienced therapists use premium products and ancient techniques to deliver treatments that promote wellness, relaxation, and inner peace.
              </p>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-6 text-gray-900">Meetings & Events</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With state-of-the-art facilities and personalized by our expert team, our hotel provides the perfect setting for business meetings, corporate events, weddings, and social gatherings of all sizes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 overflow-hidden shadow-xl">
              <img
                src="/images/business-event.png" alt="Conference" className="w-full h-full object-cover block hover:scale-110 transition-transform duration-500" />
              
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <h3 className="text-white text-3xl font-light">Business Events</h3>
              </div>
            </div>


            <div className="relative h-80 overflow-hidden shadow-xl">
              <img src="/images/celebration-event.png" alt="Wedding" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-3xl font-light">Celebrations</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#d97706] text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Experience Exceptional Hospitality</h2>
          <p className="text-xl mb-8 font-light">Book your stay at Abram Hills Hotel and discover the finest in African luxury</p>
          <button className="bg-white text-[#d97706] px-10 py-4 text-lg hover:bg-gray-100 transition-all">
            RESERVE YOUR STAY
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Abram Hills</h3>
              <p className="text-sm text-gray-400">Hotel & Spa</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#rooms" className="hover:text-white">Rooms</a></li>
                <li><a href="#dining" className="hover:text-white">Dining</a></li>
                <li><a href="#spa" className="hover:text-white">Spa</a></li>
                <li><a href="#events" className="hover:text-white">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>E7-176-4958</li>
                <li>7 Opoku Agyarko Lane, Pipeline, Koforidua, Eastern Region</li>
                <li>+233 24 454 4741</li>
                <li>+233 53 363 3910</li>
                <li>abramhillshotel@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Abram Hills Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}