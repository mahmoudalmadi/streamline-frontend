import TeamLogin from "./TeamLogin";
import TeamSignUp from "./TeamSignup";


export default function LoginSignUp({ isLogin, setIsLogin, isSignUp, setSignUp,switchModalType }) {
    return (
        <div className="flex bg-white rounded-[10px] py-[10px] w-[80%] justify-center mt-[20px]">
        {isLogin ? (
          <>
            <TeamLogin switchModalType={switchModalType}/>
          </>
        ) : (
          <>
            {isSignUp ? (
              <TeamSignUp switchModalType={switchModalType}/>
            ) : (
              "hiiiiiii"
            )}
          </>
        )}
      </div>
    );
  }
  