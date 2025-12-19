import { createContext, useContext, useState, useEffect } from 'react';
import { problemAPI, commentAPI, upvoteAPI } from '../services/api';

const ProblemContext = createContext();

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblem must be used within a ProblemProvider');
  }
  return context;
};

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  const fetchProblems = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await problemAPI.getAll(filters);
      if (response.success) {
        setProblems(response.data.problems);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const addProblem = async (problemData) => {
    try {
      const response = await problemAPI.create(problemData);
      if (response.success) {
        // Refresh problems list
        await fetchProblems();
        return { success: true, problem: response.data.problem };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create problem';
      return { success: false, error: errorMessage };
    }
  };

  const updateProblem = async (id, updates) => {
    try {
      const response = await problemAPI.updateStatus(id, updates.status);
      if (response.success) {
        // Update local state
        setProblems(problems.map(p =>
          p.id === id ? { ...p, ...updates } : p
        ));
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update problem';
      return { success: false, error: errorMessage };
    }
  };

  const deleteProblem = async (id) => {
    try {
      const response = await problemAPI.delete(id);
      if (response.success) {
        // Remove from local state
        setProblems(problems.filter(p => p.id !== id));
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete problem';
      return { success: false, error: errorMessage };
    }
  };

  const upvoteProblem = async (id) => {
    try {
      const response = await upvoteAPI.toggle(id);
      if (response.success) {
        // Refresh the specific problem or all problems
        await fetchProblems();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upvote problem';
      return { success: false, error: errorMessage };
    }
  };

  const addComment = async (problemId, text) => {
    try {
      const response = await commentAPI.add(problemId, text);
      if (response.success) {
        // Refresh problems to get updated comments
        await fetchProblems();
        return { success: true, comment: response.data.comment };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add comment';
      return { success: false, error: errorMessage };
    }
  };

  const getProblemById = async (id) => {
    try {
      const response = await problemAPI.getById(id);
      if (response.success) {
        return response.data.problem;
      }
      return null;
    } catch (error) {
      console.error('Error fetching problem:', error);
      return null;
    }
  };

  const filterProblems = (filters) => {
    // This will now trigger a backend fetch with filters
    fetchProblems(filters);
  };

  const value = {
    problems,
    loading,
    addProblem,
    updateProblem,
    deleteProblem,
    upvoteProblem,
    addComment,
    getProblemById,
    filterProblems,
    fetchProblems, // Expose for manual refresh
  };

  return <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>;
};

