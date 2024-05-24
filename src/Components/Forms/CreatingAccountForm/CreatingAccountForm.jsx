import classes from './CreatingAccountForm.module.scss';
import { clearError } from '../../../Redux/reducer/fetchSlice';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Divider, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../../../Redux/api/Api';

const InputStyle = {
  height: 40,
  marginBottom: 10,
};

function CreatingAccountForm() {
  const { isError, loading } = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm({});

  const submit = data => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(registerNewUser(user));
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
    <div className={classes.new__user}>
      <h2 className={classes['title-form']}>Create new account</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="username" className={classes['name-label']}>
          Username
        </label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            minLength: { value: 3, message: 'Username needs to be at least 3 characters' },
            maxLength: { value: 20, message: 'Username needs to be no more than 20 characters' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={
                  errors.username || (isError && typeof isError === 'object' && 'username' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Username"
              />
              {errors.username && <span className={classes.error}>{errors.username.message}</span>}
              {isError && typeof isError === 'object' && 'username' in isError && isSubmitted && (
                <span className={classes.error}>
                  Username
                  {isError.username}
                </span>
              )}
            </>
          )}
        />

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
                  errors.email || (isError && typeof isError === 'object' && 'email' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Email address"
              />
              {errors.email && <span className={classes.error}>{errors.email.message}</span>}
              {isError && typeof isError === 'object' && 'email' in isError && isSubmitted && (
                <span className={classes.error}>
                  Email
                  {isError.email}
                </span>
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
            minLength: { value: 6, message: 'Password needs to be at least 6 characters' },
            maxLength: { value: 40, message: 'Password needs to be no more than 40 characters' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="password"
                style={errors.password ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Password"
              />
              {errors.password && <span className={classes.error}>{errors.password.message}</span>}
            </>
          )}
        />
        <label htmlFor="repeatPassword" className={classes['name-label']}>
          Repeat Password
        </label>
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            validate: value => value === watch('password') || 'Passwords needs must match',
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="password"
                style={errors.repeatPassword ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Repeat Password"
              />
              {errors.repeatPassword && <span className={classes.error}>{errors.repeatPassword.message}</span>}
            </>
          )}
        />
        <Divider style={{ margin: '10px 0' }} />
        <div className={classes.aa__checkbox}>
          <Controller
            name="checkbox"
            control={control}
            rules={{
              required: 'This field is required',
            }}
            render={({ field }) => (
              <>
                <Checkbox
                  {...field}
                  name={field.name}
                  onChange={field.onChange}
                  checked={field.value}
                  style={{
                    verticalAlign: 'top',
                    marginBottom: errors.checkbox ? 0 : 20,
                    color: '#595959',
                    display: 'flex',
                    textAlign: 'start',
                  }}
                >
                  I agree to the processing of my personal information
                </Checkbox>
                {errors.checkbox && <span className={classes.error}>{errors.checkbox.message}</span>}
              </>
            )}
          />
        </div>
        <button type="submit" className={classes.button__create}>
          Create
        </button>
        {typeof isError === 'string' && isSubmitted && (
          <span className={classes.error}>
            Username or email
            {isError}
          </span>
        )}
        <span className={classes.account__access}>
          Already have an account?{' '}
          <Link to="/sign-in" style={{ color: '#1890FF', textDecoration: 'none' }}>
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
}

export default CreatingAccountForm;
