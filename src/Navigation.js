import React from 'react';


export default function NavigationBar({ onNavChange }){
  return (
    <nav >
      <ol>
          <li ><a onClick={ () => onNavChange('overview')} >Overview</a></li>
          <li ><a onClick={ () => onNavChange('campaigns')}>campaigns</a></li>
          <li  onClick={ () => onNavChange('create')}>create</li>
      </ol>
  </nav>
  )
} 