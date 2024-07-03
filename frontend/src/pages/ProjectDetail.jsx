import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../hooks/apiHook.js"; // Import updateProject
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoverImageModal, setIsCoverImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  // Edit & Delete
  const [editing, setEditing] = useState(false);
  const [editedMaterials, setEditedMaterials] = useState([]);
  const [editedSteps, setEditedSteps] = useState([]);

  // COMMENTS ------------------------------------
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Add comments state

  // Use Efferct
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const result = await getProjectById(projectId);
        setProject(result);
        setEditedMaterials(result.materials.split(",")); // ADDED
        setEditedSteps(result.steps); // ADDED
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

  // EDIT handler for  MATERIALS AND STEPS
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
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleCancelChanges = async () => {
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

  // -----------------------------------   coments!!
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
  // -----------------------------------   coments!!

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-4 cursor-pointer"
          onClick={() => openCoverImageModal(project.coverImage)}
        />
      )}
      <p className="text-gray-700 mb-4">{project.description}</p>

      {/* ADDED */}
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
      {/* ADDED */}

      {/* CHANGED 
      <ol className="list-decimal  space-y-4 p-4">{materialsList}</ol>  */}
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

      {/* ADDED */}
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
              </>
            )}
            {step.images && step.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
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
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-4 mr-4 p-1 text-white bg-gray-700 rounded"
        >
          Close
        </button>
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={currentImages[modalImageIndex]}
            alt="Enlarged View"
            className="w-full h-full object-contain"
          />
          {!isCoverImageModal && (
            <div className="mt-4 flex justify-between w-full">
              <button
                onClick={prevImage}
                className="p-1 text-white bg-gray-700 rounded"
              >
                Back
              </button>
              <button
                onClick={nextImage}
                className="p-1 text-white bg-gray-700 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Comment Section       // ------------------------------------------- */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-8">
        <textarea
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
      {/* Comment Section       // ------------------------------------------- */}
      {/* Render the list of comments */}
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mb-2">
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
