import React from 'react'
import ReactDom from 'react-dom';

var foo = 5
var bar = 1020

function Greeting() {
  return(
    <div>
      <ul>
        <li>One</li>
        <li>Secunder</li>
      </ul>
    </div>
  );
}


// const Greeting = () => {
//  return React.createElement('div', {}, "huh")
//}

ReactDom.render(<Greeting/>, document.getElementById("root"));