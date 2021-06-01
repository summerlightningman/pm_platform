import './login.css';
import {useState} from "react";
import {login} from "../../http";
import {Redirect, useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = () => {
    const [values, setValues] = useState({
        email: 'oblivion333@gmail.com',
        password: 'oblivvion333'
    });
    const [cookies, ,] = useCookies();
    const isLoggedIn = cookies.hasOwnProperty('jwttoken');
    const history = useHistory();

    const handleChange = ({target}) => setValues({...values, [target.name]: target.value});

    const handleSubmit = e => {
        e.preventDefault();

        login(values).then(({data}) =>
            data.hasOwnProperty('token') ? history.push('/main/upload/') : null);
    };

    if (isLoggedIn)
        return <Redirect to='/main/upload'/>
    return <div className="login-window">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Авторизация</h1>
            <div className="form-control">
                <label className="form-label" htmlFor="email">E-Mail</label>
                <input type="text" name="email" id="email" value={values.email} onInput={handleChange}
                       className="form-input"/>
            </div>
            <div className="form-control">
                <label className="form-label" htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" value={values.password} onInput={handleChange}
                       className="form-input"/>
            </div>
            <input type="submit" value="Вход" className="form-input form-submit"/>
        </form>
    </div>
};

export default Login