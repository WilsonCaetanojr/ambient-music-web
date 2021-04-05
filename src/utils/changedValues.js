export const changedValues = ({ initial, current }) => {
  const body = {};

  Object.keys(initial).forEach(key => {
    if (initial[key] !== current[key]) body[key] = current[key];
  });

  return body;
};
