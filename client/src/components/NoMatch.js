const NoMatch = () => {
  return (
    <div className="grid place-items-center h-screen">
      <section className="grid justify-items-center">
        <h1 className="text-lg font-mono mb-4 transform -rotate-12 text-white">
          beep boop
        </h1>
        <div className="h-16 flex gap-5 overflow-hidden rounded-t-full shadow-inner">
          <div className="bg-red-500 w-2"></div>
          <div className="bg-red-500 w-2"></div>
          <div className="bg-gray-800 w-5"></div>
          <div className="bg-gray-800 w-5"></div>
          <div className="bg-red-500 w-2"></div>
          <div className="bg-red-500 w-2"></div>
        </div>
        <div className="bg-gray-100 rounded flex flex-col gap-2 p-2 shadow-md">
          <div className="flex gap-2">
            <div className="h-20 w-12 shadow-md bg-gradient-to-t from-gray-50 to-red-300 flex place-items-center overflow-hidden">
              <div className="rounded bg-gray-900 h-4 w-4"></div>
            </div>
            <div className="h-20 w-12 shadow-md bg-gradient-to-t from-gray-50 to-red-300 flex place-items-center overflow-hidden">
              <div className="rounded bg-gray-900 h-4 w-4"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-4 w-4 bg-gray-300 rounded-full shadow-md"></div>
              <div className="h-4 w-4 bg-gray-300 rounded-full shadow-md"></div>
              <div className="h-4 w-4 bg-gray-300 rounded-full shadow-md"></div>
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-700 flex flex-wrap gap-2 overflow-hidden justify-center">
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
            <div className="bg-gray-100 h-4 w-4"></div>
          </div>
        </div>
        <div className="h-24 w-24 bg-red-500 relative">
          <div className="absolute h-16 w-16 rounded-full bg-red-600 shadow-md top-4 left-4"></div>
          <div className="animate-ping absolute h-8 w-8 rounded-full bg-yellow-500 shadow-lg top-8 left-8"></div>
          <div className="absolute h-8 w-8 rounded-full bg-yellow-500 shadow-lg top-8 left-8"></div>
          <div className="flex gap-5">
            <div className="h-12 w-12 bg-gray-400"></div>
            <div className="h-12 w-12 bg-gray-400"></div>
          </div>
          <div className="flex gap-5">
            <div className="h-12 w-12 bg-gray-800"></div>
            <div className="h-12 w-12 bg-gray-500"></div>
          </div>
        </div>
        <div className=" relative">
          <div className="h-32 w-36 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-full z-50"></div>
          <div className="bg-gray-500 h-4"></div>
          <div className="absolute h-12 w-8 bg-red-900 top-28 left-0 z-40"></div>
          <div className="absolute h-12 w-8 bg-red-900 top-28 right-0"></div>
        </div>
        <div className="flex gap-20">
          <div className="h-10 w-8 bg-gray-900 rounded-b-full"></div>
          <div className="h-10 w-8 bg-gray-900 rounded-b-full"></div>
        </div>
      </section>
    </div>
  );
};

export default NoMatch;
