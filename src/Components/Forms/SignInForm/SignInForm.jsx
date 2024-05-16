import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import classes from './SignInForm.module.scss';
import { clearError, logIn } from '../../../Redux/reducer/fetchSlice';
import { useDispatch, useSelector } from 'react-redux';

const InputStyle = {
  height: 40,
  marginBottom: 10,
};

export const SignInForm = () => {
  const { isError, loading } = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const submit = data => {
    const login = {
      email: data.email,
      password: data.password,
    };
    window.localStorage.setItem('email', data.email);
    window.localStorage.setItem('password', data.password);
    dispatch(logIn(login));
  };

  useEffect(() => {
    if (isSubmitSuccessful && !isError && !loading) {
      navigate('/');
    }
  }, [isSubmitSuccessful, isError, loading]);

  useEffect(() => {
    if (isError && !isSubmitSuccessful) dispatch(clearError());
  });

  return (
    <div className={classes.user}>
      <h2 className={classes['title-form']}>Sign In</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="email" className={classes['name-label']}>
          Email address
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            pattern: { value: /(\w\.?)+@[\w.-]+\.\w{2,}/, message: 'Email adress is incorrect' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={
                  errors.email ||
                  (isError && typeof isError === 'object' && 'email' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Email address"
              />
              {errors.email && <span className={classes.error}>{errors.email.message}</span>}
              {isError && typeof isError === 'object' && 'email' in isError && isSubmitted && (
                <span className={classes.error}>Email {isError.email}</span>
              )}
            </>
          )}
        />
        <label htmlFor="password" className={classes['name-label']}>
          Password
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="password"
                style={
                  errors.password
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : { ...InputStyle, marginBottom: 20 }
                }
                placeholder="Password"
              />
              {errors.password && <span className={classes.error}>{errors.password.message}</span>}
            </>
          )}
        />
        <button type="submit" className={classes['btn-login']}>
          Login
        </button>
        {typeof isError === 'string' && isSubmitted && (
          <span className={classes.error}>Username or email {isError}</span>
        )}
        <span className={classes['account']}>
          Don't have an account?
          <Link
            to={'/sign-up'}
            style={{ 'margin-left': '5px', color: '#1890FF', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignInForm;
