const toReplace = {
  'drawArc': 'p',
  'board': 'C',
  'pinkieX': 'H',
  'pinkieY': 'r',
  'dx': 'R',
  'dy': 'o',
  'moved': 'W',
  'track': 'h',
  'drawP': 'm',
  'active': 'n',
  'movedSnow': 'S',
  'sSource': 'w',
  'animStep': 'y',
  'sDest': 'z',
};

module.exports = function({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name in toReplace) {
          path.replaceWith(t.Identifier(toReplace[path.node.name]));
        }
      }
    }
  };
}
