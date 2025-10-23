const PerfumeBottleLoading = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center">
      {/* Perfume Bottle SVG Animation */}
      <div className="relative">
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          {/* Bottle Cap */}
          <rect
            x="28"
            y="10"
            width="24"
            height="8"
            rx="2"
            fill="url(#capGradient)"
            className="animate-pulse"
          />
          
          {/* Bottle Neck */}
          <rect
            x="30"
            y="18"
            width="20"
            height="15"
            rx="1"
            fill="url(#neckGradient)"
          />
          
          {/* Main Bottle Body */}
          <path
            d="M 20 33 L 20 95 Q 20 105 30 105 L 50 105 Q 60 105 60 95 L 60 33 Z"
            fill="url(#bottleGradient)"
            className="animate-pulse"
            style={{ animationDuration: '2s' }}
          />
          
          {/* Liquid Inside - Animated */}
          <path
            d="M 25 70 L 25 95 Q 25 100 30 100 L 50 100 Q 55 100 55 95 L 55 70 Z"
            fill="url(#liquidGradient)"
            className="animate-bounce"
            style={{ animationDuration: '1.5s' }}
          />
          
          {/* Shine Effect */}
          <ellipse
            cx="35"
            cy="55"
            rx="8"
            ry="20"
            fill="white"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#b8941e" />
            </linearGradient>
            <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#e6d192" />
            </linearGradient>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#faf7e8" />
              <stop offset="50%" stopColor="#f5efd0" />
              <stop offset="100%" stopColor="#f0e6b8" />
            </linearGradient>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e6d192" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Sparkle Effects Around Bottle */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3.5s' }}>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3.5s', animationDirection: 'reverse' }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Loading Text with Animation */}
      <p className="mt-8 text-lg text-muted-foreground font-medium">
        Ruh Al Oud
        <span className="inline-flex ml-1">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
        </span>
      </p>
      
      {/* Shimmer dots */}
      <div className="mt-4 flex gap-2">
        <div className="h-2 w-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
        <div className="h-2 w-2 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
      </div>
    </div>
  );
};

export default PerfumeBottleLoading;