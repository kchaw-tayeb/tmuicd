import React from "react";

function GetCompanies() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/api/companies");
        setCompanies(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [deleteI]);
  return <div>GetCompanies</div>;
}

export default GetCompanies;
