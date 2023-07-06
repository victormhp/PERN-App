import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className='grid min-h-screen place-content-center'>
      <div className='max-w-md rounded-md border border-zinc-700 bg-zinc-800 p-8 shadow-md'>
        <h1 className='mb-4 text-3xl font-semibold'>404 - Page Not Found</h1>
        <p className='mb-4'>Oops! The page you are looking for does not exist.</p>
        <Link to='/' className='text-purple-400 hover:underline'>
          Go back to homepage
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
