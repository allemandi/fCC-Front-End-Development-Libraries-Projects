const numberArr = [
{
  writtenId: 'seven',
  numeralValue: '7' },

{
  writtenId: 'eight',
  numeralValue: '8' },

{
  writtenId: 'nine',
  numeralValue: '9' },

{
  writtenId: 'four',
  numeralValue: '4' },

{
  writtenId: 'five',
  numeralValue: '5' },

{
  writtenId: 'six',
  numeralValue: '6' },

{
  writtenId: 'one',
  numeralValue: '1' },

{
  writtenId: 'two',
  numeralValue: '2' },

{
  writtenId: 'three',
  numeralValue: '3' },

{
  writtenId: 'zero',
  numeralValue: '0' },


{
  writtenId: 'decimal',
  numeralValue: '.' }];





const operatorArr = [
{
  writtenId: 'add',
  symbolValue: '+' },

{
  writtenId: 'subtract',
  symbolValue: '-' },

{
  writtenId: 'multiply',
  symbolValue: 'x' },

{
  writtenId: 'divide',
  symbolValue: '/' }];



const clearState = {
  hiddenArr: [],
  displayFormula: '',
  lastValid: [],
  displayInput: "0" };





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenArr: [],
      lastValid: [],
      displayFormula: '',
      displayInput: "0" };



    this.handleClick = this.handleClick.bind(this);
  }

  //make handleClick here, to modify
  handleClick(event) {

    //as of time of design, slice(0) is the fastest way to duplicate an array
    let hiddenArr = this.state.hiddenArr.slice(0);

    let lastValid = this.state.lastValid.slice(0);

    //includes reducer for every element
    const includesChecker = (mainArr, testArr) => testArr.every(element => mainArr.includes(element));

    //returns the div id
    let input = event.target.id;

    //get Arr of written numbers
    const writtenNumArr = numberArr.map(prop => prop.writtenId);


    let numIndex = writtenNumArr.indexOf(input);

    const numeralArr = numberArr.map(prop => prop.numeralValue);

    const writtenOperArr = operatorArr.map(prop => prop.writtenId);

    let operIndex = writtenOperArr.indexOf(input);
    const symbOperArr = operatorArr.map(prop => prop.symbolValue);
    let symbolvalue = symbOperArr[operIndex];

    // //display formula
    // let displayFormulaArr = this.state.displayFormula.split("");
    // let lastFormulaChar = displayFormulaArr[displayFormulaArr.length - 1];

    // if not a number
    if (numIndex === -1)
    {
      //if the clear button was selected
      if (input === 'clear')
      {
        //clear/reset the state
        this.setState(clearState);
      }

      //otherwise, if the equals button was selected and the last input was not another equals button (to prevent duplication)
      else if (input === "equals")
        {

          if (lastValid == "equals")
          {
            return 0;
          } else


          {

            lastValid = ["equals"];

            let evalResult = eval(hiddenArr.join(''));


            this.setState(
            {
              displayFormula: hiddenArr,
              hiddenArr: [evalResult],
              lastValid: lastValid,
              displayInput: evalResult });


          }
        }


        //else for all other operators
        else {
            if (hiddenArr.length < 1 && symbolvalue != "-")
            {
              return 0;
            } else
            {
              const multiplyIndex = symbOperArr.indexOf("x");
              var symCopyArr = symbOperArr.slice(0);
              symCopyArr[multiplyIndex] = '*';
              symbolvalue = symbolvalue.replace(/x/, '*');





              if (includesChecker(symCopyArr, lastValid) == true)
              {
                if (symbolvalue != "-") {
                  lastValid = [symbolvalue];
                  hiddenArr = hiddenArr.slice(0, hiddenArr.length - 1);
                }

              }}

            if (symCopyArr.indexOf(hiddenArr[hiddenArr.length - 1]) != -1 && symbolvalue != "-" && hiddenArr[hiddenArr.length - 2] != "-")
            {
              hiddenArr = hiddenArr.slice(0, hiddenArr.length - 1);
            }



            hiddenArr.push(symbolvalue);

            lastValid = [symbolvalue];

            this.setState(
            {
              hiddenArr: hiddenArr,
              lastValid: lastValid,
              displayInput: hiddenArr });




          }

      //outside of the equal sign if else statement
    }
    //outside of the if not a number statement

    //else if this is a number and not an operator/alternative function
    else
      {
        let numeralValue = numeralArr[numIndex];



        if (includesChecker(numeralArr, lastValid) === false)
        {
          //begin a new valid sequence for lastValid array
          lastValid = [];
        }

        //if the numeral value is '0' or '.' and this has already occurred within the display input depending on the position, then return to prevent duplicate
        if (numeralValue === "0" && lastValid == 0 ||
        numeralValue === "." && lastValid.indexOf(numeralValue) != -1)
        {
          return 0;
        } else

        {
          hiddenArr.push(numeralValue);
          lastValid.push(numeralValue);
          this.setState(
          {
            hiddenArr: hiddenArr,
            lastValid: lastValid,
            displayInput: hiddenArr });

        }
      }
    //outside of the if a number statement
  }

  //outside of the clickHandle function




  render() {

    // handleClick to bind DOM event to the Button react elements, not in components
    let numbers = numberArr.map((numObj, i, numArr) => {
      return /*#__PURE__*/(
        React.createElement(Button, { id: numArr[i].writtenId,
          value: numArr[i].numeralValue,
          handleClick: this.handleClick }));



    });

    let operators = operatorArr.map((operObj, i, operArr) => {
      return /*#__PURE__*/(
        React.createElement(Button, { id: operArr[i].writtenId,
          value: operArr[i].symbolValue,
          handleClick: this.handleClick }));



    });

    return /*#__PURE__*/(
      React.createElement("main", { className: "container-fluid" }, /*#__PURE__*/
      React.createElement("div", { id: "calculator", className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col", id: "display-screen" }, /*#__PURE__*/
      React.createElement("div", { id: "formula" },
      this.state.displayFormula), /*#__PURE__*/

      React.createElement("div", { id: "display" },
      this.state.displayInput))), /*#__PURE__*/






      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col" }, /*#__PURE__*/
      React.createElement("div", { id: "number-pad" },
      numbers)), /*#__PURE__*/


      React.createElement("div", { className: "col" }, /*#__PURE__*/
      React.createElement("div", { id: "function-container" }, /*#__PURE__*/
      React.createElement("div", { className: "present-pad" }, /*#__PURE__*/
      React.createElement(Button, { id: "clear", value: "Clear", handleClick: this.handleClick })), /*#__PURE__*/

      React.createElement("div", { id: "operator-pad" },

      operators), /*#__PURE__*/

      React.createElement("div", { className: "present-pad" }, /*#__PURE__*/

      React.createElement(Button, { id: "equals", value: "=", handleClick: this.handleClick })))))), /*#__PURE__*/







      React.createElement("footer", { id: "copyright", class: "footer" }, "Copyright \xA9 ",
      new Date().getFullYear(), "  allemandi, All Rights Reserved")));






  }}


class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: this.props.id,
        value: this.props.value,
        className: "button",
        onClick: this.props.handleClick },
      this.props.value));


  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));