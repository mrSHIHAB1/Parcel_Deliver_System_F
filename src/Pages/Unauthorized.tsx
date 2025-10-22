
import { Link } from 'react-router-dom';

const Unauthorized = () => {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-yellow-500 mb-4">401</h1>
      <p className="text-gray-700 text-xl mb-6">
        You are not authorized to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Unauthorized