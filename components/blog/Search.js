import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';
import Router, { withRouter } from 'next/router';
import { Input, Button } from 'antd';
import { IoMdSearch } from "react-icons/io";
import { useMediaQuery } from 'react-responsive'


const Search = ({ router }) => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const searchedBlogs = (results = []) => {
        return (
            <div className="jumbotron ">
                {message && <p className="text-muted font-italic">{message}</p>}

                {results.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}

            <style global jsx>{`
             .jumbotron{
               margin-bottom: 8em!important;
               padding: 12px 12px 12px 12px!important;
             }
              }
              `}</style>
          </div>
        );
    };

    const searchForm = () => {
      const isMobileOrTablet = useMediaQuery({  query: '(max-device-width: 766px)' })

      const searchMobileCss = () => {
        if(isMobileOrTablet){
          return "margin-top: 30px;"
        }
        return;
      }

      return <form onSubmit={searchSubmit}>
            <div className="row col justify-content-center searchBox">
                    <Input type="search"  placeholder="Search Geek Articles" onChange={handleChange} className='search-input col-9' />
                    <IoMdSearch  className='search-icon col-2' type="submit" onClick={searchSubmit} />

            </div>
            <style global jsx>{`
              .search-icon{
                font-size: 43px!important;
                margin-top:10px;
                margin-bottom:20px;

              }
              .searchBox{
                ${searchMobileCss()}
              }
              .search-input{
                border:1px solid black;
                height: 50px!important;
                margin-top:10px;
                font-size:20px!important;
                border-radius: 40px!important;
              }
              .col-2{
                padding-right: 0px;
                padding-left: 0px;
              }

              `}</style>
        </form>
    };

    return (
        <div className="container">
            <div className="">{searchForm()}</div>
            {searched && <div style={{ marginTop: '0px', marginBottom: '-100px' }}>{searchedBlogs(results)}</div>}
        </div>
    );
};

export default withRouter(Search);
