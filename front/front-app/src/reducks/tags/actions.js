export const GET_TAGS = "GET_TAGS";
export const getTagsAction = (tags) => {
  return {
    type: GET_TAGS,
    payload: tags,
  };
};

export const GET_TAG = "GET_TAG";
export const getTagAction = (tag) => {
  return {
    type: GET_TAG,
    payload: tag,
  };
};
