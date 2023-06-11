import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' 
                src="https://images7.alphacoders.com/109/1093643.png" alt=''
            />
            
            <div className='home__row'>
                <Product 
                id='12321341'
                title='The lean startup' 
                price={.99} 
                image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                rating={5}
                />
                <Product
                id='49538094'
                title="Product 2 title"
                price={239.0}
                rating={4}
                image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                />
            </div>

            <div className='home__row'>
                <Product
                 id='4903850'
                 title="Product 3 title"
                 price={199.99}
                 rating={3}
                 image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                />
                <Product
                 id='23445930'
                 title="Product 4 title"
                 price={98.99}
                 rating={5}
                 image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                />
                <Product
                 id='2354354245'
                 title="Product 5 title"
                 price={598.99}
                 rating={4}
                 image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                />
            </div>

            <div className='home__row'>
                <Product
                 id='90829332'
                 title="Product 6 title"
                 price={1094.88}
                 rating={4}
                 image="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                />
            </div>
        </div>
    </div>
  )
}

export default Home