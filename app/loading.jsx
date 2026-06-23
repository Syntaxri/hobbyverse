export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-hv-cyan/30 border-t-hv-cyan animate-spin" />
        <p className="text-hv-muted text-sm animate-pulse">Entering HobbyVerse...</p>
      </div>
    </div>
  );
}
