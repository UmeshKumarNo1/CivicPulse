# Tailwind to Plain CSS Class Mapping

This document shows how to convert Tailwind utility classes to the plain CSS classes defined in `index.css`.

## Common Patterns

### Layout & Spacing
- `min-h-screen` → `min-h-screen`
- `max-w-7xl mx-auto` → `container`
- `flex` → `flex`
- `flex-col` → `flex-col`
- `items-center` → `items-center`
- `justify-center` → `justify-center`
- `justify-between` → `justify-between`
- `gap-4` → `gap-4`
- `space-x-2` → use `gap-2` with flex
- `grid grid-cols-1 md:grid-cols-3` → `grid grid-cols-3` (responsive handled in CSS)

### Typography
- `text-xl font-bold text-gray-900` → `text-xl font-bold text-gray-900`
- `text-sm text-gray-600` → `text-sm text-gray-600`
- `text-center` → `text-center`

### Backgrounds & Borders
- `bg-white` → `bg-white`
- `bg-gray-50` → `bg-gray-50`
- `rounded-lg` → `rounded-lg`
- `shadow-md` → `shadow-md`
- `border border-gray-200` → `border border-gray-200`

### Buttons
- `bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg` → `btn btn-primary`
- `bg-gray-200 hover:bg-gray-300` → `btn btn-secondary`

### Cards
- `bg-white rounded-lg shadow-md hover:shadow-xl transition-all` → `card`

### Inputs
- `w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2` → `input-field`

### Badges
- `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium` → `badge`
- Status badges: `badge-pending`, `badge-in-progress`, `badge-resolved`
- Category badge: `badge-category`

### Animations
- `animate-spin` → `animate-spin`
- `animate-fade-in` → `animate-fade-in`
- `animate-slide-up` → `animate-slide-up`

### Component-Specific Classes

#### Auth Pages
- Container: `auth-container`
- Card: `auth-card`
- Logo: `auth-logo`
- Title: `auth-title`
- Subtitle: `auth-subtitle`
- Demo credentials box: `demo-credentials`
- Form group: `form-group`
- Form label: `form-label`
- Input with icon: `input-with-icon` + `input-icon`
- Error message: `error-message`
- Auth link: `auth-link`

#### Header/Navigation
- Header: `header`
- Header container: `header-container`
- Logo link: `logo-link`
- Logo icon: `logo-icon`
- Logo text: `logo-text`
- Desktop nav: `nav-desktop`
- Nav link: `nav-link` (add `active` class for active state)
- User menu: `user-menu`
- User avatar: `user-avatar`
- Mobile menu button: `mobile-menu-button`
- Mobile menu: `mobile-menu`

#### Dashboard
- Container: `dashboard-container`
- Header: `dashboard-header`
- Title: `dashboard-title`
- Subtitle: `dashboard-subtitle`
- Stats grid: `stats-grid`
- Stat card: `stat-card`
- Stat icon: `stat-icon` (add color class: `blue`, `yellow`, `purple`, `green`)
- Stat content: `stat-content`
- Filters card: `filters-card`
- Filters title: `filters-title`
- Filters grid: `filters-grid`
- Problems grid: `problems-grid`

#### Problem Card
- Card: `problem-card`
- Image: `problem-image`
- Content: `problem-content`
- Header: `problem-header`
- Title: `problem-title`
- Badges: `problem-badges`
- Description: `problem-description`
- Meta: `problem-meta`
- Meta item: `problem-meta-item`

#### Problem Details
- Container: `problem-details-container`
- Back button: `back-button`
- Card: `problem-details-card`
- Image: `problem-details-image`
- Content: `problem-details-content`
- Header: `problem-details-header`
- Title: `problem-details-title`
- Badges: `problem-details-badges`
- Meta: `problem-details-meta`
- Description: `problem-details-description`
- Map container: `map-container`
- Upvote section: `upvote-section`
- Upvote button: `upvote-button`
- Upvote count: `upvote-count`

#### Comments
- Section: `comments-section`
- Title: `comments-title`
- Form: `comment-form`
- List: `comments-list`
- Comment: `comment`
- Avatar: `comment-avatar`
- Content: `comment-content`
- Header: `comment-header`
- Author: `comment-author`
- Date: `comment-date`
- Text: `comment-text`
- Empty state: `empty-comments`

#### Report Form
- Container: `report-container`
- Card: `report-card`
- Title: `report-title`
- Subtitle: `report-subtitle`
- Image upload section: `image-upload-section`
- Upload label: `image-upload-label`
- Upload input: `image-upload-input`
- Image preview: `image-preview`
- Remove button: `remove-image-button`

#### Profile
- Container: `profile-container`
- Header: `profile-header`
- Avatar large: `profile-avatar-large`
- Name: `profile-name`
- Email: `profile-email`
- Stats: `profile-stats`
- Empty state: `empty-state`

#### Loading
- Container: `loading-container`
- Spinner: `spinner`

#### Footer
- Footer: `footer`
- Content: `footer-content`

## Quick Replacement Tips

1. Remove all Tailwind directives from imports
2. Replace complex utility combinations with semantic class names
3. Use inline styles for icon sizes: `style={{width: '1.25rem', height: '1.25rem'}}`
4. For conditional classes, use template literals: `` className={`nav-link ${isActive ? 'active' : ''}`} ``
5. Remove `@apply` directives - they're Tailwind-specific

