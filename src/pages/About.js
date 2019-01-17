//@flow
import React from 'react';
type Props = {};

export default function About(props: Props) {
  console.log(props, 'PROPS_COMP');
  return (
    <div>
      <h1>About Us</h1>
      <div>
        <p>We are bootcamp 7</p>
      </div>
    </div>
  );
}
