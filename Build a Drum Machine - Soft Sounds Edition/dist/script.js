// Credits to dight310, found via findsounds.com, for audio files
const soundBank = [
{
  buttonKey: 'Q',
  id: 'tom-tom',
  url: 'http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Tom%20Low%2001-5859-Free-Loops.com.mp3' },

{
  buttonKey: 'W',
  id: 'kick drum',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Hard%20House%20Kick%2026-9441-Free-Loops.com.mp3' },

{
  buttonKey: 'E',
  id: 'bass drum',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Bass%20Drum%20Free%20007-1674-Free-Loops.com.mp3' },

{
  buttonKey: 'A',
  id: 'bongo conga',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Bongo%20Conga%20Hit%20005-1728-Free-Loops.com.mp3' },

{
  buttonKey: 'S',
  id: 'synth-clap',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Clap%20Hit%20Free%20004-1686-Free-Loops.com.mp3' },

{
  buttonKey: 'D',
  id: 'beat box',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Beat%20Box%20Kick%202-6030-Free-Loops.com.mp3' },

{
  buttonKey: 'Z',
  id: 'drum fill',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Drum%20Fill%204-1233-Free-Loops.com.mp3' },

{
  buttonKey: 'X',
  id: 'drum track',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/5/5/Looperman%20Hip%20Hop-14277-Free-Loops.com.mp3' },


{
  buttonKey: 'C',
  id: 'bongo drums',
  url: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Bongo%20Loop%2011-9330-Free-Loops.com.mp3' }];



// single ES6 class App extends the React.Component
// access to local state, for bank, volume and display
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "READY...",
      bank: soundBank,
      volume: 50,
      power: true,
      switchColor: "" };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  //enables buttonpress upon load
  //ensures new window GETS focus 
  componentDidMount() {
    window.addEventListener("keydown", this.handleButtonPress);
    window.focus();

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleButtonPress);
  }


  handlePower(event) {
    let powerDisplay;
    let color;


    let stateClicked = !this.state.power;
    if (stateClicked)
    {
      powerDisplay = "MACHINE IS ON";
      color = "";
    } else
    {
      powerDisplay = "MACHINE IS OFF";
      color = "#FA8072";
    }

    this.setState({
      power: stateClicked,
      switchColor: color,
      display: powerDisplay });

  }

  handleButtonPress(event) {

    // KeyboardEvent.keyCode and .charCode listed as deprecated at time of initial build, therefore .key() is used
    let button = event.key.toUpperCase();
    // Catch error here for keys not in table
    //map() method to create a new array populated with all values of the buttonKey prop
    let bankKeys = this.state.bank.map(prop => prop.buttonKey);

    //if the keyboard button pressed does not exist within the index of bankKeys, then return (do nothing, because not supported). 
    if (bankKeys.indexOf(button) === -1)
    {
      return;
      //otherwise, run audio of the key
    } else {
      let key = document.getElementById(button).parentElement;

      this.handleAudio(key);
    }
  }




  handleVolume(event) {

    this.setState(
    {
      volume: event.target.value });



    if (this.state.power)
    {
      this.setState(
      {
        display: "Volume: " + event.target.value });


    }


  }
  handleClick(event) {
    this.handleAudio(event.currentTarget);
  }


  handleAudio(event) {
    if (!this.state.power)
    {
      return;
    } else
    {
      let audio = document.getElementById(event.innerText);
      //play audio from the beginning
      audio.currentTime = 0;
      audio.volume = this.state.volume / 100;
      audio.play();
      this.setState({
        display: event.id });


      //color upon keypress
      event.style.backgroundColor = "#e7ee7e";
      setTimeout(() => {event.style.backgroundColor = '#FFF';}, 500);
    }
  }


  render() {

    //to render div iterations of every element within bank array
    const renderPad = this.state.bank.map((obj, i, soundBank) => /*#__PURE__*/React.createElement("button", {
      className: "btn drum-pad",
      id: soundBank[i].id,
      onClick: this.handleClick },

    soundBank[i].buttonKey, /*#__PURE__*/
    React.createElement("audio", {
      src: soundBank[i].url,
      className: "clip",
      id: soundBank[i].buttonKey })));




    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/

      React.createElement("div", { className: "container-fluid", id: "main" }, /*#__PURE__*/
      React.createElement("div", { id: "drum-machine", className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col" }, /*#__PURE__*/
      React.createElement("h1", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-drum" }), " Drum Machine"), /*#__PURE__*/
      React.createElement("div", { className: "grid-container", id: "btn-grid" },
      renderPad)), /*#__PURE__*/


      React.createElement("div", { className: "col" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-laptop" }), " Display"), /*#__PURE__*/
      React.createElement("div", { id: "display" },
      this.state.display)), /*#__PURE__*/



      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-volume-up" }), " Sound Control"), /*#__PURE__*/
      React.createElement("div", { id: "sound-control" }, /*#__PURE__*/


      React.createElement("input", {
        type: "range",
        min: "0", max: "100",
        step: "1",
        value: this.props.volume,
        onInput: this.handleVolume,
        className: "slider" }))), /*#__PURE__*/





      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, /*#__PURE__*/React.createElement("i", { className: "fa fa-power-off" }), " Power Switch"), /*#__PURE__*/
      React.createElement("div", { id: "power-container" }, /*#__PURE__*/
      React.createElement("span", { id: "powerButton", className: "btn", style: { backgroundColor: this.state.switchColor },
        onClick: this.handlePower }, "ON | OFF"))), /*#__PURE__*/



      React.createElement("h3", null, "Soft Sounds Edition")))), /*#__PURE__*/





      React.createElement("footer", { id: "copyright", class: "footer" }, "Copyright \xA9 ",
      new Date().getFullYear(), "  allemandi, All Rights Reserved")));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));