const SkeletonLoader = () => {
    return (
      <article className="flex flex-wrap gap-10 w-screen justify-center">
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="space-y-8 animate-pulse items-center flex flex-col w-72 h-96 max-w-sm p-4 border border-gray-200 rounded shadow"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full h-90 flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex w-full mb-2.5 justify-around">
              <div className="h-10 bg-gray-200 rounded-full w-1/2 mr-2"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 ml-2"></div>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </article>
    )
  }
  
  export default SkeletonLoader
  