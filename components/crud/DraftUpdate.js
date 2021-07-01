import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleDraft, updateDraft,removeDraft } from '../../actions/draft';
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';
import Preview from './preview'
import FAQ from './Faq'
import { ToastContainer, toast } from 'react-toastify';
import {createFAQ} from '../../actions/faq'



const DraftUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [faqS, setFaqS] = useState(false);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [featuredImage, setFeatureImage] = useState();

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        body: '',
        loading: false
    });

    const { error, success, formData, title, loading } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initDraft();
        initCategories();
        initTags();
    }, [router]);

    const initDraft = () => {
        if (router.query.slug) {
            singleDraft(router.query.slug).then(data => {
              console.log(data)
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);

                }
            });
        }
    };

    const faqStatus = () => {
     if(faqS){
       return "FAQs Added ✅"
     }else{
       return "Add FAQs"
     }
    }



    const setCategoriesArray = blogCategories => {
        let ca = [];
        // blogCategories.map((c, i) => {
        //     ca.push(c._id);
        // });
        // setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        // blogTags.map((t, i) => {
        //     ta.push(t._id);
        // });
        // setCheckedTag(ta);
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input
                        onChange={handleToggle(c._id)}
                        checked={findOutCategory(c._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input
                        onChange={handleTagsToggle(t._id)}
                        checked={findOutTag(t._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };




    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        setFeatureImage(value);
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editDraft = e => {
        e.preventDefault();
        updateDraft(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {

                setValues({
                    ...values,
                    loading: false,
                    success: `Draft "${data.title}" is successfully updated`
                });
                if (isAuth() && isAuth().role === 1) {
                    Router.replace(`/admin/draft/${router.query.slug}`);
                    // Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

    const CreateFaq = (faq, token) => {
      createFAQ({name: faq}, token).then(data => {
        if(data.error){
          toast.error(data.error)
          console.log(data.error)
        }
        toast.success('FAQ is created successfully')
        formData.set("faqs", data._id);
            setFaqS(true)
          }
      );
    }


    const publishBlog = e => {
      setValues({ ...values, loading: true });
      e.preventDefault();
      // console.log('ready to publishBlog');
      createBlog(formData, token).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data)
          setValues({
            ...values,
            loading: false,
            title: "",
            error: "",
            success: `A new article titled "${data.title}" is created`
          });
          setBody("");
          setCategories([]);
          setTags([]);
          deleteDraft(router.query.slug)
         Router.replace('/')
        }
      });
    };

    const deleteDraft = slug => {
        removeDraft(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

            }
        });
    };


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );

    const updateBlogForm = () => {
        return (
            <form onSubmit={editDraft}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-outline-info btn-sm mb-3 btn-block">
                        Update Draft
                    </button>

                </div>
                <button onClick={publishBlog} className="btn btn-primary btn-block">
                    Publish
                </button>
            </form>
        );
    };

    return (
        <div className="container fluid pb-5">
        <ToastContainer/>
            <div className="row">
                <div className="col-md-9">
                    {updateBlogForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                    </div>
                </div>

                <div className="col-md-3">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <small className="text-muted">Max size: 1mb</small>
                            <br />
                            <label className="btn btn-outline-success">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>

                           <FAQ  create={CreateFaq} operation="Create FAQ" faqOps={faqStatus()}/>
                          <Preview body={body} photo={featuredImage} title={title}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(DraftUpdate);
