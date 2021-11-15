const API = "http://localhost:5000";

export const getAll = () => {
    //console.log(user.name, user.email, user.password, user.phone);
  
    return fetch(`${API}/all`, {
      method: "GET",
    })
      .then((response) => {
        //console.log(JSON.stringify(response.json()));
        //console.log(response);
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const getPrediction = ({ filters }) => {
    //console.log(user.name, user.email, user.password, user.phone);
    // console.log(`${API}/filteredrecords/${offset}`);
    // console.log(conditions);
    console.log("filters: ", filters);
    return fetch(`${API}/getPrediction`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((response) => {
        //console.log(JSON.stringify(response.json()));
        console.log(response);
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };