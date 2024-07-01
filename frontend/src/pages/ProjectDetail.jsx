import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../hooks/apiHook.js";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoverImageModal, setIsCoverImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Add comments state

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const result = await getProjectById(projectId);
        setProject(result);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const openCoverImageModal = (image) => {
    setCurrentImages([image]);
    setIsCoverImageModal(true);
    setIsModalOpen(true);
  };

  const openStepImagesModal = (images, index) => {
    setCurrentImages(images);
    setModalImageIndex(index);
    setIsCoverImageModal(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageIndex(0);
    setCurrentImages([]);
  };

  const nextImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const prevImage = () => {
    setModalImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (comment.trim() === "") return; // Avoid posting empty comments

    try {
      // Here you can make an API call to post the comment
      // Example: await postComment(projectId, comment);

      // Assuming the comment posting was successful, update the comments list
      setComments((prevComments) => [...prevComments, comment]);
      setComment(""); // Clear the textarea after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const materialsArray = project.materials.split(",");
  const materialsList = [];
  materialsArray.forEach((material, index) => {
    materialsList.push(
      <li key={index} className='bg-white p-4'>
        <p className='text-gray-700'>{material.trim()}</p>
      </li>
    );
  });

  return (
    <div className='container mx-auto max-w-5xl p-4'>
      <h1 className='text-2xl font-bold mb-4'>{project.title}</h1>
      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className='w-full h-96 object-cover rounded-lg mb-4 cursor-pointer'
          onClick={() => openCoverImageModal(project.coverImage)}
        />
      )}
      <p className='text-gray-700 mb-4'>{project.description}</p>
      <h2 className='text-xl font-semibold mb-2 text-center'>Materials</h2>
      <ol className='list-decimal  space-y-4 p-10'>{materialsList}</ol>

      <h2 className='text-xl font-semibold mb-2 text-center'>Steps</h2>
      <div className='space-y-4'>
        {project.steps.map((step, index) => (
          <div key={index} className='bg-white rounded-lg shadow-md p-4'>
            <h3 className='text-lg font-semibold mb-2'>Step {index + 1}</h3>
            <p className='text-gray-700 mb-2'>{step.description}</p>
            {step.images && step.images.length > 0 && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    className='w-full h-32 object-cover rounded-lg cursor-pointer'
                    onClick={() => openStepImagesModal(step.images, imgIndex)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Image Modal'
        className='modal'
        overlayClassName='modal-overlay'>
        <button
          onClick={closeModal}
          className='absolute top-0 right-0 mt-4 mr-4 p-1 text-white bg-gray-700 rounded'>
          Close
        </button>
        <div className='flex flex-col items-center justify-center h-full'>
          <img
            src={currentImages[modalImageIndex]}
            alt='Enlarged View'
            className='w-full h-full object-contain'
          />
          {!isCoverImageModal && (
            <div className='mt-4 flex justify-between w-full'>
              <button
                onClick={prevImage}
                className='p-1 text-white bg-gray-700 rounded'>
                Back
              </button>
              <button
                onClick={nextImage}
                className='p-1 text-white bg-gray-700 rounded'>
                Next
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Comment Section */}
      <div className='bg-white p-4 rounded-lg shadow-md mt-8'>
        <textarea
          className='w-full p-2 border rounded mb-2'
          placeholder='Please share your comments and have a discussion here!'
          value={comment}
          onChange={handleCommentChange}
        />
        <p className='text-sm text-gray-500 mb-2'>
          We have a be nice policy. Please be positive and constructive.
        </p>
        <div className='flex justify-between items-center'>
          <button 
            className='bg-gray-200 text-gray-700 px-4 py-2 rounded' 
            onClick={() => setComment("")}
          >
            Cancel
          </button>
          <div className='flex items-center'>
            <button
              onClick={handlePostComment}
              className='bg-yellow-500 text-white px-4 py-2 rounded'>
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Render the list of comments */}
      <div className='mt-4'>
        {comments.map((comment, index) => (
          <div key={index} className='bg-gray-100 p-2 rounded mb-2'>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
