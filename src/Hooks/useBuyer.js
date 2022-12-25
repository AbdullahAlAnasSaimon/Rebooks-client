import { useEffect, useState } from "react"

const useBuyer = email =>{
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);

  useEffect(() => {

    if(email){
      fetch(`https://ebooks-server.vercel.app/users/buyer/${email}`,{
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setIsBuyer(data.isBuyer);
        setIsBuyerLoading(false);
      })
    }

  }, [email])

  return [isBuyer, isBuyerLoading];
}

export default useBuyer;