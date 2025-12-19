import { useAuth } from '../context/AuthContext';
import { useProblem } from '../context/ProblemContext';
import { EnvelopeIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import ProblemCard from '../components/ProblemCard';

const Profile = () => {
  const { user, isAdmin } = useAuth();
  const { problems } = useProblem();

  const userProblems = problems.filter(p => p.reportedBy === user.id);
  const userStats = {
    total: userProblems.length,
    pending: userProblems.filter(p => p.status === 'Pending').length,
    inProgress: userProblems.filter(p => p.status === 'In Progress').length,
    resolved: userProblems.filter(p => p.status === 'Resolved').length,
  };

  return (
    <div className="profile-container animate-fade-in">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="profile-name">{user.name}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <EnvelopeIcon style={{width: '1.25rem', height: '1.25rem'}} />
              <span className="profile-email">{user.email}</span>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <ShieldCheckIcon style={{width: '1.25rem', height: '1.25rem', color: '#dc2626'}} />
                <span className="badge badge-admin">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{userStats.total}</h3>
            <p>Total Reports</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{userStats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{userStats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{userStats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      {/* User's Problems */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reported Problems</h2>

        {userProblems.length === 0 ? (
          <div className="empty-state">
            <UserIcon style={{width: '4rem', height: '4rem', color: '#9ca3af', margin: '0 auto 1rem'}} />
            <p className="text-gray-500 text-lg mb-4">You haven't reported any problems yet.</p>
            <a href="/report" className="btn btn-primary">
              Report Your First Problem
            </a>
          </div>
        ) : (
          <div className="problems-grid">
            {userProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

