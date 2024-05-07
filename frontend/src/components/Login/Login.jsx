import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';


const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      axios
        .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, { username: input.username, password: input.password })
        .then((response) => {
          console.log(response);
          Cookies.set('id', response.data.cookie, { path: '/' });
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    alert('please provide a valid input');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (Cookies.get('id') === undefined) {
    return (
      <form onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <label htmlFor="user-email">Email: </label>
          <input
            type="text"
            id="user-email"
            name="username"
            placeholder="us@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
    );
  } else {
    return <button onClick={() => {
      Cookies.remove("id");
      window.location.reload();
    }
    }>Logout</button>
  }
};

export default Login;
