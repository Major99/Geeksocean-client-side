import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import LazyLoad from 'react-lazy-load';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const SmallCard = ({ blog }) => {
    return (
        <div className="card shadow">
            <section>

                  <LazyLoad height={"100%"} offsetHorizontal={50} >
                    <Link href={`/blogs/${blog.slug}`}>
                      <a>
                        <LazyLoadImage
                            className="img img-fluid"
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                      </a>
                      </Link>
                  </LazyLoad>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h5 className="card-title">{blog.title}</h5>
                        </a>
                    </Link>
                    {/*<div className="card-text">{renderHTML(blog.excerpt)}</div>*/}
                </section>
            </div>

            <div className="card-body">
                Posted {moment(blog.updatedAt).fromNow()} by{' '}
                 <Link href={`/profile/${blog.postedBy.username}`}>
                    <a>{blog.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;
