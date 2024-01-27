import React from 'react';
import Header from './componets/header/Header';
import Category from './componets/category/Category';
import Section from './componets/section/section';

function App() {
  return (
        <div id='mojong-app' className='bg-body-tertiary'>

          <div className='sticky-top bg-white'>
            <Header></Header>
            <Category></Category>
          </div>

          <Section></Section>

          <footer style={{ height: 200}}>
          </footer>

        </div>
  );
}

export default App;
