const normalizeString = (str) => {
  const from =
    "àáãảạâầấậẫẩăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóỏọõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  const mapping = {};

  for (let i = 0; i < from.length; i++) {
    mapping[from.charAt(i)] = to.charAt(i);
  }

  let ret = [];
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    ret.push(mapping[char] || char);
  }

  return ret.join("");
};

module.exports = normalizeString;
