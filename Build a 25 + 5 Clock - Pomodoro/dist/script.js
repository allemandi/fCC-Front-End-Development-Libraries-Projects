// 1500 seconds is 25 minutes
const interSetArr = [

'break-increment',
'break-decrement',
'session-increment',
'session-decrement'];




const resetState = {
  seconds: 1500,
  sessionMins: 25,
  breakMins: 5,
  onBreak: false,
  activatedTimer: false,
  runningTimer: false };




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 1500,
      sessionMins: 25,
      breakMins: 5,
      onBreak: false,
      activatedTimer: false,
      runningTimer: false };

    //reminder: class methods are not bound by default in JS
    //event handlers are bound below
    this.handleClick = this.handleClick.bind(this);
    this.handleBreakDisplay = this.handleBreakDisplay.bind(this);
    this.handleTimeDisplay = this.handleTimeDisplay.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.countdown = this.countdown.bind(this);
    //declare timer as null variable, class level property
    this.timer = null;


  }

  //the handleClick event for most buttons
  handleClick(event) {
    //  value of event.currentTarget is only available while the event is being handled
    // store as a variable first
    let currentTarget = event.currentTarget;

    //returns the div id
    let input = currentTarget.id;



    let sessionMins = this.state.sessionMins;
    let breakMins = this.state.breakMins;
    //get index of input within interSetArr, which contains available elements of increment/decrement
    let interSetIndex = interSetArr.indexOf(input);

    //yellow color upon click
    currentTarget.style.backgroundColor = "#FFFF99";
    //timeout and return no background color afterwards
    setTimeout(() => {currentTarget.style.backgroundColor = '';}, 500);


    //if the button clicked references an increment/decrement function
    // does not equal -1 because it exists in the interSetArr
    if (interSetIndex != -1)
    {
      let secondsCounter = this.state.seconds;
      if (this.state.activatedTimer == false && input == interSetArr[2] || this.state.activatedTimer == false && input == interSetArr[3])
      {
        if (input == interSetArr[2])
        {
          this.setState({
            //provide a maximum of 60 minutes, and a minimum of 1
            sessionMins: Math.min(Math.max(sessionMins + 1, 1), 60),
            //provided a maximum of 3600 seconds, and a minimum of 60
            seconds: Math.min(Math.max(secondsCounter + 60, 60), 3600) });


        } else
        if (input == interSetArr[3]) {
          this.setState({
            sessionMins: Math.min(Math.max(sessionMins - 1, 1), 60),
            seconds: Math.min(Math.max(secondsCounter - 60, 60), 3600) });

        }
      } else

      {

        if (input == interSetArr[0])
        {
          this.setState({
            breakMins: Math.min(Math.max(breakMins + 1, 1), 60) });

        } else
        if (input == interSetArr[1])
        {
          this.setState({
            breakMins: Math.min(Math.max(breakMins - 1, 1), 60) });

        } else
        if (input == interSetArr[2])
        {

          this.setState({
            sessionMins: Math.min(Math.max(sessionMins + 1, 1), 60) });


        } else
        {
          this.setState({
            sessionMins: Math.min(Math.max(sessionMins - 1, 1), 60) });

        }
      }
    }
    //else if the reset button was clicked, reset state
    else if (input == 'reset')
      {
        //clear the running interval
        clearInterval(this.timer);
        //pause the audio
        this.audioHere.pause();
        //reset the audio to the beginning
        this.audioHere.currentTime = 0;
        //reset state as clean
        this.setState(resetState);
      } else
      {
        return 0;
      }
  }

  //countdown function, also a component to the switch between Break and Session mode
  countdown() {

    let seconds = this.state.seconds;
    let onBreak = this.state.onBreak;

    if (seconds == 0)
    {
      //audioHere is declared through the Ref, accessing the DOM nodes or React elements created in the render method.
      this.audioHere.play();
      //this is to ensure that the timer starts without the 1 second loss 
      let breakSeconds = this.state.breakMins * 60 + 1;
      let sessionSeconds = this.state.sessionMins * 60 + 1;
      if (!onBreak)
      {
        this.setState({
          onBreak: true,
          seconds: breakSeconds });

      } else
      {
        this.setState({
          onBreak: false,
          seconds: sessionSeconds });

      }

    }
    this.setState({
      seconds: this.state.seconds - 1 });

  }

  //function to handle the display text between Session and Break mode
  handleBreakDisplay(onBreakVar) {
    switch (onBreakVar) {
      case false:
        return 'Session';
      default:
        return 'Break';}

  }

  //handle the start/pause button
  handleStart(event) {
    let currentTarget = event.currentTarget;
    let activatedTimer = this.state.activatedTimer;
    let runningTimer = this.state.runningTimer;
    console.log(runningTimer);
    if (!activatedTimer || !runningTimer)
    {
      this.setState({
        activatedTimer: true,
        runningTimer: true });


      currentTarget.style.backgroundColor = "#00917c";

      this.timer = setInterval(this.countdown, 1000);
    } else
    {
      currentTarget.style.backgroundColor = "";
      clearInterval(this.timer);
      this.setState({
        runningTimer: false });

    }
  }


  //handle how the time is displayed
  handleTimeDisplay() {
    let seconds = this.state.seconds;
    let minutes = Math.floor(seconds / 60);
    let displaySeconds = seconds % 60;

    //hardcode another 0 if minutes/seconds fall below 10 (and therefore reach single digit numbers)
    if (minutes < 10)
    {
      minutes = '0' + minutes;
    }
    if (displaySeconds < 10)
    {
      displaySeconds = '0' + displaySeconds;
    }

    //display the result via template literal
    let displayResult = `${minutes}:${displaySeconds}`;
    //this returns the display result to the rendered DOM
    return displayResult;
  }
  //render DOM below
  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("main", { className: "container-fluid" }, /*#__PURE__*/

      React.createElement("div", { id: "clock-container" }, /*#__PURE__*/

      React.createElement("header", null, /*#__PURE__*/
      React.createElement("h1", null, /*#__PURE__*/React.createElement("i", { class: "far fa-bell-slash" }), " 25 + 5 Clock")), /*#__PURE__*/


      React.createElement("div", { id: "interval-settings-container", className: "container" }, /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/

      React.createElement("div", { id: "break-container", className: "col-sm" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { id: "break-label" }, "Break Length"))), /*#__PURE__*/


      React.createElement("div", { className: "row" }, /*#__PURE__*/

      React.createElement("div", { className: "col- button-container" }, /*#__PURE__*/

      React.createElement(Button, { id: "break-increment", value: /*#__PURE__*/React.createElement("i", { class: "fa fa-angle-double-up" }), handleClick: this.handleClick }), /*#__PURE__*/
      React.createElement(Button, { id: "break-decrement", value: /*#__PURE__*/React.createElement("i", { class: "fa fa-angle-double-down" }), handleClick: this.handleClick })), /*#__PURE__*/



      React.createElement("div", { id: "break-header-container", className: "col-" }, /*#__PURE__*/
      React.createElement("h3", { id: "break-length" },
      this.state.breakMins)))), /*#__PURE__*/






      React.createElement("div", { id: "session-container", className: "col-sm" }, /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { id: "session-label" }, "Session Length"))), /*#__PURE__*/



      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-" }, /*#__PURE__*/

      React.createElement(Button, { id: "session-increment", value: /*#__PURE__*/React.createElement("i", { class: "fa fa-angle-double-up" }), handleClick: this.handleClick }), /*#__PURE__*/
      React.createElement(Button, { id: "session-decrement", value: /*#__PURE__*/React.createElement("i", { class: "fa fa-angle-double-down" }), handleClick: this.handleClick })), /*#__PURE__*/


      React.createElement("div", { id: "session-header-container", className: "col-" }, /*#__PURE__*/
      React.createElement("h3", { id: "session-length" },
      this.state.sessionMins)))))), /*#__PURE__*/









      React.createElement("div", { id: "timer-container", className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "row session-row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, this.handleBreakDisplay(this.state.onBreak))), /*#__PURE__*/

      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement("h2", { id: "time-left" }, this.handleTimeDisplay()))), /*#__PURE__*/


      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement(Button, { id: "start_stop", value: /*#__PURE__*/React.createElement("i", { class: "far fa-play-circle" }), handleClick: this.handleStart })), /*#__PURE__*/

      React.createElement("div", { className: "col-sm" }, /*#__PURE__*/
      React.createElement(Button, { id: "reset", value: /*#__PURE__*/React.createElement("i", { class: "fas fa-undo-alt" }), handleClick: this.handleClick }))))), /*#__PURE__*/










      React.createElement("audio", {
        id: "beep",
        ref: audio => {
          this.audioHere = audio;
        },
        src: "https://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Computer.wav-8982-Free-Loops.com.mp3" })), /*#__PURE__*/



      React.createElement("footer", { className: "container-fluid" }, "Copyright \xA9 ",
      new Date().getFullYear(), "  allemandi, All Rights Reserved")));






  }}




class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: this.props.id,
        value: this.props.value,
        className: "btn",
        onClick: this.props.handleClick },
      this.props.value)));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));