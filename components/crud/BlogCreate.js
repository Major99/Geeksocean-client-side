import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { createDraft } from "../../actions/draft";
// import { createKeyword, getKeywords } from '../../actions/keyword';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import {Button, Input,Checkbox} from 'antd';
import htmlToText from 'html-to-text';
// import keyword_extractor from "keyword-extractor";
// import { create } from '../../actions/tag';
import { Select, Radio } from 'antd';
const { Option } = Select;
const token = getCookie('token');
import Preview from './preview'
import FAQ from './Faq'
import {createFAQ} from '../../actions/faq'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';





const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [faqS, setFaqS] = useState(false);
  // const [keywords, setKeywords] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags
  // const [checkedKeywords, setCheckedKeywords] = useState([]); //keywords
  const [featuredImage, setFeatureImage] = useState();
  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
    loading: false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
    loading
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
    // initKeywords();

  }, [router]);

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





  const publishBlog = e => {
    setValues({ ...values, loading: true });
    e.preventDefault();
    // console.log('ready to publishBlog');
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast.error(data.error)
      } else {
        console.log(data)
        setValues({
          ...values,
          loading: false,
          title: "",
          error: "",
          success: `A new article titled "${data.title}" is created`
        });
        toast.success(`A new article titled "${data.title}" is created`)
        setBody("");
        setCategories([]);
        setTags([]);
        // setKeywords([]);

      }
    });
  };


  const savedDraftBlog = e => {
        setValues({ ...values, loading: true });
        e.preventDefault();
        createDraft(formData, token).then(data => {
          if (data.error) {
            toast.error(data.error)
            setValues({ ...values, error: data.error, loading: false });
          } else {
            console.log(data)
            setValues({
              ...values,
              loading: false,
              title: "",
              error: "",
              success: `"${data.title}" is saved a draft`
            });
              toast.success(`"${data.title}" is saved as a draft`)
            setBody("");
            setCategories([]);
            setTags([]);
            // setKeywords([]);
          }
        });
  }

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



  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    setFeatureImage(value);
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = e => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };



  const showError = () => (
    <div

    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

// const generateKeywords = () => {
//  const sentence = htmlToText.fromString(body)
//  const key_word = keyword_extractor.extract(sentence,{
//   language:"english",
//   remove_digits: true,
//   return_changed_case:true,
//   return_chained_words:true,
//   remove_duplicates: true
// });

// const keywordArray = [];
//  key_word.map(item => {
//    return createKeyword({ name: item }, token).then(key => {
//      keywordArray.push(key)
//        setKeywords(keywordArray)
//    })
//
//  })
//
// }





function SelectedTag(value) {
  setValues({ ...values, error: "" });
  setCheckedTag(value);
  formData.set("tags", value);

}

function SelectedCategory(value) {
  setValues({ ...values, error: "" });
   setChecked(value)
   formData.set("categories", value);

}

// function SelectedKeyword(value) {
//   setValues({ ...values, error: "" });
//    setCheckedKeywords(value)
//    formData.set("keywords", value);
//
// }

const tagsChildren = [];
tags.map(item => {
  return tagsChildren.push(<Option  key={item._id}>{item.name}</Option>)
})

const categoryChildren = [];
categories.map(item => {
  return categoryChildren.push(<Option  key={item._id}>{item.name}</Option>)
})

// const keywordChildren = [];
// keywords && keywords.map(item => {
//   return keywordChildren.push(<Option  key={item._id}>{item.name}</Option>)
// })

// const disable = () => {
//   if(keywords.length > 0){
//     return true
//   }
//   return false;
// }


// const showFaq = () => {
//   return faq.body.map(Faq => {
//       return <div className='container'>
//             <h2 className='text-center'>Frequently Asked Questions</h2>
//               <div className='text-center'><b>{Faq.question}</b></div>
//               <div className='text-center'>{Faq.answer}</div>
//              </div>
//     })
//   }
// }

const faqStatus = () => {
 if(faqS){
   return "FAQs Added ✅"
 }else{
   return "Add FAQs"
 }
}

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">

          <Input
            addonBefore='Title'
            type="text"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write here ..."
            onChange={handleBody}
          />
        </div>

        <div className="form-group mb-5">
        <button  onClick={savedDraftBlog} className="btn btn-outline-info btn-block btn-sm">
          Save as a draft
        </button>
        </div>


        <div>
          <button type="submit" className="btn btn-primary btn-block">
            Publish
          </button>
        </div>
      </form>
    );
  };


  return (
    <div className="container-fluid pb-5">
    <ToastContainer />
      <div className="row">
        <div className="col-md-9">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
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
              <label className="btn btn-outline-success btn-block">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
          <div>
          {/*  <h5>Keywords</h5>
           <small>Note: genrate keywords just before publish</small>*/}
          {/*<Button onClick={generateKeywords} block disabled={disable()} className="generate">Generate keywords</Button>*/}

          {/*  <Select
            mode="tags"
            placeholder="Select Keywords"
            defaultValue={[]}
            showArrow={true}
            filterOption={true}
            onChange={SelectedKeyword}
            style={{ width: '100%' }}
            >
            {keywordChildren}
            </Select>*/}
            </div>
            <div className='mt-3 mb-3 pt'>
              <FAQ  create={CreateFaq} operation="Create FAQ" faqOps={faqStatus()}/>
             </div>
            <br />
            <h5>Categories</h5>
            <Select
            mode="tags"
            placeholder="Select Category"
            defaultValue={[]}
            showArrow={true}
            filterOption={true}
            onChange={SelectedCategory}
            style={{ width: '100%' }}

            >
            {categoryChildren}
            </Select>
          </div>
          <hr />
          <div>
            <h5>Tags</h5>
            <Select
            mode="tags"
            placeholder="Select Tags"
            defaultValue={[]}
            showArrow={true}
            onChange={SelectedTag}
            style={{ width: '100%' }}
            >
            {tagsChildren}
            </Select>
            <hr />
          </div>
          <div className='mt-5'>
            <Preview body={body} photo={featuredImage} title={title}/>
          </div>
        </div>
      </div>
      <style global jsx>{`
         .generate{
           margin-bottom: 5px!important;
         }
        `}</style>
    </div>
  );
};

export default withRouter(CreateBlog);
