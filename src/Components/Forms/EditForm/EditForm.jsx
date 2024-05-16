import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import classes from './EditForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, editProfile } from '../../../Redux/reducer/fetchSlice';

const InputStyle = {
  height: 40,
  marginBottom: 10,
};

const EditForm = () => {
  const { loading, isError, user } = useSelector(state => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: (user && user.username) || '',
      email: (user && user.email) || '',
      avatar: (user && user.image) || '',
    },
  });

  const submit = data => {
    const updateUser = {
      username: data.username,
      email: data.email,
      password: data.newPassword,
      image: data.avatar,
    };
    dispatch(editProfile(updateUser));
  };

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    if (!loading && isSubmitSuccessful && !isError) navigate('/');
  }, [isSubmitSuccessful, isError, loading]);

  useEffect(() => {
    if (isError && !isSubmitSuccessful) dispatch(clearError());
  });
  return (
    <div className={classes['edit__form-blog']}>
      <h2 className={classes.title}>Edit Profile</h2>
      <form onSubmit={handleSubmit(submit)} className={classes['edit-form']}>
        <label htmlFor="username" className={classes['label-name']}>
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
                  errors.username ||
                  (isError && typeof isError === 'object' && 'username' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Username"
              />
              {errors.username && <span className={classes.error}>{errors.username.message}</span>}
              {isError && typeof isError === 'object' && 'username' in isError && isSubmitted && (
                <span className={classes.error}>Username {isError.username}</span>
              )}
            </>
          )}
        />
        <label htmlFor="email" className={classes['label-name']}>
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
        <label htmlFor="password" className={classes['label-name']}>
          New password
        </label>
        <Controller
          name="newPassword"
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
                style={
                  errors.newPassword
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Password"
              />
              {errors.newPassword && (
                <span className={classes.error}>{errors.newPassword.message}</span>
              )}
            </>
          )}
        />
        <label htmlFor="image" className={classes['label-name']}>
          Avatar image (url)
        </label>
        <Controller
          name="avatar"
          control={control}
          rules={{
            pattern: {
              value: /[(http(s)?)://(www.)?\w-/=#%&.?]{2,}\.[a-z]{2,}([\w-/=#%&.?]*)/,
              message: 'URL is incorrect',
            },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={
                  errors.avatar
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : { ...InputStyle, marginBottom: 20 }
                }
                placeholder="Avatar image"
              />
              {errors.avatar && <span className={classes.error}>{errors.avatar.message}</span>}
            </>
          )}
        />

        <button type="submit" className={classes['save-button']}>
          Save
        </button>
        {typeof isError === 'string' && isSubmitted && (
          <span className={classes.error}>Username or email {isError}</span>
        )}
      </form>
    </div>
  );
};

export default EditForm;
