export default function validTypeFile({ file, types }) {
  try {
    if (!file || !Array.isArray(types) || types.length < 1) {
      return false;
    }

    const valid = types.filter(e => {
      if (file.name.includes(e)) {
        return e;
      } else {
        return false;
      }
    });

    if (!file.name.includes(valid[0])) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
