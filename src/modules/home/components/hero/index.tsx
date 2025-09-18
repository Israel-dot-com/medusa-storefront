"use client"
import { Button, Heading } from "@medusajs/ui"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Sample hero images - you'll want to replace these with your actual product images
  const heroImages = [
    {
      src: "/image/image1.jpg",
      alt: "Artistic fashion photography",
      title: "Curated Collections",
      subtitle: "Where art meets fashion"
    },
    {
      src: "/image/image2.jpg", 
      alt: "Vintage inspired clothing",
      title: "Timeless Design",
      subtitle: "Handpicked for the discerning"
    },
    {
      src: "/image/image3.jpg",
      alt: "Creative lifestyle",
      title: "Express Yourself",
      subtitle: "Unique pieces for unique souls"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-2xl mx-auto">
          <Heading
            level="h1"
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wide"
          >
            {heroImages[currentImage].title}
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl text-white/90 font-light mb-8 tracking-wide"
          >
            {heroImages[currentImage].subtitle}
          </Heading>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="large"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              Shop Collection
            </Button>
            <Button 
              variant="transparent" 
              size="large"
              className="border-white/40 text-white hover:bg-white/10 transition-all duration-300"
            >
              Discover Story
            </Button>
          </div>
        </div>

        {/* Email Signup Section */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <p className="text-white/80 text-sm mb-4 tracking-wide">
            Join our mailing list for early access to new releases
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
            />
            <Button 
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100 px-6 border-0"
            >
              →
            </Button>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? 'bg-white' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Side Navigation */}
      <button
        onClick={() => setCurrentImage((prev) => 
          prev === 0 ? heroImages.length - 1 : prev - 1
        )}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Hero