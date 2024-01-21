import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.userData);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <header className="flex justify-end py-4 pr-4">
          {currentUser && (
            <button type="button" className="flex gap-4 bg-teal-400 p-2 rounded">
              <p className="font-bold text-slate-900">{currentUser.userName}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="text-slate-900" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
            </button>
          )}
        </header>
    </div>
  )
}

export default Header
