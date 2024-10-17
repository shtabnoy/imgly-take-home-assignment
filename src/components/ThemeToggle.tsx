import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="absolute top-0 right-0 m-2 flex items-center space-x-2">
      <span className="text-sm font-medium">
        {theme === 'light' ? 'Light Theme' : 'Dark Theme'}
      </span>
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <div className="relative w-12 h-6 transition duration-200 ease-linear rounded-full bg-gray-300 dark:bg-gray-700">
          <span
            className={`absolute left-0 w-6 h-6 transition duration-100 ease-linear transform bg-white rounded-full shadow ${
              theme === 'dark' ? 'translate-x-full bg-gray-800' : ''
            }`}
          ></span>
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
