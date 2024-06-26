import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from '../firebase'
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
         const provider = new GoogleAuthProvider()
         const auth = getAuth(app)
         const result = await signInWithPopup(auth, provider)
         const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                phto: result.user.photoURL,
            }),
         });
         const data = await res.json();
         console.log(data);
         dispatch(signInSuccess(data))
         navigate('/')
        }catch(error) {
            console.log("could not login with google", error);
        }
    }
  return (
   <button type='button' onClick={handleGoogleClick} className='rounded-lg p-3 uppercase hover:opacity-95 bg-sky-400'>
    Continue with google
   </button>
  )
}

export default OAuth
