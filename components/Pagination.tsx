
import { useEffect, useState } from "react";

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
};

const allUsers = async ({ take, lastCursor }: UserQueryParams) => {
  const response = await fetch("/api/users", {
    method: 'GET',
  })
  return response;
};


const Users = () => {
  const [cursor, setCursor]: any = useState(null)
  const [buttonPress, setButtonPress]: any = useState(false)
  useEffect(() => {
 // if the last element is in view and there is a next page, fetch the next page
    const fetchData = async () => {
        await allUsers({ take: 2})
        .then(response => response.json())
        .then(data => setCursor(data.data.id))
      }
    fetchData()
    return () => {
      fetchData()
    }
  }, []);


  return (
<></>
  );
};

export default Users;