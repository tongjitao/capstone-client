import { useState, useEffect } from 'react';
import api from '../services/api';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [error, setError] = useState('');

  // 获取所有项目
  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 创建新项目
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { title, description, repoUrl, liveUrl });
      setTitle(''); setDescription(''); setRepoUrl(''); setLiveUrl('');
      fetchProjects(); // 刷新列表
    } catch (err) {
      setError('Failed to create project');
    }
  };

  // 删除项目
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* 添加项目表单 */}
      <form onSubmit={handleCreate} className="mb-6 space-y-3 bg-gray-50 p-4 rounded border">
        <h3 className="font-semibold text-lg">Add New Project</h3>
        <input type="text" placeholder="Project Title" required className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" required className="w-full border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="GitHub Repo URL (optional)" className="w-full border p-2 rounded" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} />
        <input type="text" placeholder="Live Demo URL (optional)" className="w-full border p-2 rounded" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Project</button>
      </form>

      {/* 项目列表 */}
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project._id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
            <div>
              <h4 className="font-bold">{project.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
            </div>
            <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;