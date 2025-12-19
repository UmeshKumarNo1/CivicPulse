import { useState, useEffect } from 'react';
import { useProblem } from '../context/ProblemContext';
import { categories, statuses } from '../data/sampleData';
import ProblemCard from '../components/ProblemCard';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { problems, loading } = useProblem();
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let filtered = [...problems];

    // Filter by status
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        (p.location && p.location.toLowerCase().includes(searchLower))
      );
    }

    setFilteredProblems(filtered);
  }, [problems, searchTerm, selectedStatus, selectedCategory]);

  const stats = {
    total: problems.length,
    pending: problems.filter(p => p.status === 'Pending').length,
    inProgress: problems.filter(p => p.status === 'In Progress').length,
    resolved: problems.filter(p => p.status === 'Resolved').length,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Track and manage civic problems in your community</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Problems</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
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
            <h3>{stats.inProgress}</h3>
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
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-card">
        <h2 className="filters-title">
          <FunnelIcon style={{width: '1.25rem', height: '1.25rem', display: 'inline-block', marginRight: '0.5rem'}} />
          Filters
        </h2>

        <div className="filters-grid">
          {/* Search */}
          <div className="input-with-icon">
            <MagnifyingGlassIcon className="input-icon" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field"
          >
            <option value="All">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Reported Problems ({filteredProblems.length})
        </h2>
      </div>

      {filteredProblems.length === 0 ? (
        <div className="empty-state">
          <p className="text-gray-500 text-lg">No problems found matching your filters.</p>
        </div>
      ) : (
        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

