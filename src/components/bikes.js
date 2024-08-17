import React, { useEffect, useState } from 'react';
import '../App.css';
import './css/bike.css';
import { bikes } from "./bikelist";
import { Link, useNavigate } from 'react-router-dom';

import olximg from '../components/images/olximg.png'
import fbicon from './images/facebookicon.svg';
import googleicon from './images/googleicon.svg';
import userpng from './images/pnguser.png'

function Bike() {


  const [searchTerm, setsearchTerm] = useState("")

  const navigate = useNavigate()

  const [modal, setModal] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);


  // localStorage.setItem("loggedIn", true)

  const userName = JSON.parse(localStorage.getItem("users"))


  const toggleModal = () => {
    setModal(!modal);
  };

  const loginCon = () => {
    setModal(false);
  };



  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  const Logout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("name");
    // localStorage.removeItem("name");
    // localStorage.removeItem("signUp");
    localStorage.clear();
    navigate('/')
}

const [open, setOpen] = useState(false);


useEffect(()=> {
  const handler = () => {
    setOpen(false)
  };
  
document.addEventListener("mousedown", handler);
},[])

const handleCartss = (bike) => {
  console.log(bike)
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const isProductExist = cart.find(item => item.id === bike.id)
  if (isProductExist) {
    const updatedCart = cart.map(item => {
      if (item.id === bike.id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  } else {
    localStorage.setItem('cart', JSON.stringify([...cart, { ...bike, quantity: 1 }]))
  }
  navigate('/')
}

const [inputValue, setInputValue] = useState('');
const [showDropdown, setShowDropdown] = useState(false);
const [selectedOption, setSelectedOption] = useState('');

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleDropdownClick = () => {
  setShowDropdown(!showDropdown);
};

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  setInputValue(option);
  setShowDropdown(false);
};

const options = ['Faisalabad', 'Lahore', 'Karachi'];


  return (
    <>


<i class="fa-solid fa-bars menu__icon" onClick={() => {setmenuOpen(!menuOpen)}}></i>


<div className='navbar__search'>


         {/* <div className='navbar__select navbar__search-cont'>
            <p className='loc__details'><i class="fa-solid fa-location-dot loc__icon"></i> <span>Jinnah Town, Faisalabad</span></p>
            <i class="fa-solid fa-chevron-down down__icom"></i>
          </div> */}

<div className="input-container">
<span className="location-icon"><i class="fa-solid fa-location-dot"></i></span>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter location"
        onClick={handleDropdownClick}
        className="drop__input"
      />
      <span className="dropdown-icon" onClick={handleDropdownClick}>▼</span>
      {showDropdown && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)} className="drop__li">
              <i class="fa-solid fa-location-dot"></i> {option}
            </li>
          ))}
        </ul>
      )}
    </div>


          <div className='navbar__sear navbar__search-cont'>
            <input type='text' placeholder='Find Cars, Mobile Phones and more...' className='navbar__input' id='navbar__input' onChange={(event) => {setsearchTerm(event.target.value)}}/>
            <i class="fa-solid fa-magnifying-glass mag__icon"></i>
          </div>
          <div className={menuOpen ? "navbar__log" : ""} id='navbar__log'>
            {!localStorage.getItem("loggedIn") ?
                <p className='log__text nav__login' onClick={toggleModal}>Login</p> :
                <p><img src={userpng} alt="profile card" className='user__img' onClick={()=> {setOpen(!open)}}/></p>
            }
    
       </div>
            <button className='navbar__btn nav__login' id='navbar__btn' onClick={toggleModal}><i class="fa-solid fa-plus add__icon"></i> Sell</button>
   
        </div>


        {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div> 
          <div className="modal-content">

            <div className='popup__image'>
              <img src={olximg} alt={olximg} className='popup__logo' />
            </div>
            <p className='log__para'>
              Login into your OLX account
            </p>

              <div className='google__cont'>
                <img src={googleicon} alt={googleicon} className='google__img' />
                <span>Login with Google</span>
                </div>


            <div className='google__cont'>
              <img src={fbicon} alt={fbicon}  className='google__img' />
              <span>Login with Facebook</span>
            </div>
            <div className='or__head'>
              <p className='or__text'>OR</p>
            </div>
            <div className='google__cont'>
              <i class="fa-regular fa-envelope popup__env"></i>
              <span>Login with Email</span>
            </div>
            <div className='google__cont'>
              <i class="fa-solid fa-phone popup__env"></i>
              <span>Login with Phone</span>
            </div>
            <div className='or__head'>
              <Link to={'/signup'} onClick={loginCon} className='new__text'>New to OLX? Creat an account</Link>
            </div>
            <i className="fa-solid fa-xmark close-modal" onClick={toggleModal}></i>
          </div>
          </div>
      )}

{localStorage.getItem("loggedIn") &&
     // <div className="user__details" id='wrapper'>
     <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} id='user__details'>
     {/* <a href='#close'><i class="fa-solid fa-xmark user__mark"></i></a> */}
          <div className="user__name">Hello, {userName.name}</div>
          <div className="profile-card-ctr">
            <button className="logout__btn" onClick={Logout}>Log out</button>
          </div>
        </div>
      }


       {/* ==================== BIKES SECTION ================  */}

       <div className="recent__head bikes__head">
          <h1 className="recent__text cars__text">Bikes & Motorcycles</h1>
        </div>

        <div className="recent__cont car__cont">


          <div className="recent__prod">
            {
              bikes.map((bike) => {
                return (
                  <>
                    <div className="mobile__cont">
                      <div className="mobile__image">
                      <Link to={`/productsssss/${bike.id}`} style={{ textDecoration: "none" }} key={bike.id}><img src={bike.image} alt={bike.name} className="mobile__img" /></Link>
                      </div>
                      <div className="mobile__box">
                        <div className="mobile__dil">
                          <p className="mobile__price">Rs {bike.price}</p>
                          <i class="fa-regular fa-heart"></i>
                        </div>
                        <p className="mobile__name">{bike.name}</p>
                        <p className="mobile__loc">{bike.location}</p>
                        <p className="mobile__day">{bike.days}</p>
                      </div>
                      <div className="cart__button">
                          <button className="cart__btn" onClick={() => handleCartss(bike)}>Add to Cart</button>
                        </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>


    </>
  );
}

export default Bike;