import ProjectManager from '../components/ProjectManager';
import BlogManager from '../components/BlogManager';

const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-8">
        <ProjectManager />
        <BlogManager />
      </div>
    </div>
  );
};

export default AdminDashboard;