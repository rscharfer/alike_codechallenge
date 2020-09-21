import ReactDOM from 'react-dom';
import React from 'react';




describe('my test', () => {
  test('test runner', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<div>Here is something</div>, container)
  })
})