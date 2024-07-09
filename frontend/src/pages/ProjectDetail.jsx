import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject, deleteProject } from "../hooks/apiHook.js";
import Modal from "react-modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement("#root");

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCoverImageModal, setIsCoverImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedMaterials, setEditedMaterials] = useState([]);
  const [editedSteps, setEditedSteps] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const result = await getProjectById(projectId);
        setProject(result);
        setEditedMaterials(result.materials.split(","));
        setEditedSteps(result.steps);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const openCoverImageModal = (image) => {
    setCurrentImages([image]);
    setIsCoverImageModal(true);
  };

  const openStepImagesModal = (images, index) => {
    setCurrentImages(images);
    setModalImageIndex(index);
    setIsCoverImageModal(true);
  };

  const closeCoverImageModal = () => {
    setIsCoverImageModal(false);
    setCurrentImages([]);
    setModalImageIndex(0);
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProject = {
        ...project,
        materials: editedMaterials.join(","),
        steps: editedSteps,
      };
      const result = await updateProject(projectId, updatedProject);
      setProject(result);
      setEditing(false);
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project");
    }
  };

  const handleCancelChanges = () => {
    setEditing(false);
    setEditedMaterials(project.materials.split(","));
    setEditedSteps(project.steps);
  };

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...editedMaterials];
    updatedMaterials[index] = value;
    setEditedMaterials(updatedMaterials);
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = editedMaterials.filter((_, i) => i !== index);
    setEditedMaterials(updatedMaterials);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...editedSteps];
    updatedSteps[index] = { ...updatedSteps[index], description: value };
    setEditedSteps(updatedSteps);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = editedSteps.filter((_, i) => i !== index);
    setEditedSteps(updatedSteps);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (comment.trim() === "") return;

    try {
      // Example: await postComment(projectId, comment);
      setComments((prevComments) => [...prevComments, comment]);
      setComment("");
      toast.success("Comment posted successfully");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Error posting comment");
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully");
      navigate('/myprojects');
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    } finally {
      setIsDeleteModalOpen(false); 
    }
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(true); 
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  
  const username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null;
  const isOwner = username === project.username;

  return (
    <div className='container mx-auto max-w-5xl p-4'>
      <h1 className='text-2xl font-bold mb-4'>{project.title}</h1>

      <div className="text-sm">
        <p className="text-gray-700 mb-2 font-semibold">created by: {project.username}</p>
        <p className="text-gray-500 mb-2">created on {new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-4 cursor-pointer"
          onClick={() => openCoverImageModal(project.coverImage)}
        />
      )}
      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 text-center ">Materials</h2>
        {editing ? (
          <>
            <div className="flex flex-col mr-4 ">
              <button
                onClick={handleSaveChanges}
                className="hover:bg-blue-300 bg-green-600 text-white px-2 py-1 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancelChanges}
                className="hover:bg-blue-300 mt-2 bg-stone-700 text-white px-2 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="hover:bg-blue-300 bg-green-600 text-white px-3 mr-4 py-1.5 rounded text-sm"
          >
            Edit
          </button>
        )}
      </div>

      <ol className="list-decimal  space-y-4 p-4">
        {editedMaterials.map((material, index) => (
          <li
            key={index}
            className="bg-white flex justify-between items-center"
          >
            {editing ? (
              <>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => handleMaterialChange(index, e.target.value)}
                  className="text-gray-700 border p-2 w-[85%]"
                />
                <button
                  onClick={() => handleDeleteMaterial(index)}
                  className="hover:bg-blue-300 bg-red-600 text-white px-2 py-1.5 rounded text-xs"
                >
                  Delete
                </button>
              </>
            ) : (
              <p className="text-gray-700">{material.trim()}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 text-center">Steps</h2>
      </div>

      <div className="space-y-4">
        {editedSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
            {editing ? (
              <>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  value={step.description}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteStep(index)}
                    className="hover:bg-blue-300 bg-red-600 text-white px-2.5 py-1.5 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-2 text-justify">
                  {step.description}
                </p>
                <div className="flex space-x-4">
                  {step.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Step ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => openStepImagesModal(step.images, imgIndex)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Comments</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Please share your comments here!"
          value={comment}
          onChange={handleCommentChange}
        />
        <p className="text-sm text-gray-500 mb-2">
          We have a be nice policy. Please be positive and constructive.
        </p>
        <div className="flex justify-between items-center">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            onClick={() => setComment("")}
          >
            Cancel
          </button>
          <div className="flex items-center">
            <button
              onClick={handlePostComment}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mb-2">
            {comment}
          </div>
        ))}
      </div>

      {isOwner && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={confirmDelete}
            className="hover:bg-red-700 bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Project
          </button>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Project Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="hover:bg-blue-300 bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProject}
              className="hover:bg-blue-300 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCoverImageModal}
        onRequestClose={closeCoverImageModal}
        contentLabel="Cover Image Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-4">
          <button
            onClick={closeCoverImageModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {currentImages.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {currentImages.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
          <img
            src={currentImages[modalImageIndex]}
            alt="modal"
            className="w-full h-auto"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetail;

