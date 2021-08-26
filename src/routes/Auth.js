import AuthForm from "components/AuthForm";
import SocialLinks from "components/SocialLinks";

//인증 컴포넌트
const Auth = () => {

    //화면 리턴
    return(
    <div>
        <AuthForm />
        <div>
        <SocialLinks />
        </div>
    </div>
    );
};
export default Auth;