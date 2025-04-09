import { getId } from "./anecdoteReducer";

export const createVote = (id) => {
  return { type: "Vote", payload: { id: id } };
};

export const createAncedote = (content) => {
  return {
    type: "Ancedote",
    payload: { content: content, id: getId(), votes: 0 },
  };
};
