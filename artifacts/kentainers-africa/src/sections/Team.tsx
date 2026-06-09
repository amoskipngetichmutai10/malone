import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    async function fetchTeam() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('team_members').select('*').order('created_at');
      if (data) setMembers(data);
      setLoading(false);
    }
    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
            Meet the Experts
          </h2>
          <p className="text-secondary-600">
            Our dedicated team brings decades of combined experience in logistics, engineering, and customer service.
          </p>
        </div>

        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-72 bg-secondary-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-secondary-200 rounded w-1/2" />
                  <div className="h-4 bg-secondary-200 rounded w-2/3" />
                  <div className="h-4 bg-secondary-200 rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden bg-secondary-100">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-50">
                      <span className="text-5xl font-bold text-primary-300">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-secondary-900/0 group-hover:bg-secondary-900/40 transition-colors flex items-end justify-center pb-6">
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-50 transition-colors">
                        <Linkedin className="w-4 h-4 text-secondary-700" />
                      </button>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-50 transition-colors">
                        <Mail className="w-4 h-4 text-secondary-700" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-secondary-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
