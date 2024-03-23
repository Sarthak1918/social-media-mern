import SignupCard from '../components/SignupCard.jsx';
import LoginCard from '../components/LoginCard.jsx';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom.js';


function AuthPage() {

// in recoil we call state as atom.useRecoilValue to get the value of the atom and useSetRecoilState to set the value of the atom
    
// const[state,setState] = useState(null)
    const authScreenState = useRecoilValue(authScreenAtom); //like in useState we can use useRecoilValue to get the value of the atom
    // const setAuthScreenState = useSetRecoilState(authScreenAtom); //like in useState we can use useSetRecoilState to set the value of the atom


  return (
    <div>
      {
        authScreenState === "login" ? <LoginCard /> : <SignupCard />
      }
    </div>
  );
}

export default AuthPage;
