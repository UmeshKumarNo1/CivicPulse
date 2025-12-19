import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProblem } from '../context/ProblemContext';
import { useAuth } from '../context/AuthContext';
import { upvoteAPI } from '../services/api';
import {
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowUpIcon,
  ChatBubbleLeftIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProblemById, upvoteProblem, addComment, updateProblem, deleteProblem } = useProblem();
  const { user, isAdmin } = useAuth();

  const [problem, setProblem] = useState(null);
  const [comment, setComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProblem = async () => {
      setLoading(true);
      const foundProblem = await getProblemById(id);
      if (foundProblem) {
        setProblem(foundProblem);

        // Check if user has upvoted
        if (user) {
          try {
            const upvoteStatus = await upvoteAPI.getStatus(id);
            if (upvoteStatus.success) {
              setHasUpvoted(upvoteStatus.data.upvoted);
            }
          } catch (error) {
            console.error('Error checking upvote status:', error);
          }
        }
      } else {
        navigate('/dashboard');
      }
      setLoading(false);
    };

    loadProblem();
  }, [id, getProblemById, navigate, user]);

  if (loading || !problem) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleUpvote = async () => {
    if (submitting) return;

    setSubmitting(true);
    const result = await upvoteProblem(problem.id);

    if (result.success) {
      setHasUpvoted(result.data.upvoted);
      // Reload problem to get updated upvote count
      const updatedProblem = await getProblemById(id);
      if (updatedProblem) {
        setProblem(updatedProblem);
      }
    }
    setSubmitting(false);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (comment.trim() && !submitting) {
      setSubmitting(true);
      const result = await addComment(problem.id, comment);

      if (result.success) {
        // Reload problem to get updated comments
        const updatedProblem = await getProblemById(id);
        if (updatedProblem) {
          setProblem(updatedProblem);
        }
        setComment('');
      }
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (submitting) return;

    setSubmitting(true);
    const result = await updateProblem(problem.id, { status: newStatus });

    if (result.success) {
      setProblem({ ...problem, status: newStatus });
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      setSubmitting(true);
      const result = await deleteProblem(problem.id);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setSubmitting(false);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-pending';
      case 'In Progress':
        return 'badge-in-progress';
      case 'Resolved':
        return 'badge-resolved';
      default:
        return 'badge-pending';
    }
  };

  return (
    <div className="problem-details-container animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="back-button"
      >
        <ArrowLeftIcon />
        Back to Dashboard
      </button>

      <div className="problem-details-card">
        {/* Image */}
        {problem.image && (
          <div style={{position: 'relative'}}>
            <img
              src={`http://localhost:5000${problem.image}`}
              alt={problem.title}
              className="problem-details-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
              }}
            />
            <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
              <span className={`badge ${getStatusClass(problem.status)}`} style={{fontSize: '1.125rem'}}>
                {problem.status}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="problem-details-content">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="problem-details-title">{problem.title}</h1>
              <div className="problem-details-badges">
                <div className="flex items-center gap-1 text-gray-600">
                  <CalendarIcon style={{width: '1rem', height: '1rem'}} />
                  <span className="text-sm">
                    Reported on {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="text-sm">
                    By: {problem.user?.name || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Upvote Button */}
            <button
              onClick={handleUpvote}
              disabled={hasUpvoted || submitting}
              className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}
            >
              <ArrowUpIcon style={{width: '2rem', height: '2rem'}} />
              <span className="upvote-count">{problem.upvoteCount || 0}</span>
              <span className="text-xs">{hasUpvoted ? 'Upvoted' : 'Upvote'}</span>
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{problem.description}</p>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPinIcon style={{width: '1.5rem', height: '1.5rem'}} />
              Location
            </h2>
            <p className="text-gray-700 mb-3">{problem.location}</p>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="admin-controls">
              <h3 className="admin-controls-title">Admin Controls</h3>
              <div className="admin-controls-actions">
                <button
                  onClick={() => handleStatusChange('Pending')}
                  className="btn btn-secondary"
                  style={{fontSize: '0.875rem'}}
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleStatusChange('In Progress')}
                  className="btn btn-secondary"
                  style={{fontSize: '0.875rem'}}
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('Resolved')}
                  className="btn btn-secondary"
                  style={{fontSize: '0.875rem'}}
                >
                  Mark as Resolved
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                  style={{fontSize: '0.875rem'}}
                >
                  <TrashIcon style={{width: '1rem', height: '1rem', marginRight: '0.25rem', display: 'inline-block'}} />
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="comments-section">
            <h2 className="comments-title">
              <ChatBubbleLeftIcon style={{width: '1.5rem', height: '1.5rem', display: 'inline-block', marginRight: '0.5rem'}} />
              Comments ({problem.comments?.length || 0})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="flex gap-3">
                <div className="comment-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                    className="input-field"
                    disabled={submitting}
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim() || submitting}
                    className="btn btn-primary mt-2"
                    style={{opacity: (!comment.trim() || submitting) ? 0.5 : 1}}
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {!problem.comments || problem.comments.length === 0 ? (
                <p className="empty-comments">No comments yet. Be the first to comment!</p>
              ) : (
                problem.comments.map((commentItem) => (
                  <div key={commentItem.id} className="comment animate-slide-up">
                    <div className="comment-avatar">
                      {commentItem.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{commentItem.user?.name || 'Unknown'}</span>
                        {commentItem.user?.role === 'admin' && (
                          <span className="badge badge-admin" style={{fontSize: '0.75rem'}}>Admin</span>
                        )}
                        <span className="comment-date">
                          {new Date(commentItem.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="comment-text">{commentItem.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;

