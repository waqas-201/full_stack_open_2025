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



export const filterAncedote = (data) => {
  return { type: "Filter", payload: { term: data } };
};