import React, { useEffect } from "react";

const UsersFetcher = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`)
      .then(res => res.json())
      .then(data => {
        console.log(data); // Backend se data aayega
      })
      .catch(err => console.error(err));
  }, []);

  return null; // UI nahi chahiye, sirf fetch
};

export default UsersFetcher;
