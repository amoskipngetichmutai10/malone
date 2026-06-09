import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('projects').select('*').order('created_at');
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Projects</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
              Featured Work
            </h2>
            <p className="text-secondary-600">
              Explore some of our most impactful container projects across East Africa.
            </p>
          </div>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-balance rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-64 bg-secondary-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-secondary-200 rounded w-3/4" />
                  <div className="h-4 bg-secondary-200 rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="group bg-balance rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-balance text-xs font-semibold px-3 py-1.5 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-secondary-900/0 group-hover:bg-secondary-900/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-balance rounded-full flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-5 h-5 text-secondary-900" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-primary-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{project.title}</h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
