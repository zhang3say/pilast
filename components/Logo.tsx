export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Abstract P / Reformer / Core Strength */}
      <path 
        d="M14 42V18C14 10.268 20.268 4 28 4C35.732 4 42 10.268 42 18C42 25.732 35.732 32 28 32H14" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M28 18C28 21.3137 25.3137 24 22 24C18.6863 24 16 21.3137 16 18C16 14.6863 18.6863 12 22 12C25.3137 12 28 14.6863 28 18Z" 
        fill="currentColor"
      />
    </svg>
  );
}
