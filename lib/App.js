/* eslint-disable no-unused-vars */
'use strict';

var _react = _interopRequireWildcard(require("react"));

var _child_process = _interopRequireDefault(require("child_process"));

var _ink = require("ink");

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const App = () => {
  const [currentObj, setCurrentObj] = (0, _react.useState)(_package.default);
  const [currentKey, setCurrentKey] = (0, _react.useState)(Object.keys(currentObj)[0]);
  const [prevKey, setPrevKey] = (0, _react.useState)(currentKey);
  const [stack, setStack] = (0, _react.useState)([]);
  const {
    exit
  } = (0, _ink.useApp)();
  (0, _ink.useInput)((input, key) => {
    if (key.escape) exit();

    if (key.rightArrow) {
      if (currentObj[currentKey] && currentObj[currentKey] instanceof Object) {
        setStack([...stack, currentKey]);
        setPrevKey(currentKey);
        setCurrentKey(Object.keys(currentObj[currentKey])[0]);
        setCurrentObj(currentObj[currentKey]);
        return;
      }
    }

    if (key.leftArrow) {
      if (stack.length > 1) {
        stack.pop();
        const newCurObj = stack.reduce((obj, key) => {
          return obj[key];
        }, _package.default);
        setStack([...stack]);
        setCurrentObj(newCurObj);
      } else {
        setStack([]);
        setCurrentObj(_package.default);
      }
    }

    return;
  });

  const isValidUrl = string => {
    try {
      const url = new URL(string);
      if (url.host) return true;else return false;
    } catch (_) {
      return false;
    }
  };

  const handleSelect = ({
    value
  }) => {
    if (prevKey === 'scripts') {
      exit();

      _child_process.default.execSync(`npm run ${value}`, {
        stdio: 'inherit'
      });
    }

    if (isValidUrl(currentObj[value])) {
      exit();

      _child_process.default.execSync(`start ${currentObj[value]}`, {
        stdio: 'inherit'
      });
    }
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Static, null, _react.default.createElement(_ink.Box, {
    marginLeft: 7,
    marginTop: 1,
    height: 3
  }, _react.default.createElement(_ink.Color, {
    magenta: true
  }, _react.default.createElement(_ink.Text, {
    bold: true,
    underline: true
  }, "package.json explorer cli")))), _react.default.createElement(_ink.Box, {
    marginTop: 0,
    flexDirection: "column"
  }, _react.default.createElement(_inkSelectInput.default, {
    items: Object.keys(currentObj).map(key => {
      return {
        label: `${key.padEnd(30, '.')}${currentObj[key]}`,
        value: key
      };
    }),
    onSelect: handleSelect,
    onHighlight: key => {
      setCurrentKey(key.value);
    },
    indicatorComponent: ({
      isSelected
    }) => _react.default.createElement(_ink.Color, {
      yellow: isSelected
    }, isSelected ? ` > ` : '   '),
    itemComponent: ({
      isSelected,
      label
    }) => _react.default.createElement(_ink.Color, {
      yellow: isSelected
    }, label)
  })));
};

module.exports = App;