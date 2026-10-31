import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Hero 区域 */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
        Hi, I'm <span className="text-blue-600">[你的名字]</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        A passionate Full-Stack Developer specializing in building modern, responsive web applications using the MERN stack.
      </p>
      
      {/* 按钮区域 */}
      <div className="flex gap-4 mb-16">
        <Link to="/projects" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md">
          View My Work
        </Link>
        <Link to="/contact" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-md">
          Contact Me
        </Link>
      </div>

      {/* 技能展示区 (随意修改) */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">My Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript'].map((tech) => (
            <span key={tech} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;