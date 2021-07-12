export const GET_TAGS = "GET_TAGS";
export const getTagsAction = (tags) => {
  return {
    type: GET_TAGS,
    payload: tags,
  };
};
