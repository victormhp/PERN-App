function Loader() {
  return (
    <div className='inline-flex animate-bounce items-center'>
      <img src='/logo.png' alt='Logo' className='h-[54px] w-[54px] p-2' />
      <h1 className='hidden text-2xl font-semibold tracking-wide text-purple-500 sm:block'>
        PERN <span className='font-medium text-primary'>Notes</span>
      </h1>
    </div>
  );
}

export default Loader;
