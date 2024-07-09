

import { useState } from "react";
import { createProject } from "../hooks/apiHook.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectForm = () => {
  const [formState, setFormState] = useState({
    coverImage: null,
    title: "",
    description: "",
    materials: "",
    category: "General",
    steps: [{ title: "", description: "", images: [] }],
  });

  const username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const steps = [...formState.steps];
    steps[index][name] = value;
    setFormState({ ...formState, steps });
  };

  const handleImageChange = (e) => {
    setFormState({ ...formState, coverImage: e.target.files[0] });
  };

  const handleStepImageChange = (index, e) => {
    const steps = [...formState.steps];
    steps[index].images = e.target.files;
    setFormState({ ...formState, steps });
  };

  const addStep = () => {
    setFormState({
      ...formState,
      steps: [...formState.steps, { title: "", description: "", images: [] }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!formState.title || !formState.description || !formState.materials || !formState.coverImage) {
      toast.error("Please fill up the form completely.");
      return;
    }

    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("materials", formState.materials);
    formData.append("category", formState.category);
    formData.append("coverImage", formState.coverImage);
    formData.append("username", username);

    formState.steps.forEach((step, index) => {
      formData.append(`steps[${index}][title]`, step.title);
      formData.append(`steps[${index}][description]`, step.description);
      Array.from(step.images).forEach((image, imgIndex) => {
        formData.append(`steps[${index}][images][${imgIndex}]`, image);
      });
    });

    try {
      await createProject(formData);
      toast.success("Project created successfully!");

      setFormState({
        coverImage: null,
        title: "",
        description: "",
        materials: "",
        category: "General",
        steps: [{ title: "", description: "", images: [] }],
      });
    } catch (error) {
      toast.error("Error creating project. Please try again.");
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/5 mx-auto flex flex-col items-start p-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Create a Project</h1>
        <div className="mb-6 w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 bg-slate-300 flex flex-col justify-center items-center rounded">
            <label
              htmlFor="coverImage"
              className="block text-lg font-medium mb-2 text-center"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleImageChange}
              className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-400 hover:file:bg-violet-100"
            />
          </div>
          <div className="md:w-1/2 flex flex-col">
            <div className="p-4">
              <label
                htmlFor="title"
                className="block text-lg font-medium mb-2"
              >
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
                placeholder="Enter a project title"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="p-4">
              <label
                htmlFor="category"
                className="block text-lg font-medium mb-2"
              >
                Project Category
              </label>
              <select
                id="category"
                name="category"
                value={formState.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="General">General</option>
                <option value="Workshop">Workshop</option>
                <option value="Cooking">Cooking</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            placeholder="Enter a project description"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="materials"
            className="block text-lg font-medium mb-2"
          >
            Project Materials
          </label>
          <textarea
            id="materials"
            name="materials"
            value={formState.materials}
            onChange={handleInputChange}
            placeholder="List any tools needed for this project"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          ></textarea>
        </div>
        {formState.steps.map((step, index) => (
          <div key={index} className="mb-6 w-full border-t border-gray-200 pt-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Step {index + 1}: Enter a Step Title
            </h2>
            <input
              type="text"
              name="title"
              value={step.title}
              onChange={(e) => handleStepChange(index, e)}
              placeholder="Enter a step title"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              name="description"
              value={step.description}
              onChange={(e) => handleStepChange(index, e)}
              placeholder="Write a detailed description of this step"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            ></textarea>
            <div className="flex flex-col bg-slate-300 py-4 justify-center items-center rounded">
              <label
                htmlFor={`stepImages-${index}`}
                className="block text-lg font-medium mb-2 text-center"
              >
                Upload Images
              </label>
              <input
                type="file"
                id={`stepImages-${index}`}
                multiple
                onChange={(e) => handleStepImageChange(index, e)}
                className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-400 hover:file:bg-violet-100"
              />
            </div>
          </div>
        ))}
        <div className="w-full flex flex-col items-center">
          <button
            type="button"
            onClick={addStep}
            className="w-full mb-16 px-4 py-2 bg-slate-400 text-white rounded"
          >
            Add a new step
          </button>
          <button
            type="submit"
            className="px-4 w-2/6 py-2 bg-gray-800 text-white rounded"
          >
            Publish
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
