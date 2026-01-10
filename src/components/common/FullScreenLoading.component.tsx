function FullScreenLoading({ show = true }: { show?: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-transparent" />

        <p className="text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default FullScreenLoading;
