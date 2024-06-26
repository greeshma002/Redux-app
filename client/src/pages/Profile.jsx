import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,
   updateUserFailure,
    updateUserSuccess,
     deleteUserStart,
     deleteUserFailure,
     deleteUserSuccess,
     signOut } from "../redux/user/userSlice";


const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ ...currentUser });
  const [updateSuccess, setUpdateSuccess] = useState(false)
  
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime()  + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error('Upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if ( data.success === false ) {
        dispatch(updateUserFailure(data));
        setUpdateSuccess(true)
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
  
      dispatch(deleteUserSuccess(data));
  
      window.location.href = '/signin'; 
  
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
      window.location.href = '/signin'; 
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image (File size must be less than 2MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-sky-200 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-sky-200 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-sky-200 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{ error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5">{ updateSuccess && 'User is updated successfully !'}</p>
    </div>
  );
};

export default Profile;
