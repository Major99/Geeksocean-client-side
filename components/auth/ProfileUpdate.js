import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import { Input } from 'antd'
import { ToastContainer, toast } from 'react-toastify';

const { TextArea } = Input;

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: '',
        picture: ''
    });


    const token = getCookie('token');
    const { username, name, email, about, password, error, success, loading, photo, userData, picture } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
              console.log(data)
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    picture: data.picture
                });
            }
        });
    };

    useEffect(() => {
        init();

    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                toast.error(data.error)
                console.log('data.error', data.error);
                setValues({ ...values, error: data.error, loading: false });
            } else {
                updateUser(data, () => {
                  toast.success('Profile Updated')
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
                if(process.browser){
                  location.reload();
                }
            }
        });
    };

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info btn-sm">
                    Change profile picture
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <Input addonBefore="Username"  onChange={handleChange('username')} type="text" value={username}   />
            </div>
            <div className="form-group">
                <Input addonBefore="Name" onChange={handleChange('name')} type="text" value={name} className="" />
            </div>
            <div className="form-group">

                <Input addonBefore="Email" onChange={handleChange('email')} type="text" value={email} className="" disabled/>
            </div>
            <div className="form-group">
                <TextArea  placeholder="Bio" onChange={handleChange('about')} type="text" value={about} className="" />
            </div>
            <div className="form-group">
                <Input addonBefore="Change password" onChange={handleChange('password')} type="password" value={password} className="" />
            </div>
            <div>
                {showSuccess()}
                {showError()}
                {showLoading()}
            </div>
            <div>
                <button type="submit" className="btn btn-info btn-sm" disabled={!username || !name || !email}>
                    Update
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );

    return (
        <React.Fragment>
            <div className="container">
            <ToastContainer />
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`${API}/user/photo/${username}`}
                            className="img img-fluid img-thumbnail mb-3"
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt="user profile"
                        />
                    </div>
                    <div className="col-md-8 mb-5">{profileUpdateForm()}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileUpdate;
