import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../hooks/apiHook.js';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const result = await getProjectById(projectId);
        setProject(result);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  const openModal = (images, index) => {
    setCurrentImages(images);
    setModalImageIndex(index);
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
    setModalImageIndex((prevIndex) => (prevIndex - 1 + currentImages.length) % currentImages.length);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      {project.coverImage && (
        <img src={project.coverImage} alt={project.title} className="w-full h-96 object-cover rounded-lg mb-4" />
      )}
      <p className="text-gray-700 mb-4">{project.description}</p>
      <h2 className="text-xl font-semibold mb-2">Materials</h2>
      <p className="text-gray-700 mb-4">{project.materials}</p>
      <h2 className="text-xl font-semibold mb-2">Steps</h2>
      <div className="space-y-4">
        {project.steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700 mb-2">{step.description}</p>
            {step.images && step.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Step ${index + 1} Image ${imgIndex + 1}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => openModal(step.images, imgIndex)}
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
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="absolute top-0 right-0 mt-4 mr-4 p-1 text-white bg-gray-700 rounded">Close</button>
        <div className="flex flex-col items-center justify-center h-full">
          <img src={currentImages[modalImageIndex]} alt="Enlarged View" className="w-full h-full object-contain" />
          <div className="mt-4 flex justify-between w-full">
            <button onClick={prevImage} className="p-1 text-white bg-gray-700 rounded">Back</button>
            <button onClick={nextImage} className="p-1 text-white bg-gray-700 rounded">Next</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
