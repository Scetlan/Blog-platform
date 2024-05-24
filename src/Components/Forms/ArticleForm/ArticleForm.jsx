import classes from './ArticleForm.module.scss';
import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { createNewArticle, editArticle } from '../../../Redux/api/Api';

const InputStyle = {
  height: 40,
  marginBottom: 20,
};

function ArticleForm({ isEdit }) {
  const { TextArea } = Input;
  const { isError, article, loading } = useSelector(state => state.fetch);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: article && isEdit ? article.title : '',
      description: article && isEdit ? article.description : '',
      text: article && isEdit ? article.body : '',
      tags: article && isEdit ? article.tagList.map(tag => ({ name: tag })) : [],
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { append, fields, remove } = useFieldArray({ control, name: 'tags' });

  const submit = data => {
    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags.map(tag => tag.name),
    };
    if (isEdit && article) dispatch(editArticle({ newArticle, slug: article.slug }));
    else dispatch(createNewArticle(newArticle));
  };

  useEffect(() => {
    if (isSubmitSuccessful && article && !loading) {
      navigate(`/articles/${article.slug}`);
    }
  }, [isSubmitSuccessful, article]);
  return (
    <div className={classes.article__form}>
      <h2 className={classes.title}>{isEdit ? 'Edit article' : 'Create new article'}</h2>
      <form onSubmit={handleSubmit(submit)} className={classes['form-create']}>
        <label htmlFor="title" className={classes['label-name']}>
          Title
        </label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            minLength: { value: 3, message: 'Title needs to be at least 3 characters' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.title ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Title"
              />
              {errors.title && <span className={classes.error}>{errors.title.message}</span>}
            </>
          )}
        />

        <label htmlFor="description" className={classes['label-name']}>
          Short description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.description ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Description"
              />
              {errors.description && <span className={classes.error}>{errors.description.message}</span>}
            </>
          )}
        />
        <label htmlFor="text" className={classes['label-name']}>
          Text
        </label>
        <Controller
          name="text"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <TextArea
                {...field}
                placeholder="Text"
                style={
                  errors.text
                    ? {
                        ...InputStyle,
                        borderColor: 'red',
                        marginBottom: 0,
                        height: 170,
                        resize: 'none',
                      }
                    : { ...InputStyle, height: 170, resize: 'none' }
                }
              />
              {errors.text && <span className={classes.error}>{errors.text.message}</span>}
            </>
          )}
        />
        <label htmlFor="tags" className={classes['label-name']} style={{ display: 'block', marginBottom: 3 }}>
          Tags
        </label>
        <ul className={classes.tagList}>
          {fields.map((_, index) => (
            <li key={uniqid.time('tag-')} className={classes.tag}>
              <Controller
                name={`tags.${index}.name`}
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} style={{ ...InputStyle, width: 300, marginBottom: 5 }} placeholder="Tags" />
                    {errors.tags && <span className={classes.error}>{errors.tags.message}</span>}
                  </>
                )}
              />
              <button
                type="button"
                aria-label="delete tag"
                className={classes['delete-button']}
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </li>
          ))}
          <button
            type="button"
            aria-label="add tag"
            className={classes['add__tag-button']}
            onClick={() => append({ name: '' })}
          >
            Add tag
          </button>
        </ul>
        <button type="submit" className={classes['send-button']}>
          Send
        </button>
        {typeof isError === 'string' && <span className={classes.error}>{isError}</span>}
      </form>
    </div>
  );
}

export default ArticleForm;
