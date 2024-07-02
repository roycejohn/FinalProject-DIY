import Community1 from "../assets/community1.jpg";
import Community2 from "../assets/community2.jpg";
import Community3 from "../assets/community3.jpg";
import Community4 from "../assets/community_2.jpg";
import Ladyicon from "../assets/ladyicon.png";
import Genicon from "../assets/Genicon.png";

function Community() {
  return (
    <div>
      {/* 
    Header */}
      <header>
        <div className='container mx-auto py-4 px-4 text-center'>
          <h1 className='text-4xl font-bold'>DIY Hub Community</h1>
          <p className='mt-2 text-gray-600'>
            We are happy to have you here. If you need help, questions or
            curiosity please search before you post.
          </p>
        </div>
      </header>

      {/* search function */}
      <div className='my-8 flex justify-center'>
        <input
          type='text'
          className='w-full max-w-lg px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600'
          placeholder='Search the community'
        />
        {/*Communities */}
      </div>

      <h2 className='text-2xl font-bold flex justify-center mb-6'>
        Communities
      </h2>

      <section className='my-8 flex justify-center'>
        <div className='bg-white shadow rounded-lg overflow-hidden mb-6 flex'>
          <img
            src={Community1}
            alt='Community'
            className='w-1/3 h-48 object-cover'
          />
          <div className='p-4 w-1/2'>
            <h3 className='text-xl font-semibold'>Introduce Yourself</h3>
            <p className='text-gray-600'>
              Please introduce and have a discussion about DIY project.
            </p>
            <div className='mt-4 flex items-center'>
              <img
                src={Ladyicon}
                alt='Avatar'
                className='w-10 h-10 rounded-full mr-3'
              />
              <div>
                <p className='text-gray-700 font-medium'>Angelika Müller</p>
                <div className='flex items-center text-gray-500'>
                  <span className='mr-2'>102</span>
                  <span className='mr-2'>💬</span>
                  <span>64</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='my-8 flex justify-center'>
        <div className='bg-white shadow rounded-lg overflow-hidden mb-6 flex'>
          <img
            src={Community4}
            alt='Community'
            className='w-1/3 h-48 object-cover'
          />
          <div className='p-4 w-1/2'>
            <h3 className='text-xl font-semibold'>
              {" "}
              Share Your Thoughts & Ideas
            </h3>
            <p className='text-gray-600'>
              Please share your thoughts and ideas related to DIY project!
            </p>
            <div className='mt-4 flex items-center'>
              <img
                src={Genicon}
                alt='Avatar'
                className='w-10 h-10 rounded-full mr-3'
              />
              <div>
                <p className='text-gray-700 font-medium'>Alex Hills</p>
                <div className='flex items-center text-gray-500'>
                  <span className='mr-2'>102</span>
                  <span className='mr-2'>💬</span>
                  <span>64</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='my-8 flex justify-center'>
        <div className='bg-white shadow rounded-lg overflow-hidden mb-6 flex'>
          <img
            src={Community3}
            alt='Community'
            className='w-1/3 h-48 object-cover'
          />
          <div className='p-4 w-1/2'>
            <h3 className='text-xl font-semibold'>
              Question & Answers Discussion
            </h3>
            <p className='text-gray-600'>
              Please get clarified with your questions
              related to DIY project.
            </p>
            <div className='mt-4 flex items-center'>
              <img
                src={Ladyicon}
                alt='Avatar'
                className='w-10 h-10 rounded-full mr-3'
              />
              <div>
                <p className='text-gray-700 font-medium'>Kathrine Hartmann</p>
                <div className='flex items-center text-gray-500'>
                  <span className='mr-2'>102</span>
                  <span className='mr-2'>💬</span>
                  <span>64</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Community;
