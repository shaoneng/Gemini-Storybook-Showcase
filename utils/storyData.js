// Utility functions for accessing story data with version compatibility
import storiesData from '../data/stories.json';

// Handle both old array format and new structured format
export const getStories = () => {
  if (Array.isArray(storiesData)) {
    // Old format: array of stories
    return storiesData;
  } else if (storiesData && storiesData.stories && Array.isArray(storiesData.stories)) {
    // New format: { version, stories: [...] }
    return storiesData.stories;
  }
  return [];
};

// Get story by ID with version compatibility
export const getStoryById = (id) => {
  const stories = getStories();
  return stories.find(story => story.id === id);
};

// Get sorted stories (newest first)
export const getSortedStories = () => {
  const stories = getStories();
  return stories.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
};

// Get stories by tag
export const getStoriesByTag = (tag) => {
  const stories = getStories();
  return stories.filter(story => 
    story.tags && Array.isArray(story.tags) && story.tags.includes(tag)
  );
};

// Get stories by age group
export const getStoriesByAgeGroup = (ageGroup) => {
  const stories = getStories();
  return stories.filter(story => story.ageGroup === ageGroup);
};

// Get all unique tags
export const getAllTags = () => {
  const stories = getStories();
  const allTags = new Set();
  
  stories.forEach(story => {
    if (story.tags && Array.isArray(story.tags)) {
      story.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  return Array.from(allTags).sort();
};

// Get all age groups
export const getAllAgeGroups = () => {
  const stories = getStories();
  const ageGroups = new Set();
  
  stories.forEach(story => {
    if (story.ageGroup) {
      ageGroups.add(story.ageGroup);
    }
  });
  
  return Array.from(ageGroups).sort();
};

// Get statistics about stories
export const getStoryStats = () => {
  const stories = getStories();
  return {
    totalStories: stories.length,
    totalWords: stories.reduce((total, story) => {
      if (story.wordCount && story.wordCount.en) {
        return total + story.wordCount.en;
      }
      return total;
    }, 0),
    uniqueTags: getAllTags().length,
    ageGroups: getAllAgeGroups().length
  };
};