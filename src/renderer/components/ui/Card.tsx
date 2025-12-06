interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      {title && <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>}
      {children}
    </div>
  );
}
