import React from 'react';
import Image from 'next/image';
import Layout from '../dashLayout';

const blog = () => {
  return (
    <>
      <Layout>
        <div className="max-w-md mx-auto bg-white border rounded-lg shadow-lg overflow-hidden md:max-w-4xl mb-4">
          <div className="bg-blue-400 text-white px-4 py-2 flex items-center justify-between">
            <div className="font-bold">Featured</div>
            <div className="text-sm">June 8 @ 5:30 am - 4:00 pm</div>
          </div>
          <div className="md:flex">
            <div className="bg-amber-500 text-white w-full md:w-16 flex flex-col items-center justify-center">
              <div className="text-xs">SAT</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="p-4 flex-1">
              <h2 className="text-xl font-bold mb-2">Step It Up: Hike and Thrive (NE)</h2>
              <p className="text-gray-700">
                <span className="font-bold">NEPAL</span>, Nepal
              </p>
              <p className="text-gray-700 mt-2">
                Buckle up! Buckle up!! The wait is over! CloudFactory Nepal presents you the most anticipated event of the year, Step It Up: Hike and Thrive,...
              </p>
              <div className="btn mt-5 flex">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/4 bg-cover bg-center h-48 md:h-auto py-5 flex justify-center items-center mr-2">
              <Image src={"/Images/profile_bg.png"} alt='Images' width={200} height={220} className='w-full md:w-auto h-32 mx-2' />
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto bg-white border rounded-lg shadow-lg overflow-hidden md:max-w-4xl mb-4">
          <div className="bg-blue-400 text-white px-4 py-2 flex items-center justify-between">
            <div className="font-bold">Featured</div>
            <div className="text-sm">June 8 @ 5:30 am - 4:00 pm</div>
          </div>
          <div className="md:flex">
            <div className="bg-amber-500 text-white w-full md:w-16 flex flex-col items-center justify-center">
              <div className="text-xs">SAT</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="p-4 flex-1">
              <h2 className="text-xl font-bold mb-2">Step It Up: Hike and Thrive (NE)</h2>
              <p className="text-gray-700">
                <span className="font-bold">NEPAL</span>, Nepal
              </p>
              <p className="text-gray-700 mt-2">
                Buckle up! Buckle up!! The wait is over! CloudFactory Nepal presents you the most anticipated event of the year, Step It Up: Hike and Thrive,...
              </p>
              <div className="btn mt-5 flex">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/4 bg-cover bg-center h-48 md:h-auto py-5 flex justify-center items-center mr-2">
              <Image src={"/Images/profile_bg.png"} alt='Images' width={200} height={220} className='w-full md:w-auto h-32 mx-2' />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default blog
