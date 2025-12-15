import { IoMdClose } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter } from "react-icons/fa";

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition shadow-sm"
        >
          <IoMdClose size={24} />
        </button>

        <div className="p-8 md:p-12">
            {/* Image Placeholder - Matching the purple 'brain' aesthetic */}
            <div className="w-full h-[400px] bg-gradient-to-br from-[#2b2175] to-[#120d31] rounded-2xl mb-12 flex items-center justify-center relative overflow-hidden group">
               {/* Abstract rings/glow effect simulation */}
               <div className="absolute inset-0 opacity-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[4px] border-orange-400/30 rounded-[100%] rotate-x-[70deg] group-hover:scale-110 transition duration-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-72 h-72 border-[4px] border-orange-400/50 rounded-[100%] rotate-x-[70deg] delay-75 group-hover:scale-110 transition duration-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-56 h-56 border-[4px] border-orange-400/50 rounded-[100%] rotate-x-[70deg] delay-100 group-hover:scale-110 transition duration-700"></div>
               </div>
               <span className="text-white/20 text-4xl font-bold uppercase tracking-widest">{project.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Text */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-[#1f2933] mb-6">{project.title}</h2>
                    <div className="prose text-gray-500 leading-relaxed mb-8 space-y-4">
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <p>
                             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                        <span className="text-sm font-bold text-[#1f2933]">Tags :</span>
                        <div className="flex gap-3 text-sm text-gray-500">
                             <span>Web Design</span>
                             <span>Social Media</span>
                             <span>Product</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Project Info Card */}
                <div className="w-full lg:w-80 bg-[#f7f9fc] rounded-xl p-8 h-fit">
                    <div className="space-y-6 text-sm">
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-bold text-[#1f2933]">Project Type :</span>
                            <span className="text-gray-500">{project.type}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-bold text-[#1f2933]">Client :</span>
                            <span className="text-gray-500">{project.client}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-bold text-[#1f2933]">Duration :</span>
                            <span className="text-gray-500">{project.duration}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-bold text-[#1f2933]">Task :</span>
                            <span className="text-gray-500">{project.task}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-bold text-[#1f2933]">Budget :</span>
                            <span className="text-gray-500">{project.budget}</span>
                        </div>
                    </div>

                    <button className="mt-8 bg-[#1f252b] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm hover:opacity-90 w-fit">
                        View Live
                    </button>
                </div>
            </div>

            {/* Footer - Share */}
            <div className="flex items-center justify-end gap-3 mt-4">
                 <span className="text-sm font-bold text-[#1f2933]">Share this product :</span>
                 <FaFacebookF className="cursor-pointer hover:text-blue-600 transition" />
                 <FaTwitter className="cursor-pointer hover:text-sky-500 transition" />
                 <FaGoogle className="cursor-pointer hover:text-red-500 transition" />
                 <FaLinkedinIn className="cursor-pointer hover:text-blue-700 transition" />
            </div>

        </div>
      </div>
    </div>
  );
}
