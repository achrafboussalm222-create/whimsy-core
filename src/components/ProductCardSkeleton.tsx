export default function ProductCardSkeleton() {
  return (
    <div className="bg-cream-soft rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-[4/5] bg-brown/10" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-5 bg-brown/10 rounded w-3/4" />
        <div className="h-3 bg-brown/10 rounded w-full" />
        <div className="h-3 bg-brown/10 rounded w-5/6" />
        <div className="h-10 bg-brown/10 rounded-full mt-2" />
      </div>
    </div>
  );
}
