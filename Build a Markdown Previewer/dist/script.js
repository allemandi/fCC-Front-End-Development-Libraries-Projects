// as required by the challenge, default text has been included in the below for tests

//Any links that do not use target="_blank" (opened in a new tab) or linked to something not on CodePen will  fail due to CodePen.io's sandboxing and cross-origin security.

var defaultText =
`# Header (H1 size)

## Sub Header (H2 size)

[A link to allemandi'a Codepen.io profile](https://codepen.io/allemandi)

Please note that CodePen.io prevents any links, if not opened in a new tab or redirected to CodePen specifically, will fail due to sandboxing/security concerns!

We can also do \`inline code\` elements, such as \`var test = markdown()\`

Code blocks
\`\`\`js
function test() {
Return "Hello World"
}
\`\`\`
are also possible.
1. List Items Work,
* As do unordered lists.
> Blockquotes formatting are also indented

Images can be submitted just fine:

![text/markdown image](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Carriage breaks, if rendered in console, should return \`<br>\` as HTML elements.

Please feel free to give this **markdown previewer** a go.`;

// ES6 class App that extends the React.Component
// App class now has access to local state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial input for testing purposes
      input: defaultText };

    // explicitly bind 'this' in the constructor so 'this' becomes bound to the App class method (i.e. handleChange) when the component is initialized
    this.handleChange = this.handleChange.bind(this);
  }

  // the handleChange method receives event object that contains a string of text from the editor element.
  //   event.target.value is accessed and updated to the input property of the component's state with the new string (event)
  handleChange(event) {
    this.setState(
    {
      input: event.target.value });


  }


  parsedHTML() {
    //original challenge does not pass the test if sanitized by DOMPurify, therefore the library has been removed and excluded. Otherwise, DOMPurify would have been included, and typographic punctuation turned on
    //compile input markup into marked, parsing to HTML code
    // breaks set to true to enable <br> on single line breaks, requires gfm to be set to true, gfm is by default true
    let parsedMarkup = marked(this.state.input, { breaks: true });
    // return the parsed HTML as __html object, later to dangerously set HTML in App
    return { __html: parsedMarkup };

  }


  //render method for components
  render() {
    return /*#__PURE__*/(
      React.createElement("main", { class: "container-fluid" }, /*#__PURE__*/
      React.createElement("header", null, /*#__PURE__*/
      React.createElement("h1", { class: "display-1 text-center" }, "Markdown Previewer")), /*#__PURE__*/

      React.createElement("section", { class: "container-fluid" }, /*#__PURE__*/
      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { class: "display-4" }, "Editor"), /*#__PURE__*/

      React.createElement("textarea", { style: { height: "100%" }, class: "form-control", id: "editor", value: this.state.input, onChange: this.handleChange })), /*#__PURE__*/


      React.createElement("div", { class: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { class: "display-4" }, "Preview"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: this.parsedHTML() }))))), /*#__PURE__*/







      React.createElement("footer", { id: "copyright", class: "footer container-fluid" }, "Copyright \xA9 ",
      new Date().getFullYear(), "  allemandi, All Rights Reserved")));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));