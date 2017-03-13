'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pdfCombined = require('pdfjs-dist/build/pdf.combined.js');

var _pdfCombined2 = _interopRequireDefault(_pdfCombined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimplePDF = function (_React$Component) {
  (0, _inherits3.default)(SimplePDF, _React$Component);

  function SimplePDF(props) {
    (0, _classCallCheck3.default)(this, SimplePDF);

    // bind
    var _this2 = (0, _possibleConstructorReturn3.default)(this, (SimplePDF.__proto__ || (0, _getPrototypeOf2.default)(SimplePDF)).call(this, props));

    _this2.loadPDF = _this2.loadPDF.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(SimplePDF, [{
    key: 'loadPDF',
    value: function loadPDF() {

      var _this = this;

      // get node for this react component
      var node = _reactDom2.default.findDOMNode(this).getElementsByClassName("S-PDF-ID")[0];

      // clean for update
      node.innerHTML = "";

      // set styles
      node.style.width = "100%";
      node.style.height = "100%";
      node.style.overflowX = "hidden";
      node.style.overflowY = "scroll";
      node.style.padding = '0px';

      _pdfCombined2.default.getDocument(this.props.file).then(function (pdf) {

        // no scrollbar if pdf has only one page
        if (pdf.numPages === 1) {
          node.style.overflowY = "hidden";
        }

        for (var id = 1, i = 1; i <= pdf.numPages; i++) {

          pdf.getPage(i).then(function (page) {

            // calculate scale according to the box size
            var boxWidth = node.clientWidth;
            var pdfWidth = page.getViewport(1).width;
            var scale = boxWidth / pdfWidth;
            var viewport = page.getViewport(scale);

            // set canvas for page
            var canvas = document.createElement('canvas');
            canvas.id = "page-" + id;id++;
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            node.appendChild(canvas);

            // get context and render page
            var context = canvas.getContext('2d');
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            var renderTask = page.render(renderContext);
            _this.props.onListenRender({ renderTask: renderTask, pageCount: pdf.numPages, viewport: viewport });
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'SimplePDF' },
        _react2.default.createElement('div', { className: 'S-PDF-ID' })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadPDF();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.loadPDF();
    }
  }]);
  return SimplePDF;
}(_react2.default.Component);

exports.default = SimplePDF;

SimplePDF.propTypes = {
  onListenRender: _react2.default.PropTypes.func
};
module.exports = { SimplePDF: SimplePDF };
