import { useState } from "react";
import BirdCards from './Components/BirdCards'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import birdData from "./data/birds";
import bonusItems from "./data/bonusItems";

import './App.css'

function App () {

  const [userCart, setUserCart] = useState([])
  // let totalCart = 0
  const [totalCart,setTotalCart] = useState(0)
  const [discount, setDiscount] = useState(0)

  const addBird = (bird) => {
    let x = totalCart + bird.amount
    
    if(userCart.includes(bird)){
      alert('You have already added this bird to the cart')
    }else{
    setUserCart([...userCart, bird])
      // console.log({userCart})
      
      
      if(userCart.length+1 >=3){
          // console.log(totalCart)
          console.log(x)
          setDiscount(10)
          setTotalCart(x - (x * (.10)))
          localStorage.setItem('noDisc', JSON.stringify(x));

        }else {setTotalCart(x)
        console.log("x:" ,x)}
      } 
    }
  
    const deleteBird = (bird) => {
      console.log("total",totalCart)
      // console.log(bird)
      let deleted = userCart.filter((x) => x.id !== bird.id)
       console.log(deleted)
       console.log("bird amount", bird.amount)
          setUserCart(deleted)
          if(deleted.length<3){
            setDiscount(0)
            const basic = JSON.parse(localStorage.getItem('noDisc'));
            console.log("price without disc", basic)
          setTotalCart(basic - (bird.amount))
          }
    }
  return (
    <div className="App">
      <main>
        
        <Cart 
        userCart={userCart}
        totalCart={totalCart}
        discount={discount}
        bonusItems={bonusItems}
        deleteBird={deleteBird}
        />

        <Checkout 
        setUserCart={setUserCart} 
        setDiscount={setDiscount}
        setTotalCart={setTotalCart}
        />

        <BirdCards
        birdData={birdData}
        addBird={addBird}
        />
      </main>
    </div>
  )
}



export default App;
