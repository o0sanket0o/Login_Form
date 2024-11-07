import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = ({setisRegistered, isRegistered}) => {
  const [user, setuser] = useState('');
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try{
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
      const url = 'http://localhost:8080/products';
      const response = await fetch(url,{
        method: 'GET',
        headers: headers,
      });
      const jsonFormat = await response.json();
      setProducts(jsonFormat);
    }catch(err){
      console.log(err);
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem('name');
    if(stored){
      setuser(stored);
    }else{
      navigate('/login');
    }
    fetchProducts();
  }, [navigate])
  function handleLogOut(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
    <h1>Welcome {user}</h1>
    <div>Products are</div>
    <ul>
      {products.map((product, index) => {
        return <li key={index}>{product.name}</li>
      })}
    </ul>
    <button onClick={handleLogOut}>Log Out</button>
    </>
  )
}
