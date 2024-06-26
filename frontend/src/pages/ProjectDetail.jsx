

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../hooks/apiHook.js';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

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
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
