const formatPayload = (request: any) => {
  let payload = {};

  const params = request.params();
  const reqs = request.all();
  const files = request.allFiles();

  for (const key in params) {
    payload[key] = params[key];
  }

  for (const key in reqs) {
    payload[key] = reqs[key];
  }

  for (const key in files) {
    payload[key] = files[key];
  }

  return payload;
};

export default formatPayload;
