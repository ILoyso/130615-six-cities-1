import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component for authorization
 * @param {Object} props
 * @return {*}
 */
const SignIn = (props) => {
  const {
    onChange,
    onLogIn,
    user
  } = props;

  return <div className="page page--gray page--login">
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                name="email"
                onChange={onChange}
                placeholder="Email"
                required=""
                type="email"
                value={user.email}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                name="password"
                onChange={onChange}
                placeholder="Password"
                required=""
                type="password"
                value={user.password}
              />
            </div>
            <button
              className="login__submit form__submit button"
              onClick={onLogIn}
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>;
};


SignIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};


export default SignIn;
