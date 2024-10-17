import { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string;
  timeout?: number;
}

function ErrorMessage({ message, timeout = 3000 }: ErrorMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!visible) return null;

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-2 mr-2 bg-red-500 text-white px-8 py-2 rounded shadow-lg">
      {message}
    </div>
  );
}

export default ErrorMessage;
