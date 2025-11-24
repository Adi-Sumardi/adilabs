export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-800 to-amber-600">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
        <p className="text-blue-100">Preparing your experience</p>
      </div>
    </div>
  );
}
