export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) {
  const baseClasses = 'font-semibold py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-anime-primary hover:bg-anime-secondary text-white transform hover:scale-105 active:scale-95',
    secondary: 'bg-transparent border-2 border-anime-primary text-anime-primary hover:bg-anime-primary hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}


