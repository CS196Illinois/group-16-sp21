import React from 'react'
import ReactDom from 'react-dom';
import "./index.css";

const firstMod = {
  name: 'Just Enough Items (JEI)',
  author: 'mezz',
  img: 'https://media.forgecdn.net/avatars/thumbnails/29/69/64/64/635838945588716414.jpeg'
}

const secondMod = {
  name: 'Quark',
  author: 'Vazkii',
  img: 'https://media.forgecdn.net/avatars/thumbnails/36/643/64/64/635941051938350675.png'
}

function ModList() {
  return (
    <section className='modlist'>
      <Mod
        name={firstMod.name}
        author={firstMod.author}
        img={firstMod.img}
      />

      <Mod
        name={secondMod.name}
        author={secondMod.author}
        img={secondMod.img}
      />
    </section>
  );
}

const Mod = (props) => {
  return(
  <article className='mod'>
    <img src={props.img} alt=''/>
    <h2>{props.name}</h2>
    <p> By </p>
    <h4>{props.author}</h4>
  </article>
  );
};

ReactDom.render(<ModList/>, document.getElementById("root"));