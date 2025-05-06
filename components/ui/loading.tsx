'use client';

export default function Loading() {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mb-3"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}