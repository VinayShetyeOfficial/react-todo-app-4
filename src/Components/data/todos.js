/**
 * Default todo items for initializing the application.
 *
 * Each todo item has the following structure:
 * @typedef {Object} TodoItem
 * @property {number} id - Unique identifier for the todo item
 * @property {string} todo - Description of the todo task
 * @property {boolean} checked - Completion status of the todo item
 *
 * @constant {TodoItem[]}
 */
const todos = [
  {
    id: 1,
    todo: "Complete Database Project Report",
    checked: false,
  },
  {
    id: 2,
    todo: "Prepare Funding Request for Cyber Security Club",
    checked: false,
  },
  {
    id: 3,
    todo: "Review Data Mining Project Audio Extraction",
    checked: true,
  },
  {
    id: 4,
    todo: "Optimize SQLite Queries",
    checked: false,
  },
  {
    id: 5,
    todo: "Submit AI Course Project 3 Proposal",
    checked: false,
  },
];

export default todos;
