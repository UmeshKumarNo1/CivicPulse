import { useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  CalendarIcon, 
  ArrowUpIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

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
    <div
      onClick={() => navigate(`/problem/${problem.id}`)}
      className="problem-card"
    >
      {/* Image */}
      {problem.image && (
        <img
          src={`http://localhost:5000${problem.image}`}
          alt={problem.title}
          className="problem-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
          }}
        />
      )}

      {/* Content */}
      <div className="problem-content">
        <div className="problem-header">
          <h3 className="problem-title">
            {problem.title}
          </h3>
          <div className="problem-badges">
            <span className={`badge ${getStatusClass(problem.status)}`}>
              {problem.status}
            </span>
          </div>
        </div>

        <p className="problem-description">
          {problem.description}
        </p>

        {/* Meta Information */}
        <div className="problem-meta">
          <div className="problem-meta-item">
            <MapPinIcon style={{width: '1rem', height: '1rem'}} />
            <span className="truncate">{problem.location || 'Unknown location'}</span>
          </div>
          <div className="problem-meta-item">
            <CalendarIcon style={{width: '1rem', height: '1rem'}} />
            <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="problem-meta-item">
            <ChatBubbleLeftIcon style={{width: '1rem', height: '1rem'}} />
            <span>{problem.comments?.length || 0}</span>
          </div>
          <div className="problem-meta-item text-blue-600 font-semibold">
            <ArrowUpIcon style={{width: '1.25rem', height: '1.25rem'}} />
            <span>{problem.upvoteCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;

