import React, { memo, useEffect, useState, useRef } from "react";

interface iUserData {
  userId: number;
}

interface iUser {
  name: string;
  email: string;
}

const UserData = memo<iUserData>((props) => {
  const { userId } = props;
  const isFirstRender = useRef<boolean>(true);
  const [user, setUser] = useState<iUser | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
    fetchUserData();
    const intervalId = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchUserData();
  }, [props.userId]);
  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  };
  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
});
export default UserData;
